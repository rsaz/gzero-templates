# GZERO Streamlit

An interactive revenue-operations dashboard built with Streamlit.

```sh
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
streamlit run streamlit_app.py
# open http://localhost:3000
```

The app renders KPI tiles, a grouped revenue-vs-target bar chart (Altair), an
operating-pulse feed, and a live-filterable pipeline table. It reads the same
demo dataset as the other GZERO templates from `dashboard_data.py`.

Theme colors and the listen address/port live in `.streamlit/config.toml`; the
default port is `3000`. Streamlit exposes a built-in health probe at
`/_stcore/health`, which the Dockerfile's `HEALTHCHECK` uses.

Build and run the container with `docker build -t gzero-streamlit .` and
`docker run --rm -p 3000:3000 gzero-streamlit`.
