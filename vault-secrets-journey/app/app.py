"""Orders API: the demo's target app. One image, three ways to get its database credentials.

SECRET_SOURCE=env      password comes from the container environment (stage 1, no Vault)
SECRET_SOURCE=kv       password is read from Vault KV v2 on each request (stage 2)
SECRET_SOURCE=dynamic  Vault creates a short-lived database user on each request (stage 3)

Per-request reads keep every Vault call visible in the audit log. A real app would
read once and renew the lease; that does not change what the demo shows.
"""

import base64
import json
import os
import socket

import httpx
import psycopg
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

SOURCE = os.environ["SECRET_SOURCE"]
DB_HOST = os.environ.get("DB_HOST", "postgres")
DB_NAME = os.environ.get("DB_NAME", "orders")
VAULT_ADDR = os.environ.get("VAULT_ADDR", "http://vault:8200")
VAULT_TOKEN = os.environ.get("VAULT_TOKEN", "")
# Stage 4: no Vault token in the config at all. The pod logs in with its Kubernetes service account.
VAULT_K8S_ROLE = os.environ.get("VAULT_K8S_ROLE", "")
SA_TOKEN_FILE = "/var/run/secrets/kubernetes.io/serviceaccount/token"

app = FastAPI(title=f"orders-api ({SOURCE})")


def vault_call(method: str, path: str, token: str = "", body: dict | None = None) -> dict:
    try:
        resp = httpx.request(method, f"{VAULT_ADDR}/v1/{path}", headers={"X-Vault-Token": token} if token else {},
                             json=body, timeout=5)
    except httpx.HTTPError as exc:
        raise HTTPException(502, f"Vault unreachable: {exc!r}") from exc
    if resp.status_code >= 400:
        raise HTTPException(502, {"vault_path": path, "vault_status": resp.status_code, "vault_errors": resp.json().get("errors")})
    return resp.json()


def vault_token() -> tuple[str, dict]:
    """The Vault token to use, and how it was obtained."""
    if not VAULT_K8S_ROLE:
        return VAULT_TOKEN, {"vault_auth": "token from config"}
    with open(SA_TOKEN_FILE, encoding="utf-8") as f:
        jwt = f.read().strip()
    auth = vault_call("POST", "auth/kubernetes/login", body={"role": VAULT_K8S_ROLE, "jwt": jwt})["auth"]
    meta = auth.get("metadata") or {}
    return auth["client_token"], {
        "vault_auth": "kubernetes",
        "vault_role": VAULT_K8S_ROLE,
        "service_account": f"{meta.get('service_account_namespace')}/{meta.get('service_account_name')}",
        "vault_token_ttl": auth.get("lease_duration"),
    }


def vault_get(path: str) -> tuple[dict, dict]:
    token, auth_meta = vault_token()
    return vault_call("GET", path, token), auth_meta


def get_creds() -> tuple[dict, dict]:
    """Returns (credentials, metadata about where they came from)."""
    if SOURCE == "env":
        creds = {"username": os.environ["DB_USER"], "password": os.environ["DB_PASSWORD"]}
        return creds, {"source": "env", "where": "DB_USER / DB_PASSWORD environment variables"}
    if SOURCE == "kv":
        resp, auth_meta = vault_get("secret/data/app/db")
        body = resp["data"]
        return body["data"], {
            "source": "vault-kv",
            "path": "secret/data/app/db",
            "version": body["metadata"]["version"],
            "created_time": body["metadata"]["created_time"],
            **auth_meta,
        }
    if SOURCE == "dynamic":
        body, auth_meta = vault_get("database/creds/app")
        return body["data"], {
            "source": "vault-dynamic",
            "lease_id": body["lease_id"],
            "lease_duration": body["lease_duration"],
            **auth_meta,
        }
    raise RuntimeError(f"unknown SECRET_SOURCE {SOURCE!r}")


def connect(username: str, password: str):
    return psycopg.connect(host=DB_HOST, dbname=DB_NAME, user=username, password=password, connect_timeout=5)


@app.get("/orders")
def orders():
    creds, meta = get_creds()
    with connect(creds["username"], creds["password"]) as conn:
        rows = conn.execute("SELECT id, customer, item, amount FROM orders ORDER BY id").fetchall()
    return {
        # instance: the pod name in Kubernetes, so a rollout restart is visible
        "meta": {**meta, "db_user": creds["username"], "instance": socket.gethostname()},
        "rows": [{"id": r[0], "customer": r[1], "item": r[2], "amount": float(r[3])} for r in rows],
    }


@app.get("/debug/creds")
def debug_creds():
    """Demo only: what someone with access to this app's host or process ends up holding."""
    creds, meta = get_creds()
    return {"username": creds["username"], "password": creds["password"], **meta}


@app.get("/debug/identity")
def debug_identity():
    """Demo only: the claims of the service account token this pod presents to Vault (no signature)."""
    try:
        with open(SA_TOKEN_FILE, encoding="utf-8") as f:
            payload = f.read().strip().split(".")[1]
    except OSError:
        raise HTTPException(404, f"no Kubernetes service account token at {SA_TOKEN_FILE}: this instance has no Kubernetes identity")
    claims = json.loads(base64.urlsafe_b64decode(payload + "=" * (-len(payload) % 4)))
    return {"token_file": SA_TOKEN_FILE, "claims": claims}


class Creds(BaseModel):
    username: str
    password: str


@app.post("/probe")
def probe(creds: Creds):
    """Demo only: try to log in to the database with the given credentials."""
    try:
        with connect(creds.username, creds.password) as conn:
            conn.execute("SELECT 1")
    except psycopg.OperationalError as exc:
        text = str(exc)
        reason = text[text.find("FATAL:"):].replace("FATAL:", "").strip() if "FATAL:" in text else text.strip()
        return JSONResponse(status_code=401, content={"login": "failed", "username": creds.username, "reason": reason})
    return {"login": "ok", "username": creds.username}


@app.get("/healthz")
def healthz():
    return {"ok": True}
