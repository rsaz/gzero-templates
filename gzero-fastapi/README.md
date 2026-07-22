# GZERO FastAPI

A server-rendered revenue-operations dashboard built on FastAPI, served with
Uvicorn and rendered with Jinja2.

```sh
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 3000
# open http://localhost:3000
```

The same demo data drives an HTML dashboard and a JSON endpoint, so the template
doubles as a headless API. Interactive API docs are available at `/docs`.

| Route | Purpose |
| --- | --- |
| `GET /` | HTML dashboard |
| `GET /api/dashboard` | The same data as JSON |
| `GET /health` | Liveness probe with service identity and uptime |
| `GET /docs` | Auto-generated OpenAPI docs |

Set `HOST` and `PORT` to change the listener; `PORT` defaults to `3000`.

Build and run the container with `docker build -t gzero-fastapi .` and
`docker run --rm -p 3000:3000 gzero-fastapi`.
