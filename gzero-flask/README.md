# GZERO Flask

A server-rendered revenue-operations dashboard built on Flask 3 and Jinja2.

```sh
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py
# open http://localhost:3000
```

The dashboard renders KPI tiles, a revenue-vs-target bar chart, an operating-pulse
feed, and a searchable pipeline table entirely on the server. Table search is a
small progressive-enhancement script; the page is fully readable without JavaScript.

| Route | Purpose |
| --- | --- |
| `GET /` | HTML dashboard |
| `GET /api/dashboard` | The same data as JSON |
| `GET /health` | Liveness probe with service identity and uptime |

Set `HOST` and `PORT` to change the listener; `PORT` defaults to `3000`.
`python app.py` runs Flask's development server with reload. For production, the
included Dockerfile serves the app with Gunicorn.

Build and run the container with `docker build -t gzero-flask .` and
`docker run --rm -p 3000:3000 gzero-flask`.
