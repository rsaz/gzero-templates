# GZERO Django

A server-rendered revenue-operations dashboard built on Django 5.

```sh
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver 3000
# open http://localhost:3000
```

No database models are used — the dashboard reads from an in-memory demo dataset,
so there are no migrations to run. The project is split into a `config` project
package and a `dashboard` app; all derived values (bar heights, formatted
currency, badge classes) are computed in the view and rendered by the template.

| Route | Purpose |
| --- | --- |
| `GET /` | HTML dashboard |
| `GET /api/dashboard` | The same data as JSON |
| `GET /health` | Liveness probe with service identity and uptime |

Configuration is read from the environment: `DEBUG`, `SECRET_KEY`, `ALLOWED_HOSTS`,
`HOST`, and `PORT`. Static files are served by WhiteNoise, so the app runs the same
way in a container without a separate web server.

Build and run the container with `docker build -t gzero-django .` and
`docker run --rm -p 3000:3000 gzero-django`.
