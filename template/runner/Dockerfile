FROM python:3.12-slim
WORKDIR /runner
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py events.py ./
EXPOSE 8080
HEALTHCHECK --interval=3s --timeout=3s --retries=20 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/api/health')"
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
