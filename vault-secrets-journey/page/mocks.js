// Recorded by tools/record-mocks.py; replayed when the runner is not reachable.
window.DEMO_MOCKS = {
 "request?stage=static": [
  {
   "event": "start",
   "id": "request",
   "title": "Send a request to the orders API",
   "params": {
    "stage": "static"
   },
   "steps": 1,
   "dt": 20
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "GET /orders",
   "seconds": null,
   "dt": 25
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "GET /orders",
   "command": "curl http://app-static:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-static",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 13,
   "ok": true,
   "as_expected": true,
   "response": {
    "meta": {
     "source": "env",
     "where": "DB_USER / DB_PASSWORD environment variables",
     "db_user": "app",
     "instance": "2b08214f656c"
    },
    "rows": [
     {
      "id": 1,
      "customer": "Alex Morgan",
      "item": "Noise-cancelling headphones",
      "amount": 249.0
     },
     {
      "id": 2,
      "customer": "Sam Cole",
      "item": "Mechanical keyboard",
      "amount": 129.5
     },
     {
      "id": 3,
      "customer": "Robin Berg",
      "item": "USB-C dock",
      "amount": 89.99
     },
     {
      "id": 4,
      "customer": "Kim Lund",
      "item": "27\" monitor",
      "amount": 329.0
     },
     {
      "id": 5,
      "customer": "Taylor Nystr\u00f6m",
      "item": "Webcam",
      "amount": 74.9
     }
    ]
   },
   "dt": 37
  },
  {
   "event": "end",
   "ok": true,
   "dt": 37
  },
  {
   "id": 47,
   "t": 1792182383996,
   "source": "http",
   "from": "you",
   "to": "app-static",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 688
  },
  {
   "id": 48,
   "t": 1792182384005,
   "source": "db",
   "from": "app-static",
   "to": "postgres",
   "status": "ok",
   "label": "connect as app",
   "event": "bus",
   "dt": 688
  },
  {
   "id": 49,
   "t": 1792182384010,
   "source": "http",
   "from": "app-static",
   "to": "you",
   "label": "200 GET /orders",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 688
  },
  {
   "id": 50,
   "t": 1792182384880,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-M4oluUm2NyOhbECGelbW-1792182365",
   "event": "bus",
   "dt": 1475
  },
  {
   "id": 51,
   "t": 1792182384882,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 1475
  }
 ],
 "request?stage=kv": [
  {
   "event": "start",
   "id": "request",
   "title": "Send a request to the orders API",
   "params": {
    "stage": "kv"
   },
   "steps": 1,
   "dt": 35
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "GET /orders",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "GET /orders",
   "command": "curl http://app-kv:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-kv",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 18,
   "ok": true,
   "as_expected": true,
   "response": {
    "meta": {
     "source": "vault-kv",
     "path": "secret/data/app/db",
     "version": 1,
     "created_time": "2026-10-16T20:21:08.423767611Z",
     "vault_auth": "token from config",
     "db_user": "app",
     "instance": "bd7421b6e4cb"
    },
    "rows": [
     {
      "id": 1,
      "customer": "Alex Morgan",
      "item": "Noise-cancelling headphones",
      "amount": 249.0
     },
     {
      "id": 2,
      "customer": "Sam Cole",
      "item": "Mechanical keyboard",
      "amount": 129.5
     },
     {
      "id": 3,
      "customer": "Robin Berg",
      "item": "USB-C dock",
      "amount": 89.99
     },
     {
      "id": 4,
      "customer": "Kim Lund",
      "item": "27\" monitor",
      "amount": 329.0
     },
     {
      "id": 5,
      "customer": "Taylor Nystr\u00f6m",
      "item": "Webcam",
      "amount": 74.9
     }
    ]
   },
   "dt": 56
  },
  {
   "event": "end",
   "ok": true,
   "dt": 56
  },
  {
   "id": 52,
   "t": 1792182385598,
   "source": "http",
   "from": "you",
   "to": "app-kv",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 627
  },
  {
   "id": 53,
   "t": 1792182385607,
   "source": "vault",
   "from": "app-kv",
   "to": "vault",
   "label": "read secret/data/app/db",
   "status": "ok",
   "detail": "",
   "who": "app-kv",
   "policies": [
    "app-kv",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 725
  },
  {
   "id": 54,
   "t": 1792182385611,
   "source": "db",
   "from": "app-kv",
   "to": "postgres",
   "status": "ok",
   "label": "connect as app",
   "event": "bus",
   "dt": 725
  },
  {
   "id": 55,
   "t": 1792182385616,
   "source": "http",
   "from": "app-kv",
   "to": "you",
   "label": "200 GET /orders",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 726
  }
 ],
 "request?stage=dynamic": [
  {
   "event": "start",
   "id": "request",
   "title": "Send a request to the orders API",
   "params": {
    "stage": "dynamic"
   },
   "steps": 1,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "GET /orders",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "GET /orders",
   "command": "curl http://app-dynamic:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-dynamic",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 24,
   "ok": true,
   "as_expected": true,
   "response": {
    "meta": {
     "source": "vault-dynamic",
     "lease_id": "database/creds/app/IHhvl4c8FwzCP9bSWzrHmdWQ",
     "lease_duration": 30,
     "vault_auth": "token from config",
     "db_user": "v-token-ap-app-4rECf0ZrrCN3sswuTIGB-1792182387",
     "instance": "e0c170bbfdb4"
    },
    "rows": [
     {
      "id": 1,
      "customer": "Alex Morgan",
      "item": "Noise-cancelling headphones",
      "amount": 249.0
     },
     {
      "id": 2,
      "customer": "Sam Cole",
      "item": "Mechanical keyboard",
      "amount": 129.5
     },
     {
      "id": 3,
      "customer": "Robin Berg",
      "item": "USB-C dock",
      "amount": 89.99
     },
     {
      "id": 4,
      "customer": "Kim Lund",
      "item": "27\" monitor",
      "amount": 329.0
     },
     {
      "id": 5,
      "customer": "Taylor Nystr\u00f6m",
      "item": "Webcam",
      "amount": 74.9
     }
    ]
   },
   "dt": 63
  },
  {
   "event": "end",
   "ok": true,
   "dt": 63
  },
  {
   "id": 56,
   "t": 1792182387209,
   "source": "http",
   "from": "you",
   "to": "app-dynamic",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 629
  },
  {
   "id": 57,
   "t": 1792182387218,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-4rECf0ZrrCN3sswuTIGB-1792182387",
   "event": "bus",
   "dt": 728
  },
  {
   "id": 58,
   "t": 1792182387224,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 728
  },
  {
   "id": 59,
   "t": 1792182387229,
   "source": "db",
   "from": "app-dynamic",
   "to": "postgres",
   "status": "ok",
   "label": "connect as v-token-ap-app-4rECf0ZrrCN3sswuTIGB-1792182387",
   "event": "bus",
   "dt": 728
  },
  {
   "id": 60,
   "t": 1792182387233,
   "source": "http",
   "from": "app-dynamic",
   "to": "you",
   "label": "200 GET /orders",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 728
  }
 ],
 "what-leaks?stage=static": [
  {
   "event": "start",
   "id": "what-leaks",
   "title": "What the app is holding",
   "params": {
    "stage": "static"
   },
   "steps": 1,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "Credentials inside the app (demo-only endpoint)",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "Credentials inside the app (demo-only endpoint)",
   "command": "curl http://app-static:8000/debug/creds",
   "request": {
    "method": "GET",
    "target": "app-static",
    "path": "/debug/creds",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": {
    "username": "app",
    "password": "Sup3rS3cret!2019",
    "source": "env",
    "where": "DB_USER / DB_PASSWORD environment variables"
   },
   "dt": 42
  },
  {
   "event": "end",
   "ok": true,
   "dt": 42
  },
  {
   "id": 61,
   "t": 1792182388821,
   "source": "http",
   "from": "you",
   "to": "app-static",
   "label": "GET /debug/creds",
   "status": "pending",
   "event": "bus",
   "dt": 630
  },
  {
   "id": 62,
   "t": 1792182388824,
   "source": "http",
   "from": "app-static",
   "to": "you",
   "label": "200 GET /debug/creds",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 631
  }
 ],
 "what-leaks?stage=kv": [
  {
   "event": "start",
   "id": "what-leaks",
   "title": "What the app is holding",
   "params": {
    "stage": "kv"
   },
   "steps": 1,
   "dt": 35
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "Credentials inside the app (demo-only endpoint)",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "Credentials inside the app (demo-only endpoint)",
   "command": "curl http://app-kv:8000/debug/creds",
   "request": {
    "method": "GET",
    "target": "app-kv",
    "path": "/debug/creds",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 10,
   "ok": true,
   "as_expected": true,
   "response": {
    "username": "app",
    "password": "Sup3rS3cret!2019",
    "source": "vault-kv",
    "path": "secret/data/app/db",
    "version": 1,
    "created_time": "2026-10-16T20:21:08.423767611Z",
    "vault_auth": "token from config"
   },
   "dt": 49
  },
  {
   "event": "end",
   "ok": true,
   "dt": 49
  },
  {
   "id": 63,
   "t": 1792182390411,
   "source": "http",
   "from": "you",
   "to": "app-kv",
   "label": "GET /debug/creds",
   "status": "pending",
   "event": "bus",
   "dt": 651
  },
  {
   "id": 64,
   "t": 1792182390420,
   "source": "vault",
   "from": "app-kv",
   "to": "vault",
   "label": "read secret/data/app/db",
   "status": "ok",
   "detail": "",
   "who": "app-kv",
   "policies": [
    "app-kv",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 651
  },
  {
   "id": 65,
   "t": 1792182390422,
   "source": "http",
   "from": "app-kv",
   "to": "you",
   "label": "200 GET /debug/creds",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 652
  }
 ],
 "what-leaks?stage=dynamic": [
  {
   "event": "start",
   "id": "what-leaks",
   "title": "What the app is holding",
   "params": {
    "stage": "dynamic"
   },
   "steps": 1,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "Credentials inside the app (demo-only endpoint)",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "Credentials inside the app (demo-only endpoint)",
   "command": "curl http://app-dynamic:8000/debug/creds",
   "request": {
    "method": "GET",
    "target": "app-dynamic",
    "path": "/debug/creds",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 16,
   "ok": true,
   "as_expected": true,
   "response": {
    "username": "v-token-ap-app-N2nMnHEIxMtzKM5scwNz-1792182392",
    "password": "HMQL63b7JHoGLP4ZwfN-",
    "source": "vault-dynamic",
    "lease_id": "database/creds/app/LdWBIVOkjorX27KKNWqxVWOM",
    "lease_duration": 30,
    "vault_auth": "token from config"
   },
   "dt": 54
  },
  {
   "event": "end",
   "ok": true,
   "dt": 54
  },
  {
   "id": 66,
   "t": 1792182392008,
   "source": "http",
   "from": "you",
   "to": "app-dynamic",
   "label": "GET /debug/creds",
   "status": "pending",
   "event": "bus",
   "dt": 665
  },
  {
   "id": 67,
   "t": 1792182392017,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-N2nMnHEIxMtzKM5scwNz-1792182392",
   "event": "bus",
   "dt": 665
  },
  {
   "id": 68,
   "t": 1792182392023,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 666
  },
  {
   "id": 69,
   "t": 1792182392024,
   "source": "http",
   "from": "app-dynamic",
   "to": "you",
   "label": "200 GET /debug/creds",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 666
  }
 ],
 "kv-metadata": [
  {
   "event": "start",
   "id": "kv-metadata",
   "title": "KV v2 metadata for the database password",
   "params": {},
   "steps": 1,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Secret metadata",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Secret metadata",
   "command": "vault kv metadata get secret/app/db",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/secret/metadata/app/db",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "4665811b-1558-4cb8-790d-96638503793d",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "cas_required": false,
     "created_time": "2026-10-16T20:21:08.423767611Z",
     "current_version": 1,
     "custom_metadata": null,
     "delete_version_after": "0s",
     "last_updated_by": {
      "actor": "token",
      "operation": "create",
      "client_id": "0DHqvq2D77kL2/JTPSZkTMJbkFVmUu0TzMi0jiXcFy8="
     },
     "max_versions": 0,
     "oldest_version": 0,
     "updated_time": "2026-10-16T20:21:08.423767611Z",
     "versions": {
      "1": {
       "created_by": {
        "actor": "token",
        "operation": "create",
        "client_id": "0DHqvq2D77kL2/JTPSZkTMJbkFVmUu0TzMi0jiXcFy8="
       },
       "created_time": "2026-10-16T20:21:08.423767611Z",
       "deleted_by": null,
       "deletion_time": "",
       "destroyed": false
      }
     }
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "kv"
   },
   "dt": 41
  },
  {
   "event": "end",
   "ok": true,
   "dt": 41
  },
  {
   "id": 70,
   "t": 1792182393622,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read secret/metadata/app/db",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 668
  }
 ],
 "dynamic-lease": [
  {
   "event": "start",
   "id": "dynamic-lease",
   "title": "A dynamic credential and its lease",
   "params": {},
   "steps": 2,
   "dt": 23
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Ask Vault for a database user",
   "seconds": null,
   "dt": 27
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Ask Vault for a database user",
   "command": "vault read database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 9,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "6e50b316-67a4-977c-2c50-dc375cb176f1",
    "lease_id": "database/creds/app/eTcDJVfTNCHOomOO5a3QaKrD",
    "renewable": true,
    "lease_duration": 30,
    "data": {
     "password": "UGfbjSEA3NoeH-wDf14A",
     "username": "v-token-app-kfEMLJ4aWnKmcW97EPdO-1792182395"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "database"
   },
   "dt": 36
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Look up the lease",
   "seconds": null,
   "dt": 36
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Look up the lease",
   "command": "vault lease lookup database/creds/app/eTcDJVfTNCHOomOO5a3QaKrD",
   "request": {
    "method": "PUT",
    "target": "vault",
    "path": "/v1/sys/leases/lookup",
    "body": {
     "lease_id": "database/creds/app/eTcDJVfTNCHOomOO5a3QaKrD"
    },
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "dfe1a43e-3ee0-56cd-0f71-84fbdf05c274",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "expire_time": "2026-10-16T20:27:05.208232511Z",
     "id": "database/creds/app/eTcDJVfTNCHOomOO5a3QaKrD",
     "issue_time": "2026-10-16T20:26:35.208232347Z",
     "last_renewal": null,
     "renewable": true,
     "ttl": 30
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 38
  },
  {
   "event": "end",
   "ok": true,
   "dt": 38
  },
  {
   "id": 71,
   "t": 1792182395202,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-app-kfEMLJ4aWnKmcW97EPdO-1792182395",
   "event": "bus",
   "dt": 694
  },
  {
   "id": 72,
   "t": 1792182395208,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 694
  },
  {
   "id": 73,
   "t": 1792182395210,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/leases/lookup",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 694
  }
 ],
 "leak-test?stage=static": [
  {
   "event": "start",
   "id": "leak-test",
   "title": "Steal the credentials, try them 35 seconds later",
   "params": {
    "stage": "static"
   },
   "steps": 4,
   "dt": 33
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "Copy the credentials out of the app",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "Copy the credentials out of the app",
   "command": "curl http://app-static:8000/debug/creds",
   "request": {
    "method": "GET",
    "target": "app-static",
    "path": "/debug/creds",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": {
    "username": "app",
    "password": "Sup3rS3cret!2019",
    "source": "env",
    "where": "DB_USER / DB_PASSWORD environment variables"
   },
   "dt": 41
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "http",
   "title": "Log in to the database with them now",
   "seconds": null,
   "dt": 41
  },
  {
   "event": "step",
   "index": 1,
   "kind": "http",
   "title": "Log in to the database with them now",
   "command": "psql \"postgresql://app:****@postgres/orders\" -c 'select 1'",
   "request": {
    "method": "POST",
    "target": "app-static",
    "path": "/probe",
    "body": {
     "username": "app",
     "password": "Sup3rS3cret!2019"
    },
    "headers": {}
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "login": "ok",
    "username": "app"
   },
   "dt": 50
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "wait",
   "title": "Wait longer than the 30 s lease",
   "seconds": 35,
   "dt": 50
  },
  {
   "id": 74,
   "t": 1792182396798,
   "source": "http",
   "from": "you",
   "to": "app-static",
   "label": "GET /debug/creds",
   "status": "pending",
   "event": "bus",
   "dt": 648
  },
  {
   "id": 75,
   "t": 1792182396801,
   "source": "http",
   "from": "app-static",
   "to": "you",
   "label": "200 GET /debug/creds",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 648
  },
  {
   "id": 76,
   "t": 1792182396801,
   "source": "http",
   "from": "you",
   "to": "app-static",
   "label": "POST /probe",
   "status": "pending",
   "event": "bus",
   "dt": 648
  },
  {
   "id": 77,
   "t": 1792182396806,
   "source": "db",
   "from": "app-static",
   "to": "postgres",
   "status": "ok",
   "label": "connect as app",
   "event": "bus",
   "dt": 649
  },
  {
   "id": 78,
   "t": 1792182396809,
   "source": "http",
   "from": "app-static",
   "to": "you",
   "label": "200 POST /probe",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 649
  },
  {
   "id": 79,
   "t": 1792182404856,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-M4oluUm2NyOhbECGelbW-1792182365",
   "event": "bus",
   "dt": 9373
  },
  {
   "id": 80,
   "t": 1792182404859,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 9373
  },
  {
   "id": 81,
   "t": 1792182404860,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-kubernet-app-3ZKrYQGwzgbGH6C85UML-1792182404",
   "event": "bus",
   "dt": 9374
  },
  {
   "id": 82,
   "t": 1792182404865,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 9374
  },
  {
   "id": 83,
   "t": 1792182405038,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "secret",
   "label": "write Secret orders-db",
   "event": "bus",
   "dt": 9569
  },
  {
   "id": 84,
   "t": 1792182405043,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "app-vso",
   "label": "rollout restart orders-vso",
   "event": "bus",
   "dt": 9569
  },
  {
   "id": 85,
   "t": 1792182416377,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-4rECf0ZrrCN3sswuTIGB-1792182387",
   "event": "bus",
   "dt": 20546
  },
  {
   "id": 86,
   "t": 1792182421176,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-N2nMnHEIxMtzKM5scwNz-1792182392",
   "event": "bus",
   "dt": 25240
  },
  {
   "id": 87,
   "t": 1792182424361,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-app-kfEMLJ4aWnKmcW97EPdO-1792182395",
   "event": "bus",
   "dt": 28376
  },
  {
   "id": 88,
   "t": 1792182425232,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-3ZKrYQGwzgbGH6C85UML-1792182404",
   "event": "bus",
   "dt": 29159
  },
  {
   "id": 89,
   "t": 1792182425235,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 29160
  },
  {
   "id": 90,
   "t": 1792182425879,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-kubernet-app-M4oluUm2NyOhbECGelbW-1792182365",
   "event": "bus",
   "dt": 29847
  },
  {
   "event": "step",
   "index": 2,
   "kind": "wait",
   "title": "Wait longer than the 30 s lease",
   "seconds": 35.0,
   "ok": true,
   "as_expected": true,
   "dt": 34112
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "http",
   "title": "Log in again with the same credentials",
   "seconds": null,
   "dt": 34112
  },
  {
   "event": "step",
   "index": 3,
   "kind": "http",
   "title": "Log in again with the same credentials",
   "command": "psql \"postgresql://app:****@postgres/orders\" -c 'select 1'",
   "request": {
    "method": "POST",
    "target": "app-static",
    "path": "/probe",
    "body": {
     "username": "app",
     "password": "Sup3rS3cret!2019"
    },
    "headers": {}
   },
   "status": 200,
   "ms": 10,
   "ok": true,
   "as_expected": true,
   "response": {
    "login": "ok",
    "username": "app"
   },
   "dt": 34121
  },
  {
   "event": "end",
   "ok": true,
   "dt": 34121
  },
  {
   "id": 91,
   "t": 1792182430944,
   "source": "http",
   "from": "you",
   "to": "app-static",
   "label": "POST /probe",
   "status": "pending",
   "event": "bus",
   "dt": 34746
  },
  {
   "id": 92,
   "t": 1792182430951,
   "source": "db",
   "from": "app-static",
   "to": "postgres",
   "status": "ok",
   "label": "connect as app",
   "event": "bus",
   "dt": 34747
  },
  {
   "id": 93,
   "t": 1792182430954,
   "source": "http",
   "from": "app-static",
   "to": "you",
   "label": "200 POST /probe",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 34747
  }
 ],
 "leak-test?stage=kv": [
  {
   "event": "start",
   "id": "leak-test",
   "title": "Steal the credentials, try them 35 seconds later",
   "params": {
    "stage": "kv"
   },
   "steps": 4,
   "dt": 35
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "Copy the credentials out of the app",
   "seconds": null,
   "dt": 38
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "Copy the credentials out of the app",
   "command": "curl http://app-kv:8000/debug/creds",
   "request": {
    "method": "GET",
    "target": "app-kv",
    "path": "/debug/creds",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 10,
   "ok": true,
   "as_expected": true,
   "response": {
    "username": "app",
    "password": "Sup3rS3cret!2019",
    "source": "vault-kv",
    "path": "secret/data/app/db",
    "version": 1,
    "created_time": "2026-10-16T20:21:08.423767611Z",
    "vault_auth": "token from config"
   },
   "dt": 48
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "http",
   "title": "Log in to the database with them now",
   "seconds": null,
   "dt": 48
  },
  {
   "event": "step",
   "index": 1,
   "kind": "http",
   "title": "Log in to the database with them now",
   "command": "psql \"postgresql://app:****@postgres/orders\" -c 'select 1'",
   "request": {
    "method": "POST",
    "target": "app-kv",
    "path": "/probe",
    "body": {
     "username": "app",
     "password": "Sup3rS3cret!2019"
    },
    "headers": {}
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "login": "ok",
    "username": "app"
   },
   "dt": 56
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "wait",
   "title": "Wait longer than the 30 s lease",
   "seconds": 35,
   "dt": 56
  },
  {
   "id": 94,
   "t": 1792182432543,
   "source": "http",
   "from": "you",
   "to": "app-kv",
   "label": "GET /debug/creds",
   "status": "pending",
   "event": "bus",
   "dt": 683
  },
  {
   "id": 95,
   "t": 1792182432551,
   "source": "vault",
   "from": "app-kv",
   "to": "vault",
   "label": "read secret/data/app/db",
   "status": "ok",
   "detail": "",
   "who": "app-kv",
   "policies": [
    "app-kv",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 684
  },
  {
   "id": 96,
   "t": 1792182432553,
   "source": "http",
   "from": "app-kv",
   "to": "you",
   "label": "200 GET /debug/creds",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 684
  },
  {
   "id": 97,
   "t": 1792182432553,
   "source": "http",
   "from": "you",
   "to": "app-kv",
   "label": "POST /probe",
   "status": "pending",
   "event": "bus",
   "dt": 684
  },
  {
   "id": 98,
   "t": 1792182432558,
   "source": "db",
   "from": "app-kv",
   "to": "postgres",
   "status": "ok",
   "label": "connect as app",
   "event": "bus",
   "dt": 684
  },
  {
   "id": 99,
   "t": 1792182432561,
   "source": "http",
   "from": "app-kv",
   "to": "you",
   "label": "200 POST /probe",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 685
  },
  {
   "id": 100,
   "t": 1792182445711,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-3ZKrYQGwzgbGH6C85UML-1792182404",
   "event": "bus",
   "dt": 14302
  },
  {
   "id": 101,
   "t": 1792182445713,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 14302
  },
  {
   "id": 102,
   "t": 1792182445714,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-kubernet-app-8rGSrivsJ2KPfqEKHTiB-1792182445",
   "event": "bus",
   "dt": 14302
  },
  {
   "id": 103,
   "t": 1792182445720,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 14302
  },
  {
   "id": 104,
   "t": 1792182446440,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "secret",
   "label": "write Secret orders-db",
   "event": "bus",
   "dt": 14991
  },
  {
   "id": 105,
   "t": 1792182446446,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "app-vso",
   "label": "rollout restart orders-vso",
   "event": "bus",
   "dt": 15088
  },
  {
   "id": 106,
   "t": 1792182464734,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-kubernet-app-3ZKrYQGwzgbGH6C85UML-1792182404",
   "event": "bus",
   "dt": 33656
  },
  {
   "event": "step",
   "index": 2,
   "kind": "wait",
   "title": "Wait longer than the 30 s lease",
   "seconds": 35.0,
   "ok": true,
   "as_expected": true,
   "dt": 34151
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "http",
   "title": "Log in again with the same credentials",
   "seconds": null,
   "dt": 34151
  },
  {
   "event": "step",
   "index": 3,
   "kind": "http",
   "title": "Log in again with the same credentials",
   "command": "psql \"postgresql://app:****@postgres/orders\" -c 'select 1'",
   "request": {
    "method": "POST",
    "target": "app-kv",
    "path": "/probe",
    "body": {
     "username": "app",
     "password": "Sup3rS3cret!2019"
    },
    "headers": {}
   },
   "status": 200,
   "ms": 10,
   "ok": true,
   "as_expected": true,
   "response": {
    "login": "ok",
    "username": "app"
   },
   "dt": 34161
  },
  {
   "event": "end",
   "ok": true,
   "dt": 34161
  },
  {
   "id": 107,
   "t": 1792182465860,
   "source": "http",
   "from": "you",
   "to": "app-kv",
   "label": "POST /probe",
   "status": "pending",
   "event": "bus",
   "dt": 34741
  },
  {
   "id": 108,
   "t": 1792182465866,
   "source": "db",
   "from": "app-kv",
   "to": "postgres",
   "status": "ok",
   "label": "connect as app",
   "event": "bus",
   "dt": 34841
  },
  {
   "id": 109,
   "t": 1792182465869,
   "source": "http",
   "from": "app-kv",
   "to": "you",
   "label": "200 POST /probe",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 34841
  },
  {
   "id": 110,
   "t": 1792182465918,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-8rGSrivsJ2KPfqEKHTiB-1792182445",
   "event": "bus",
   "dt": 34842
  },
  {
   "id": 111,
   "t": 1792182465921,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 34842
  }
 ],
 "leak-test?stage=dynamic": [
  {
   "event": "start",
   "id": "leak-test",
   "title": "Steal the credentials, try them 35 seconds later",
   "params": {
    "stage": "dynamic"
   },
   "steps": 4,
   "dt": 36
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "Copy the credentials out of the app",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "Copy the credentials out of the app",
   "command": "curl http://app-dynamic:8000/debug/creds",
   "request": {
    "method": "GET",
    "target": "app-dynamic",
    "path": "/debug/creds",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 16,
   "ok": true,
   "as_expected": true,
   "response": {
    "username": "v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
    "password": "QkWwgRI7bCGugKAc-73j",
    "source": "vault-dynamic",
    "lease_id": "database/creds/app/bPSrXtIgYJMqu8rg5EbLQ6uv",
    "lease_duration": 30,
    "vault_auth": "token from config"
   },
   "dt": 55
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "http",
   "title": "Log in to the database with them now",
   "seconds": null,
   "dt": 56
  },
  {
   "event": "step",
   "index": 1,
   "kind": "http",
   "title": "Log in to the database with them now",
   "command": "psql \"postgresql://v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467:****@postgres/orders\" -c 'select 1'",
   "request": {
    "method": "POST",
    "target": "app-dynamic",
    "path": "/probe",
    "body": {
     "username": "v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
     "password": "QkWwgRI7bCGugKAc-73j"
    },
    "headers": {}
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "login": "ok",
    "username": "v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467"
   },
   "dt": 64
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "wait",
   "title": "Wait longer than the 30 s lease",
   "seconds": 35,
   "dt": 64
  },
  {
   "id": 112,
   "t": 1792182467460,
   "source": "http",
   "from": "you",
   "to": "app-dynamic",
   "label": "GET /debug/creds",
   "status": "pending",
   "event": "bus",
   "dt": 657
  },
  {
   "id": 113,
   "t": 1792182467469,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
   "event": "bus",
   "dt": 657
  },
  {
   "id": 114,
   "t": 1792182467475,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 658
  },
  {
   "id": 115,
   "t": 1792182467477,
   "source": "http",
   "from": "app-dynamic",
   "to": "you",
   "label": "200 GET /debug/creds",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 658
  },
  {
   "id": 116,
   "t": 1792182467477,
   "source": "http",
   "from": "you",
   "to": "app-dynamic",
   "label": "POST /probe",
   "status": "pending",
   "event": "bus",
   "dt": 658
  },
  {
   "id": 117,
   "t": 1792182467482,
   "source": "db",
   "from": "app-dynamic",
   "to": "postgres",
   "status": "ok",
   "label": "connect as v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
   "event": "bus",
   "dt": 658
  },
  {
   "id": 118,
   "t": 1792182467485,
   "source": "http",
   "from": "app-dynamic",
   "to": "you",
   "label": "200 POST /probe",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 658
  },
  {
   "id": 119,
   "t": 1792182488119,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-8rGSrivsJ2KPfqEKHTiB-1792182445",
   "event": "bus",
   "dt": 20829
  },
  {
   "id": 120,
   "t": 1792182488122,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 20830
  },
  {
   "id": 121,
   "t": 1792182488123,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-kubernet-app-GGKyEhLsXgbsI4oIxjI9-1792182488",
   "event": "bus",
   "dt": 20830
  },
  {
   "id": 122,
   "t": 1792182488128,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 20830
  },
  {
   "id": 123,
   "t": 1792182489902,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "secret",
   "label": "write Secret orders-db",
   "event": "bus",
   "dt": 22497
  },
  {
   "id": 124,
   "t": 1792182489909,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "app-vso",
   "label": "rollout restart orders-vso",
   "event": "bus",
   "dt": 22498
  },
  {
   "id": 125,
   "t": 1792182496633,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
   "event": "bus",
   "dt": 29849
  },
  {
   "event": "step",
   "index": 2,
   "kind": "wait",
   "title": "Wait longer than the 30 s lease",
   "seconds": 35.0,
   "ok": true,
   "as_expected": true,
   "dt": 34094
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "http",
   "title": "Log in again with the same credentials",
   "seconds": null,
   "dt": 34094
  },
  {
   "event": "step",
   "index": 3,
   "kind": "http",
   "title": "Log in again with the same credentials",
   "command": "psql \"postgresql://v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467:****@postgres/orders\" -c 'select 1'",
   "request": {
    "method": "POST",
    "target": "app-dynamic",
    "path": "/probe",
    "body": {
     "username": "v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
     "password": "QkWwgRI7bCGugKAc-73j"
    },
    "headers": {}
   },
   "status": 401,
   "ms": 8,
   "ok": false,
   "as_expected": true,
   "response": {
    "login": "failed",
    "username": "v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
    "reason": "password authentication failed for user \"v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467\""
   },
   "dt": 34101
  },
  {
   "event": "end",
   "ok": true,
   "dt": 34101
  },
  {
   "id": 126,
   "t": 1792182501623,
   "source": "http",
   "from": "you",
   "to": "app-dynamic",
   "label": "POST /probe",
   "status": "pending",
   "event": "bus",
   "dt": 34736
  },
  {
   "id": 127,
   "t": 1792182501629,
   "source": "db",
   "from": "app-dynamic",
   "to": "postgres",
   "status": "denied",
   "label": "login refused for v-token-ap-app-pJz3TE528Jvh73Y1RqBC-1792182467",
   "detail": "password authentication failed",
   "event": "bus",
   "dt": 34736
  },
  {
   "id": 128,
   "t": 1792182501631,
   "source": "http",
   "from": "app-dynamic",
   "to": "you",
   "label": "401 POST /probe",
   "status": "denied",
   "response": true,
   "event": "bus",
   "dt": 34737
  }
 ],
 "policy-read?policy=app-kv": [
  {
   "event": "start",
   "id": "policy-read",
   "title": "Read a policy",
   "params": {
    "policy": "app-kv"
   },
   "steps": 1,
   "dt": 36
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Policy app-kv",
   "seconds": null,
   "dt": 41
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Policy app-kv",
   "command": "vault policy read app-kv",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/acl/app-kv",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "c1253428-0370-e4b4-f3b4-2e0b18baff68",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "name": "app-kv",
     "policy": "# Read the shared static database password.\npath \"secret/data/app/db\" {\n  capabilities = [\"read\"]\n}\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 43
  },
  {
   "event": "end",
   "ok": true,
   "dt": 43
  },
  {
   "id": 129,
   "t": 1792182503231,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/acl/app-kv",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 699
  }
 ],
 "policy-read?policy=app-dynamic": [
  {
   "event": "start",
   "id": "policy-read",
   "title": "Read a policy",
   "params": {
    "policy": "app-dynamic"
   },
   "steps": 1,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Policy app-dynamic",
   "seconds": null,
   "dt": 38
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Policy app-dynamic",
   "command": "vault policy read app-dynamic",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/acl/app-dynamic",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "9cc0f062-d11e-ba12-a021-6379d8bd327d",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "name": "app-dynamic",
     "policy": "# Ask the database engine for a fresh, short-lived user.\npath \"database/creds/app\" {\n  capabilities = [\"read\"]\n}\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 42
  },
  {
   "event": "end",
   "ok": true,
   "dt": 42
  },
  {
   "id": 130,
   "t": 1792182504278,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-kubernet-app-8rGSrivsJ2KPfqEKHTiB-1792182445",
   "event": "bus",
   "dt": 131
  },
  {
   "id": 131,
   "t": 1792182504831,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/acl/app-dynamic",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 626
  }
 ],
 "policy-check?path=secret/data/app/db&token=app-kv-token": [
  {
   "event": "start",
   "id": "policy-check",
   "title": "Who can read what",
   "params": {
    "token": "app-kv-token",
    "path": "secret/data/app/db"
   },
   "steps": 1,
   "dt": 35
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Read secret/data/app/db as app-kv-token",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Read secret/data/app/db as app-kv-token",
   "command": "VAULT_TOKEN=app-kv-token vault read secret/data/app/db",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/secret/data/app/db",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 4,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "88e8a46c-1f84-d867-337b-5c19127aa817",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "data": {
      "password": "Sup3rS3cret!2019",
      "username": "app"
     },
     "metadata": {
      "created_time": "2026-10-16T20:21:08.423767611Z",
      "custom_metadata": null,
      "deletion_time": "",
      "destroyed": false,
      "version": 1
     }
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "kv"
   },
   "dt": 42
  },
  {
   "event": "end",
   "ok": true,
   "dt": 42
  },
  {
   "id": 132,
   "t": 1792182506425,
   "source": "vault",
   "from": "app-kv",
   "to": "vault",
   "label": "read secret/data/app/db",
   "status": "ok",
   "detail": "",
   "who": "app-kv",
   "policies": [
    "app-kv",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 656
  }
 ],
 "policy-check?path=database/creds/app&token=app-kv-token": [
  {
   "event": "start",
   "id": "policy-check",
   "title": "Who can read what",
   "params": {
    "token": "app-kv-token",
    "path": "database/creds/app"
   },
   "steps": 1,
   "dt": 21
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Read database/creds/app as app-kv-token",
   "seconds": null,
   "dt": 26
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Read database/creds/app as app-kv-token",
   "command": "VAULT_TOKEN=app-kv-token vault read database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {}
   },
   "status": 403,
   "ms": 3,
   "ok": false,
   "as_expected": true,
   "response": {
    "errors": [
     "1 error occurred:\n\t* permission denied\n\n"
    ]
   },
   "dt": 29
  },
  {
   "event": "end",
   "ok": true,
   "dt": 29
  },
  {
   "id": 133,
   "t": 1792182508006,
   "source": "vault",
   "from": "app-kv",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "denied",
   "detail": "permission denied",
   "who": "app-kv",
   "policies": [
    "app-kv",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 676
  }
 ],
 "policy-check?path=secret/data/app/db&token=app-dynamic-token": [
  {
   "event": "start",
   "id": "policy-check",
   "title": "Who can read what",
   "params": {
    "token": "app-dynamic-token",
    "path": "secret/data/app/db"
   },
   "steps": 1,
   "dt": 20
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Read secret/data/app/db as app-dynamic-token",
   "seconds": null,
   "dt": 26
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Read secret/data/app/db as app-dynamic-token",
   "command": "VAULT_TOKEN=app-dynamic-token vault read secret/data/app/db",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/secret/data/app/db",
    "body": null,
    "headers": {}
   },
   "status": 403,
   "ms": 3,
   "ok": false,
   "as_expected": true,
   "response": {
    "errors": [
     "1 error occurred:\n\t* permission denied\n\n"
    ]
   },
   "dt": 29
  },
  {
   "event": "end",
   "ok": true,
   "dt": 29
  },
  {
   "id": 134,
   "t": 1792182509275,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-GGKyEhLsXgbsI4oIxjI9-1792182488",
   "event": "bus",
   "dt": 318
  },
  {
   "id": 135,
   "t": 1792182509277,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 318
  },
  {
   "id": 136,
   "t": 1792182509585,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read secret/data/app/db",
   "status": "denied",
   "detail": "permission denied",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 611
  }
 ],
 "policy-check?path=database/creds/app&token=app-dynamic-token": [
  {
   "event": "start",
   "id": "policy-check",
   "title": "Who can read what",
   "params": {
    "token": "app-dynamic-token",
    "path": "database/creds/app"
   },
   "steps": 1,
   "dt": 35
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Read database/creds/app as app-dynamic-token",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Read database/creds/app as app-dynamic-token",
   "command": "VAULT_TOKEN=app-dynamic-token vault read database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 11,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "2f5c564a-7bf8-2738-399e-e4b853de7d72",
    "lease_id": "database/creds/app/IWEPWJBNpNJEZvTQgykAB1xf",
    "renewable": true,
    "lease_duration": 30,
    "data": {
     "password": "-u4BsUNp7Pth5VQZXUMT",
     "username": "v-token-ap-app-z23Nma9HzwT730wd4GA1-1792182511"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "database"
   },
   "dt": 50
  },
  {
   "event": "end",
   "ok": true,
   "dt": 50
  },
  {
   "id": 137,
   "t": 1792182511178,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-z23Nma9HzwT730wd4GA1-1792182511",
   "event": "bus",
   "dt": 645
  },
  {
   "id": 138,
   "t": 1792182511184,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 645
  }
 ],
 "sentinel-check?enforcement=hard-mandatory&override=false&window=office-hours": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "office-hours",
    "enforcement": "hard-mandatory",
    "override": "false"
   },
   "steps": 5,
   "dt": 19
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, hard-mandatory)",
   "seconds": null,
   "dt": 24
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, hard-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=hard-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "hard-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 27
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 27
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "3bc57470-6d0f-9e38-4468-6bd0e9a6f7d2",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "hard-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 28
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 28
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182512,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 30
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "seconds": null,
   "dt": 30
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=false database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "false"
    }
   },
   "status": 403,
   "ms": 2,
   "ok": false,
   "as_expected": true,
   "response": {
    "errors": [
     "2 errors occurred:\n\t* egp standard policy \"root/db-issuance-window\" evaluation resulted in denial.\n\nThe specific error was:\n<nil>\n\nA trace of the execution for policy \"root/db-issuance-window\" is available:\n\nResult: false\n\nDescription: <none>\n\nRule \"main\" (root/db-issuance-window:17:1) = false\n\t* permission denied\n\n"
    ]
   },
   "dt": 32
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 32
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 33
  },
  {
   "event": "end",
   "ok": true,
   "dt": 33
  },
  {
   "id": 139,
   "t": 1792182512758,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 659
  },
  {
   "id": 140,
   "t": 1792182512760,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 659
  },
  {
   "id": 141,
   "t": 1792182512763,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "denied",
   "detail": "denied by Sentinel EGP root/db-issuance-window",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 659
  },
  {
   "id": 142,
   "t": 1792182512764,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 659
  }
 ],
 "sentinel-check?enforcement=hard-mandatory&override=true&window=office-hours": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "office-hours",
    "enforcement": "hard-mandatory",
    "override": "true"
   },
   "steps": 5,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, hard-mandatory)",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, hard-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=hard-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "hard-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 4,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 43
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 43
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "91e85237-fd7a-a925-c2ae-d3a23298722c",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "hard-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 44
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 44
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182514,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 46
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "seconds": null,
   "dt": 46
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=true database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "true"
    }
   },
   "status": 403,
   "ms": 2,
   "ok": false,
   "as_expected": true,
   "response": {
    "errors": [
     "2 errors occurred:\n\t* egp standard policy \"root/db-issuance-window\" evaluation resulted in denial.\n\nThe specific error was:\n<nil>\n\nA trace of the execution for policy \"root/db-issuance-window\" is available:\n\nResult: false\n\nDescription: <none>\n\nRule \"main\" (root/db-issuance-window:17:1) = false\n\t* permission denied\n\n"
    ]
   },
   "dt": 48
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 48
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 49
  },
  {
   "event": "end",
   "ok": true,
   "dt": 49
  },
  {
   "id": 143,
   "t": 1792182514369,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 682
  },
  {
   "id": 144,
   "t": 1792182514370,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 682
  },
  {
   "id": 145,
   "t": 1792182514374,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "denied",
   "detail": "denied by Sentinel EGP root/db-issuance-window",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": true,
   "event": "bus",
   "dt": 682
  },
  {
   "id": 146,
   "t": 1792182514375,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 682
  }
 ],
 "sentinel-check?enforcement=soft-mandatory&override=false&window=office-hours": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "office-hours",
    "enforcement": "soft-mandatory",
    "override": "false"
   },
   "steps": 5,
   "dt": 21
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, soft-mandatory)",
   "seconds": null,
   "dt": 26
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, soft-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=soft-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "soft-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 29
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 29
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "dd949244-fb86-54f0-b8e6-35e4daad35cd",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "soft-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 30
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 30
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182515,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 31
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "seconds": null,
   "dt": 31
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=false database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "false"
    }
   },
   "status": 403,
   "ms": 2,
   "ok": false,
   "as_expected": true,
   "response": {
    "errors": [
     "2 errors occurred:\n\t* egp standard policy \"root/db-issuance-window\" evaluation resulted in denial.\n\nThe specific error was:\n<nil>\n\nA trace of the execution for policy \"root/db-issuance-window\" is available:\n\nResult: false\n\nDescription: <none>\n\nRule \"main\" (root/db-issuance-window:17:1) = false\n\nNote: specifying an override of the operation would have succeeded.\n\t* permission denied\n\n"
    ]
   },
   "dt": 33
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 33
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 35
  },
  {
   "event": "end",
   "ok": true,
   "dt": 35
  },
  {
   "id": 147,
   "t": 1792182515956,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 707
  },
  {
   "id": 148,
   "t": 1792182515958,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 707
  },
  {
   "id": 149,
   "t": 1792182515961,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "denied",
   "detail": "denied by Sentinel EGP root/db-issuance-window",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 708
  },
  {
   "id": 150,
   "t": 1792182515963,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 708
  }
 ],
 "sentinel-check?enforcement=soft-mandatory&override=true&window=office-hours": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "office-hours",
    "enforcement": "soft-mandatory",
    "override": "true"
   },
   "steps": 5,
   "dt": 20
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, soft-mandatory)",
   "seconds": null,
   "dt": 24
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window office-hours, soft-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=soft-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "soft-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 27
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 27
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "099142b7-397e-fef9-0b01-2342d9f96110",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "soft-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"office-hours\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 28
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 28
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182517,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 29
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "seconds": null,
   "dt": 29
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=true database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "true"
    }
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "1017d16c-3e3e-cd09-474f-8720fb6d3382",
    "lease_id": "database/creds/app/9fIG3TT5p721OCNNOOhgWvTc",
    "renewable": true,
    "lease_duration": 30,
    "data": {
     "password": "8-hI4TlROSEsgZlX5lBb",
     "username": "v-token-ap-app-SeTOMyTZaecK4MSXf0s9-1792182517"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "database"
   },
   "dt": 37
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 37
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 38
  },
  {
   "event": "end",
   "ok": true,
   "dt": 38
  },
  {
   "id": 151,
   "t": 1792182517536,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 640
  },
  {
   "id": 152,
   "t": 1792182517538,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 640
  },
  {
   "id": 153,
   "t": 1792182517541,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-SeTOMyTZaecK4MSXf0s9-1792182517",
   "event": "bus",
   "dt": 641
  },
  {
   "id": 154,
   "t": 1792182517547,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "policy override",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": true,
   "event": "bus",
   "dt": 641
  },
  {
   "id": 155,
   "t": 1792182517548,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 641
  }
 ],
 "sentinel-check?enforcement=hard-mandatory&override=false&window=night-batch": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "night-batch",
    "enforcement": "hard-mandatory",
    "override": "false"
   },
   "steps": 5,
   "dt": 22
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, hard-mandatory)",
   "seconds": null,
   "dt": 27
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, hard-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=hard-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "hard-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 30
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 30
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "7dec84e6-3ae5-c231-3e3c-b9ac0cace054",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "hard-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 31
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 31
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182519,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 33
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "seconds": null,
   "dt": 33
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=false database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "false"
    }
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "e14954f9-da7d-610e-ec60-30d84ec8bbdc",
    "lease_id": "database/creds/app/g0gegeDAun8deuC2asCE2Zgc",
    "renewable": true,
    "lease_duration": 30,
    "data": {
     "password": "gkHPvRZQSa3e4xe-nwbE",
     "username": "v-token-ap-app-TgSyzDyqo8PzFSkDzr9o-1792182519"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "database"
   },
   "dt": 40
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 41
  },
  {
   "event": "end",
   "ok": true,
   "dt": 41
  },
  {
   "id": 156,
   "t": 1792182519124,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 669
  },
  {
   "id": 157,
   "t": 1792182519125,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 670
  },
  {
   "id": 158,
   "t": 1792182519129,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-TgSyzDyqo8PzFSkDzr9o-1792182519",
   "event": "bus",
   "dt": 670
  },
  {
   "id": 159,
   "t": 1792182519135,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 670
  },
  {
   "id": 160,
   "t": 1792182519136,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 670
  }
 ],
 "sentinel-check?enforcement=hard-mandatory&override=true&window=night-batch": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "night-batch",
    "enforcement": "hard-mandatory",
    "override": "true"
   },
   "steps": 5,
   "dt": 35
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, hard-mandatory)",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, hard-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=hard-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "hard-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 43
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 43
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 2,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "9371baf7-ac34-e471-edd0-f9a1641914f3",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "hard-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 44
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 44
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182520,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 47
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "seconds": null,
   "dt": 47
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=true database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "true"
    }
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "ae00e842-8a94-6e7a-33aa-08b8e6569c84",
    "lease_id": "database/creds/app/HOY7rFVqE8L9rDa4nRTcPvJy",
    "renewable": true,
    "lease_duration": 30,
    "data": {
     "password": "7p8r4asIxOJyfthZS-CI",
     "username": "v-token-ap-app-xsjAPmocTdhsd0B8BgWo-1792182520"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "database"
   },
   "dt": 55
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 55
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 56
  },
  {
   "event": "end",
   "ok": true,
   "dt": 56
  },
  {
   "id": 161,
   "t": 1792182520735,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 694
  },
  {
   "id": 162,
   "t": 1792182520737,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 694
  },
  {
   "id": 163,
   "t": 1792182520740,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-xsjAPmocTdhsd0B8BgWo-1792182520",
   "event": "bus",
   "dt": 695
  },
  {
   "id": 164,
   "t": 1792182520746,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "policy override",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": true,
   "event": "bus",
   "dt": 695
  },
  {
   "id": 165,
   "t": 1792182520748,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 695
  }
 ],
 "sentinel-check?enforcement=soft-mandatory&override=false&window=night-batch": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "night-batch",
    "enforcement": "soft-mandatory",
    "override": "false"
   },
   "steps": 5,
   "dt": 22
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, soft-mandatory)",
   "seconds": null,
   "dt": 26
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, soft-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=soft-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "soft-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 28
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 28
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "32e3bd91-b68d-3335-297e-dfe34384c996",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "soft-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 30
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 30
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182522,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 31
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "seconds": null,
   "dt": 31
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=false)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=false database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "false"
    }
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "9bf48196-f898-3178-054a-3b0343282646",
    "lease_id": "database/creds/app/ifLWgUH7M0UZFiHeMcEe2l7p",
    "renewable": true,
    "lease_duration": 30,
    "data": {
     "password": "NRt-e8bCb8Cn3rSeBbZu",
     "username": "v-token-ap-app-d18fUhEcCmydInNRC2hU-1792182522"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "database"
   },
   "dt": 39
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 40
  },
  {
   "event": "end",
   "ok": true,
   "dt": 40
  },
  {
   "id": 166,
   "t": 1792182522334,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 705
  },
  {
   "id": 167,
   "t": 1792182522336,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 705
  },
  {
   "id": 168,
   "t": 1792182522339,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-d18fUhEcCmydInNRC2hU-1792182522",
   "event": "bus",
   "dt": 705
  },
  {
   "id": 169,
   "t": 1792182522345,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 706
  },
  {
   "id": 170,
   "t": 1792182522347,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 706
  }
 ],
 "sentinel-check?enforcement=soft-mandatory&override=true&window=night-batch": [
  {
   "event": "start",
   "id": "sentinel-check",
   "title": "Credentials only inside an issuance window",
   "params": {
    "window": "night-batch",
    "enforcement": "soft-mandatory",
    "override": "true"
   },
   "steps": 5,
   "dt": 20
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, soft-mandatory)",
   "seconds": null,
   "dt": 25
  },
  {
   "event": "step",
   "index": 0,
   "kind": "vault",
   "title": "Apply the Sentinel policy (window night-batch, soft-mandatory)",
   "command": "vault write sys/policies/egp/db-issuance-window paths=\"database/creds/*\" enforcement_level=soft-mandatory policy=@db-issuance-window.sentinel",
   "request": {
    "method": "POST",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": {
     "paths": [
      "database/creds/*"
     ],
     "enforcement_level": "soft-mandatory",
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "headers": {}
   },
   "status": 204,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 28
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "seconds": null,
   "dt": 28
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "Read the policy back",
   "command": "vault read sys/policies/egp/db-issuance-window",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "ed64bcfd-ea90-3517-7b93-c6268520a435",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
     "enforcement_level": "soft-mandatory",
     "name": "db-issuance-window",
     "paths": [
      "database/creds/*"
     ],
     "policy": "import \"time\"\n\n# Hours are UTC: Sentinel's time import has no time zones.\nwindows = {\n  \"office-hours\": {\"start\": 6, \"end\": 18},\n  \"night-batch\":  {\"start\": 18, \"end\": 6},\n}\nwindow = windows[\"night-batch\"]\n\nin_window = func(w) {\n  if w.start < w.end {\n    return time.now.hour >= w.start and time.now.hour < w.end\n  }\n  return time.now.hour >= w.start or time.now.hour < w.end\n}\n\nmain = rule { in_window(window) }\n"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "system"
   },
   "dt": 29
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "seconds": null,
   "dt": 29
  },
  {
   "event": "step",
   "index": 2,
   "kind": "vault",
   "title": "Vault's clock (UTC)",
   "command": "curl $VAULT_ADDR/v1/sys/health",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/sys/health",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": {
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1792182523,
    "version": "2.2.0+ent",
    "enterprise": true,
    "cluster_name": "vault-cluster-b5da9a42",
    "cluster_id": "0a7c4a69-0ebc-70f4-8fcc-02a9fec937a7",
    "license": {
     "state": "autoloaded",
     "expiry_time": "2029-02-12T00:00:00Z",
     "terminated": false
    },
    "echo_duration_ms": 0,
    "clock_skew_ms": 0,
    "replication_primary_canary_age_ms": 0
   },
   "dt": 32
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "seconds": null,
   "dt": 32
  },
  {
   "event": "step",
   "index": 3,
   "kind": "vault",
   "title": "Ask for database credentials as app-dynamic (override=true)",
   "command": "VAULT_TOKEN=app-dynamic-token vault read -policy-override=true database/creds/app",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/database/creds/app",
    "body": null,
    "headers": {
     "X-Vault-Policy-Override": "true"
    }
   },
   "status": 200,
   "ms": 8,
   "ok": true,
   "as_expected": true,
   "response": {
    "request_id": "6699dbe5-f0c3-99da-5977-8c24eebabc62",
    "lease_id": "database/creds/app/t05uLCUkIB0eHksZhlokaaqh",
    "renewable": true,
    "lease_duration": 30,
    "data": {
     "password": "xjc-knENtxI4Xbni4nA5",
     "username": "v-token-ap-app-kxydfHfTYBsO3rk2z6mi-1792182523"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null,
    "mount_type": "database"
   },
   "dt": 40
  },
  {
   "event": "step-start",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 4,
   "kind": "vault",
   "title": "Remove the Sentinel policy again",
   "command": "vault delete sys/policies/egp/db-issuance-window",
   "request": {
    "method": "DELETE",
    "target": "vault",
    "path": "/v1/sys/policies/egp/db-issuance-window",
    "body": null,
    "headers": {}
   },
   "status": 204,
   "ms": 1,
   "ok": true,
   "as_expected": true,
   "response": "",
   "dt": 40
  },
  {
   "event": "end",
   "ok": true,
   "dt": 40
  },
  {
   "id": 171,
   "t": 1792182523933,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "update sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 621
  },
  {
   "id": 172,
   "t": 1792182523935,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 621
  },
  {
   "id": 173,
   "t": 1792182523939,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-token-ap-app-kxydfHfTYBsO3rk2z6mi-1792182523",
   "event": "bus",
   "dt": 622
  },
  {
   "id": 174,
   "t": 1792182523945,
   "source": "vault",
   "from": "app-dynamic",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "policy override",
   "who": "app-dynamic",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": true,
   "event": "bus",
   "dt": 719
  },
  {
   "id": 175,
   "t": 1792182523947,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "delete sys/policies/egp/db-issuance-window",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 719
  },
  {
   "id": 176,
   "t": 1792182524306,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update auth/token/renew-self",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 1013
  }
 ],
 "k8s-request": [
  {
   "event": "start",
   "id": "k8s-request",
   "title": "Send a request to the orders API pod",
   "params": {},
   "steps": 1,
   "dt": 21
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "GET /orders (pod orders-api, service account orders/orders-api)",
   "seconds": null,
   "dt": 26
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "GET /orders (pod orders-api, service account orders/orders-api)",
   "command": "curl http://orders-api.orders.svc:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-k8s",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 37,
   "ok": true,
   "as_expected": true,
   "response": {
    "meta": {
     "source": "vault-dynamic",
     "lease_id": "database/creds/app/D69RNhHPZusO9dpdpZ12BlOP",
     "lease_duration": 30,
     "vault_auth": "kubernetes",
     "vault_role": "orders-api",
     "service_account": "orders/orders-api",
     "vault_token_ttl": 600,
     "db_user": "v-kubernet-app-PLWbEd6zRafZNYIcuXvr-1792182525",
     "instance": "orders-api-545f5998-hdqlt"
    },
    "rows": [
     {
      "id": 1,
      "customer": "Alex Morgan",
      "item": "Noise-cancelling headphones",
      "amount": 249.0
     },
     {
      "id": 2,
      "customer": "Sam Cole",
      "item": "Mechanical keyboard",
      "amount": 129.5
     },
     {
      "id": 3,
      "customer": "Robin Berg",
      "item": "USB-C dock",
      "amount": 89.99
     },
     {
      "id": 4,
      "customer": "Kim Lund",
      "item": "27\" monitor",
      "amount": 329.0
     },
     {
      "id": 5,
      "customer": "Taylor Nystr\u00f6m",
      "item": "Webcam",
      "amount": 74.9
     }
    ]
   },
   "dt": 62
  },
  {
   "event": "end",
   "ok": true,
   "dt": 62
  },
  {
   "id": 177,
   "t": 1792182525527,
   "source": "http",
   "from": "you",
   "to": "app-k8s",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 637
  },
  {
   "id": 178,
   "t": 1792182525541,
   "source": "vault",
   "from": "orders-api",
   "to": "vault",
   "label": "update auth/kubernetes/login",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-api",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 637
  },
  {
   "id": 179,
   "t": 1792182525541,
   "source": "vault",
   "from": "vault",
   "to": "k8s-api",
   "label": "TokenReview",
   "status": "ok",
   "inferred": true,
   "detail": "implied by the successful login",
   "event": "bus",
   "dt": 637
  },
  {
   "id": 180,
   "t": 1792182525548,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-kubernet-app-PLWbEd6zRafZNYIcuXvr-1792182525",
   "event": "bus",
   "dt": 637
  },
  {
   "id": 181,
   "t": 1792182525555,
   "source": "vault",
   "from": "orders-api",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-api",
   "policies": [
    "app-dynamic",
    "default"
   ],
   "override": false,
   "event": "bus",
   "dt": 638
  },
  {
   "id": 182,
   "t": 1792182525560,
   "source": "db",
   "from": "k3s",
   "to": "postgres",
   "status": "ok",
   "label": "connect as v-kubernet-app-PLWbEd6zRafZNYIcuXvr-1792182525",
   "event": "bus",
   "dt": 735
  },
  {
   "id": 183,
   "t": 1792182525564,
   "source": "http",
   "from": "app-k8s",
   "to": "you",
   "label": "200 GET /orders",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 735
  }
 ],
 "k8s-pod-spec?app=orders-api": [
  {
   "event": "start",
   "id": "k8s-pod-spec",
   "title": "What the pod is configured with",
   "params": {
    "app": "orders-api"
   },
   "steps": 1,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "k8s",
   "title": "The orders-api pod's spec",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "k8s",
   "title": "The orders-api pod's spec",
   "command": "kubectl -n orders get pod -l app=orders-api -o yaml",
   "request": {
    "method": "GET",
    "target": "k8s",
    "path": "/api/v1/namespaces/orders/pods?labelSelector=app%3Dorders-api",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 6,
   "ok": true,
   "as_expected": true,
   "response": {
    "pod": "orders-api-545f5998-hdqlt",
    "serviceAccountName": "orders-api",
    "image": "vsj/orders-api:dev",
    "env": [
     {
      "name": "SECRET_SOURCE",
      "value": "dynamic"
     },
     {
      "name": "VAULT_ADDR",
      "value": "http://vault.orders.svc:8200"
     },
     {
      "name": "VAULT_K8S_ROLE",
      "value": "orders-api"
     },
     {
      "name": "DB_HOST",
      "value": "postgres.orders.svc"
     }
    ],
    "volumeMounts": [
     {
      "name": "kube-api-access-wbv9n",
      "readOnly": true,
      "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
     }
    ]
   },
   "dt": 44
  },
  {
   "event": "end",
   "ok": true,
   "dt": 44
  },
  {
   "id": 184,
   "t": 1792182527159,
   "source": "http",
   "from": "you",
   "to": "k8s-api",
   "label": "GET /api/v1/namespaces/orders/pods",
   "status": "pending",
   "event": "bus",
   "dt": 1541
  },
  {
   "id": 185,
   "t": 1792182527165,
   "source": "http",
   "from": "k8s-api",
   "to": "you",
   "label": "200 GET /api/v1/namespaces/orders/pods",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 1541
  }
 ],
 "k8s-pod-spec?app=reporting": [
  {
   "event": "start",
   "id": "k8s-pod-spec",
   "title": "What the pod is configured with",
   "params": {
    "app": "reporting"
   },
   "steps": 1,
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "k8s",
   "title": "The reporting pod's spec",
   "seconds": null,
   "dt": 39
  },
  {
   "event": "step",
   "index": 0,
   "kind": "k8s",
   "title": "The reporting pod's spec",
   "command": "kubectl -n orders get pod -l app=reporting -o yaml",
   "request": {
    "method": "GET",
    "target": "k8s",
    "path": "/api/v1/namespaces/orders/pods?labelSelector=app%3Dreporting",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 6,
   "ok": true,
   "as_expected": true,
   "response": {
    "pod": "reporting-7d5778746b-n9gzc",
    "serviceAccountName": "reporting",
    "image": "vsj/orders-api:dev",
    "env": [
     {
      "name": "SECRET_SOURCE",
      "value": "dynamic"
     },
     {
      "name": "VAULT_ADDR",
      "value": "http://vault.orders.svc:8200"
     },
     {
      "name": "VAULT_K8S_ROLE",
      "value": "orders-api"
     },
     {
      "name": "DB_HOST",
      "value": "postgres.orders.svc"
     }
    ],
    "volumeMounts": [
     {
      "name": "kube-api-access-n5bwh",
      "readOnly": true,
      "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
     }
    ]
   },
   "dt": 45
  },
  {
   "event": "end",
   "ok": true,
   "dt": 45
  },
  {
   "id": 186,
   "t": 1792182527823,
   "source": "http",
   "from": "you",
   "to": "k8s-api",
   "label": "GET /api/v1/namespaces/orders/pods",
   "status": "pending",
   "event": "bus",
   "dt": 672
  },
  {
   "id": 187,
   "t": 1792182527829,
   "source": "http",
   "from": "k8s-api",
   "to": "you",
   "label": "200 GET /api/v1/namespaces/orders/pods",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 672
  },
  {
   "id": 188,
   "t": 1792182528475,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-GGKyEhLsXgbsI4oIxjI9-1792182488",
   "event": "bus",
   "dt": 1263
  },
  {
   "id": 189,
   "t": 1792182528477,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 1263
  },
  {
   "id": 190,
   "t": 1792182528478,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
   "event": "bus",
   "dt": 1264
  },
  {
   "id": 191,
   "t": 1792182528483,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 1363
  }
 ],
 "k8s-identity": [
  {
   "event": "start",
   "id": "k8s-identity",
   "title": "The identity the pod presents to Vault",
   "params": {},
   "steps": 2,
   "dt": 35
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "Service account token claims (demo-only endpoint, signature not shown)",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "Service account token claims (demo-only endpoint, signature not shown)",
   "command": "kubectl -n orders exec deploy/orders-api -- cat /var/run/secrets/kubernetes.io/serviceaccount/token",
   "request": {
    "method": "GET",
    "target": "app-k8s",
    "path": "/debug/identity",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": {
    "token_file": "/var/run/secrets/kubernetes.io/serviceaccount/token",
    "claims": {
     "aud": [
      "https://kubernetes.default.svc.cluster.local",
      "k3s"
     ],
     "exp": 1823718081,
     "iat": 1792182081,
     "iss": "https://kubernetes.default.svc.cluster.local",
     "jti": "c38fd341-ed36-4a50-9162-6350d945d544",
     "kubernetes.io": {
      "namespace": "orders",
      "node": {
       "name": "k3s",
       "uid": "f9267729-9731-4dfc-b228-541665d78b34"
      },
      "pod": {
       "name": "orders-api-545f5998-hdqlt",
       "uid": "06dfc126-92fa-4e93-8e4f-d8f2c8ec555d"
      },
      "serviceaccount": {
       "name": "orders-api",
       "uid": "8bb6b8d7-401f-4621-94fc-fc9ed4b87121"
      },
      "warnafter": 1792185688
     },
     "nbf": 1792182081,
     "sub": "system:serviceaccount:orders:orders-api"
    }
   },
   "dt": 42
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "vault",
   "title": "The Vault role it maps to",
   "seconds": null,
   "dt": 42
  },
  {
   "event": "step",
   "index": 1,
   "kind": "vault",
   "title": "The Vault role it maps to",
   "command": "vault read auth/kubernetes/role/orders-api",
   "request": {
    "method": "GET",
    "target": "vault",
    "path": "/v1/auth/kubernetes/role/orders-api",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 3,
   "ok": true,
   "as_expected": true,
   "response": {
    "bound_service_account_names": [
     "orders-api"
    ],
    "bound_service_account_namespaces": [
     "orders"
    ],
    "audience": "https://kubernetes.default.svc.cluster.local",
    "token_policies": [
     "app-dynamic"
    ],
    "token_ttl": 600
   },
   "dt": 45
  },
  {
   "event": "end",
   "ok": true,
   "dt": 45
  },
  {
   "id": 192,
   "t": 1792182529420,
   "source": "http",
   "from": "you",
   "to": "app-k8s",
   "label": "GET /debug/identity",
   "status": "pending",
   "event": "bus",
   "dt": 692
  },
  {
   "id": 193,
   "t": 1792182529424,
   "source": "http",
   "from": "app-k8s",
   "to": "you",
   "label": "200 GET /debug/identity",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 692
  },
  {
   "id": 194,
   "t": 1792182529426,
   "source": "vault",
   "from": "you",
   "to": "vault",
   "label": "read auth/kubernetes/role/orders-api",
   "status": "ok",
   "detail": "",
   "who": "root",
   "policies": [
    "root"
   ],
   "override": false,
   "event": "bus",
   "dt": 692
  }
 ],
 "k8s-wrong-sa": [
  {
   "event": "start",
   "id": "k8s-wrong-sa",
   "title": "Same image, different service account",
   "params": {},
   "steps": 1,
   "dt": 21
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "GET /orders on the reporting pod (service account orders/reporting)",
   "seconds": null,
   "dt": 25
  },
  {
   "id": 195,
   "t": 1792182530381,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "secret",
   "label": "write Secret orders-db",
   "event": "bus",
   "dt": 27
  },
  {
   "id": 196,
   "t": 1792182530386,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "app-vso",
   "label": "rollout restart orders-vso",
   "event": "bus",
   "dt": 28
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "GET /orders on the reporting pod (service account orders/reporting)",
   "command": "curl http://reporting.orders.svc:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-reporting",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 502,
   "ms": 11,
   "ok": false,
   "as_expected": true,
   "response": {
    "detail": {
     "vault_path": "auth/kubernetes/login",
     "vault_status": 403,
     "vault_errors": [
      "service account name not authorized"
     ]
    }
   },
   "dt": 35
  },
  {
   "event": "end",
   "ok": true,
   "dt": 35
  },
  {
   "id": 197,
   "t": 1792182530997,
   "source": "http",
   "from": "you",
   "to": "app-reporting",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 617
  },
  {
   "id": 198,
   "t": 1792182531007,
   "source": "vault",
   "from": "k3s",
   "to": "vault",
   "label": "update auth/kubernetes/login",
   "status": "denied",
   "detail": "service account name not authorized",
   "who": "-",
   "policies": [],
   "override": false,
   "event": "bus",
   "dt": 715
  },
  {
   "id": 199,
   "t": 1792182531008,
   "source": "http",
   "from": "app-reporting",
   "to": "you",
   "label": "502 GET /orders",
   "status": "denied",
   "response": true,
   "event": "bus",
   "dt": 715
  }
 ],
 "vso-request": [
  {
   "event": "start",
   "id": "vso-request",
   "title": "Send a request to the operator-managed app",
   "params": {},
   "steps": 1,
   "dt": 33
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "GET /orders (pod orders-vso, credentials from the Secret orders-db)",
   "seconds": null,
   "dt": 37
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "GET /orders (pod orders-vso, credentials from the Secret orders-db)",
   "command": "curl http://orders-vso.orders.svc:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-vso",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 15,
   "ok": true,
   "as_expected": true,
   "response": {
    "meta": {
     "source": "env",
     "where": "DB_USER / DB_PASSWORD environment variables",
     "db_user": "v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
     "instance": "orders-vso-6788d68dd6-spjgt"
    },
    "rows": [
     {
      "id": 1,
      "customer": "Alex Morgan",
      "item": "Noise-cancelling headphones",
      "amount": 249.0
     },
     {
      "id": 2,
      "customer": "Sam Cole",
      "item": "Mechanical keyboard",
      "amount": 129.5
     },
     {
      "id": 3,
      "customer": "Robin Berg",
      "item": "USB-C dock",
      "amount": 89.99
     },
     {
      "id": 4,
      "customer": "Kim Lund",
      "item": "27\" monitor",
      "amount": 329.0
     },
     {
      "id": 5,
      "customer": "Taylor Nystr\u00f6m",
      "item": "Webcam",
      "amount": 74.9
     }
    ]
   },
   "dt": 52
  },
  {
   "event": "end",
   "ok": true,
   "dt": 52
  },
  {
   "id": 200,
   "t": 1792182532593,
   "source": "http",
   "from": "you",
   "to": "app-vso",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 643
  },
  {
   "id": 201,
   "t": 1792182532603,
   "source": "db",
   "from": "k3s",
   "to": "postgres",
   "status": "ok",
   "label": "connect as v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
   "event": "bus",
   "dt": 644
  },
  {
   "id": 202,
   "t": 1792182532608,
   "source": "http",
   "from": "app-vso",
   "to": "you",
   "label": "200 GET /orders",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 644
  }
 ],
 "vso-objects": [
  {
   "event": "start",
   "id": "vso-objects",
   "title": "What the operator manages",
   "params": {},
   "steps": 4,
   "dt": 19
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "k8s",
   "title": "The VaultDynamicSecret (what to fetch, and what to restart)",
   "seconds": null,
   "dt": 24
  },
  {
   "event": "step",
   "index": 0,
   "kind": "k8s",
   "title": "The VaultDynamicSecret (what to fetch, and what to restart)",
   "command": "kubectl -n orders get vaultdynamicsecret orders-db -o yaml",
   "request": {
    "method": "GET",
    "target": "k8s",
    "path": "/apis/secrets.hashicorp.com/v1beta1/namespaces/orders/vaultdynamicsecrets/orders-db",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 6,
   "ok": true,
   "as_expected": true,
   "response": {
    "vaultAuthRef": "orders-vso",
    "vault_path": "creds/app",
    "mount": "database",
    "destination": "orders-db",
    "rolloutRestartTargets": [
     {
      "kind": "Deployment",
      "name": "orders-vso"
     }
    ],
    "renewalPercent": 67,
    "lease": {
     "duration": 30,
     "id": "database/creds/app/z5700QKbxrqQF0JbBk1bmxSL",
     "renewable": true,
     "requestID": "50d3a492-2024-fe24-5024-16973f956d67"
    },
    "lastRenewalTime": 1792182528
   },
   "dt": 29
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "k8s",
   "title": "The Secret it writes (username decoded)",
   "seconds": null,
   "dt": 29
  },
  {
   "event": "step",
   "index": 1,
   "kind": "k8s",
   "title": "The Secret it writes (username decoded)",
   "command": "kubectl -n orders get secret orders-db -o jsonpath='{.data.username}' | base64 -d",
   "request": {
    "method": "GET",
    "target": "k8s",
    "path": "/api/v1/namespaces/orders/secrets/orders-db",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 5,
   "ok": true,
   "as_expected": true,
   "response": {
    "username": "v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
    "labels": {
     "app.kubernetes.io/component": "secret-sync",
     "app.kubernetes.io/managed-by": "hashicorp-vso",
     "app.kubernetes.io/name": "vault-secrets-operator",
     "secrets.hashicorp.com/vso-ownerRefUID": "a89b86bc-7d4e-4cf6-a656-806a8c88b292"
    },
    "ownerReferences": [
     {
      "apiVersion": "secrets.hashicorp.com/v1beta1",
      "kind": "VaultDynamicSecret",
      "name": "orders-db",
      "uid": "a89b86bc-7d4e-4cf6-a656-806a8c88b292"
     }
    ]
   },
   "dt": 34
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "k8s",
   "title": "The app pod (env from the Secret, no service account token)",
   "seconds": null,
   "dt": 34
  },
  {
   "event": "step",
   "index": 2,
   "kind": "k8s",
   "title": "The app pod (env from the Secret, no service account token)",
   "command": "kubectl -n orders get pod -l app=orders-vso -o yaml",
   "request": {
    "method": "GET",
    "target": "k8s",
    "path": "/api/v1/namespaces/orders/pods?labelSelector=app%3Dorders-vso",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 5,
   "ok": true,
   "as_expected": true,
   "response": {
    "pod": "orders-vso-6788d68dd6-spjgt",
    "automountServiceAccountToken": false,
    "env": [
     {
      "name": "SECRET_SOURCE",
      "value": "env"
     },
     {
      "name": "DB_HOST",
      "value": "postgres.orders.svc"
     },
     {
      "name": "DB_USER",
      "valueFrom": {
       "secretKeyRef": {
        "name": "orders-db",
        "key": "username"
       }
      }
     },
     {
      "name": "DB_PASSWORD",
      "valueFrom": {
       "secretKeyRef": {
        "name": "orders-db",
        "key": "password"
       }
      }
     }
    ]
   },
   "dt": 40
  },
  {
   "event": "step-start",
   "index": 3,
   "kind": "http",
   "title": "Does the app pod have a Kubernetes identity?",
   "seconds": null,
   "dt": 40
  },
  {
   "event": "step",
   "index": 3,
   "kind": "http",
   "title": "Does the app pod have a Kubernetes identity?",
   "command": "kubectl -n orders exec deploy/orders-vso -- ls /var/run/secrets/kubernetes.io/serviceaccount",
   "request": {
    "method": "GET",
    "target": "app-vso",
    "path": "/debug/identity",
    "body": null,
    "headers": {}
   },
   "status": 404,
   "ms": 3,
   "ok": false,
   "as_expected": true,
   "response": {
    "detail": "no Kubernetes service account token at /var/run/secrets/kubernetes.io/serviceaccount/token: this instance has no Kubernetes identity"
   },
   "dt": 43
  },
  {
   "event": "end",
   "ok": true,
   "dt": 43
  },
  {
   "id": 203,
   "t": 1792182534177,
   "source": "http",
   "from": "you",
   "to": "k8s-api",
   "label": "GET /apis/secrets.hashicorp.com/v1beta1/namespaces/orders/vaultdynamicsecrets/orders-db",
   "status": "pending",
   "event": "bus",
   "dt": 655
  },
  {
   "id": 204,
   "t": 1792182534183,
   "source": "http",
   "from": "k8s-api",
   "to": "you",
   "label": "200 GET /apis/secrets.hashicorp.com/v1beta1/namespaces/orders/vaultdynamicsecrets/orders-db",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 655
  },
  {
   "id": 205,
   "t": 1792182534183,
   "source": "http",
   "from": "you",
   "to": "k8s-api",
   "label": "GET /api/v1/namespaces/orders/secrets/orders-db",
   "status": "pending",
   "event": "bus",
   "dt": 655
  },
  {
   "id": 206,
   "t": 1792182534188,
   "source": "http",
   "from": "k8s-api",
   "to": "you",
   "label": "200 GET /api/v1/namespaces/orders/secrets/orders-db",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 656
  },
  {
   "id": 207,
   "t": 1792182534189,
   "source": "http",
   "from": "you",
   "to": "k8s-api",
   "label": "GET /api/v1/namespaces/orders/pods",
   "status": "pending",
   "event": "bus",
   "dt": 656
  },
  {
   "id": 208,
   "t": 1792182534194,
   "source": "http",
   "from": "k8s-api",
   "to": "you",
   "label": "200 GET /api/v1/namespaces/orders/pods",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 656
  },
  {
   "id": 209,
   "t": 1792182534194,
   "source": "http",
   "from": "you",
   "to": "app-vso",
   "label": "GET /debug/identity",
   "status": "pending",
   "event": "bus",
   "dt": 656
  },
  {
   "id": 210,
   "t": 1792182534197,
   "source": "http",
   "from": "app-vso",
   "to": "you",
   "label": "404 GET /debug/identity",
   "status": "denied",
   "response": true,
   "event": "bus",
   "dt": 657
  }
 ],
 "vso-rotation": [
  {
   "event": "start",
   "id": "vso-rotation",
   "title": "Watch the operator rotate the credentials",
   "params": {},
   "steps": 3,
   "dt": 22
  },
  {
   "event": "step-start",
   "index": 0,
   "kind": "http",
   "title": "GET /orders now",
   "seconds": null,
   "dt": 27
  },
  {
   "event": "step",
   "index": 0,
   "kind": "http",
   "title": "GET /orders now",
   "command": "curl http://orders-vso.orders.svc:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-vso",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 12,
   "ok": true,
   "as_expected": true,
   "response": {
    "db_user": "v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
    "pod": "orders-vso-6788d68dd6-spjgt"
   },
   "dt": 38
  },
  {
   "event": "step-start",
   "index": 1,
   "kind": "wait",
   "title": "Wait for the operator (renews at 20 s, rotates when the 60 s maximum is near)",
   "seconds": 45,
   "dt": 38
  },
  {
   "id": 211,
   "t": 1792182535770,
   "source": "http",
   "from": "you",
   "to": "app-vso",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 677
  },
  {
   "id": 212,
   "t": 1792182535777,
   "source": "db",
   "from": "k3s",
   "to": "postgres",
   "status": "ok",
   "label": "connect as v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
   "event": "bus",
   "dt": 677
  },
  {
   "id": 213,
   "t": 1792182535782,
   "source": "http",
   "from": "app-vso",
   "to": "you",
   "label": "200 GET /orders",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 678
  },
  {
   "id": 214,
   "t": 1792182540267,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-z23Nma9HzwT730wd4GA1-1792182511",
   "event": "bus",
   "dt": 4985
  },
  {
   "id": 215,
   "t": 1792182546631,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-SeTOMyTZaecK4MSXf0s9-1792182517",
   "event": "bus",
   "dt": 11264
  },
  {
   "id": 216,
   "t": 1792182548219,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-TgSyzDyqo8PzFSkDzr9o-1792182519",
   "event": "bus",
   "dt": 12736
  },
  {
   "id": 217,
   "t": 1792182548497,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-kubernet-app-GGKyEhLsXgbsI4oIxjI9-1792182488",
   "event": "bus",
   "dt": 13029
  },
  {
   "id": 218,
   "t": 1792182548786,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
   "event": "bus",
   "dt": 13322
  },
  {
   "id": 219,
   "t": 1792182548788,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 13322
  },
  {
   "id": 220,
   "t": 1792182549832,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-xsjAPmocTdhsd0B8BgWo-1792182520",
   "event": "bus",
   "dt": 14304
  },
  {
   "id": 221,
   "t": 1792182551430,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-d18fUhEcCmydInNRC2hU-1792182522",
   "event": "bus",
   "dt": 15880
  },
  {
   "id": 222,
   "t": 1792182553029,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-token-ap-app-kxydfHfTYBsO3rk2z6mi-1792182523",
   "event": "bus",
   "dt": 17481
  },
  {
   "id": 223,
   "t": 1792182554640,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "DROP ROLE v-kubernet-app-PLWbEd6zRafZNYIcuXvr-1792182525",
   "event": "bus",
   "dt": 18954
  },
  {
   "id": 224,
   "t": 1792182570213,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "ALTER ROLE v-kubernet-app-U59cvaiVRkirT0fFuquF-1792182528",
   "event": "bus",
   "dt": 34970
  },
  {
   "id": 225,
   "t": 1792182570215,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "update sys/leases/renew",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 34970
  },
  {
   "id": 226,
   "t": 1792182570217,
   "source": "db",
   "from": "vault",
   "to": "postgres",
   "status": "ok",
   "label": "CREATE ROLE v-kubernet-app-WvO5nVI9OtluWm1xW4yI-1792182570",
   "event": "bus",
   "dt": 35067
  },
  {
   "id": 227,
   "t": 1792182570223,
   "source": "vault",
   "from": "operator",
   "to": "vault",
   "label": "read database/creds/app",
   "status": "ok",
   "detail": "",
   "who": "kubernetes-orders-orders-vso",
   "policies": [
    "default",
    "orders-vso"
   ],
   "override": false,
   "event": "bus",
   "dt": 35067
  },
  {
   "id": 228,
   "t": 1792182571775,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "secret",
   "label": "write Secret orders-db",
   "event": "bus",
   "dt": 36535
  },
  {
   "id": 229,
   "t": 1792182571781,
   "source": "k8s",
   "status": "ok",
   "from": "operator",
   "to": "app-vso",
   "label": "rollout restart orders-vso",
   "event": "bus",
   "dt": 36535
  },
  {
   "event": "step",
   "index": 1,
   "kind": "wait",
   "title": "Wait for the operator (renews at 20 s, rotates when the 60 s maximum is near)",
   "seconds": 45.0,
   "ok": true,
   "as_expected": true,
   "dt": 43769
  },
  {
   "event": "step-start",
   "index": 2,
   "kind": "http",
   "title": "GET /orders again",
   "seconds": null,
   "dt": 43769
  },
  {
   "event": "step",
   "index": 2,
   "kind": "http",
   "title": "GET /orders again",
   "command": "curl http://orders-vso.orders.svc:8000/orders",
   "request": {
    "method": "GET",
    "target": "app-vso",
    "path": "/orders",
    "body": null,
    "headers": {}
   },
   "status": 200,
   "ms": 15,
   "ok": true,
   "as_expected": true,
   "response": {
    "db_user": "v-kubernet-app-WvO5nVI9OtluWm1xW4yI-1792182570",
    "pod": "orders-vso-745f964f96-tzzz6"
   },
   "dt": 43783
  },
  {
   "event": "end",
   "ok": true,
   "dt": 43783
  },
  {
   "id": 230,
   "t": 1792182579892,
   "source": "http",
   "from": "you",
   "to": "app-vso",
   "label": "GET /orders",
   "status": "pending",
   "event": "bus",
   "dt": 44355
  },
  {
   "id": 231,
   "t": 1792182579902,
   "source": "db",
   "from": "k3s",
   "to": "postgres",
   "status": "ok",
   "label": "connect as v-kubernet-app-WvO5nVI9OtluWm1xW4yI-1792182570",
   "event": "bus",
   "dt": 44454
  },
  {
   "id": 232,
   "t": 1792182579907,
   "source": "http",
   "from": "app-vso",
   "to": "you",
   "label": "200 GET /orders",
   "status": "ok",
   "response": true,
   "event": "bus",
   "dt": 44454
  }
 ]
};
