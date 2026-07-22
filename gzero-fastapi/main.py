"""FastAPI application exposing a server-rendered revenue dashboard.

Routes:
    GET /                 HTML dashboard (KPIs, revenue chart, pipeline table).
    GET /api/dashboard    The same data as JSON.
    GET /health           Liveness probe with service identity and uptime.
"""

from __future__ import annotations

import time
from datetime import datetime, timezone

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from dashboard_data import get_dashboard_data

SERVICE = "gzero-fastapi"
VERSION = "1.0.0"
_STARTED_AT = time.monotonic()

app = FastAPI(title="GZERO FastAPI Dashboard")
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


def _compact_currency(value: float) -> str:
    if abs(value) >= 1_000_000:
        return f"${value / 1_000_000:.1f}M"
    if abs(value) >= 1_000:
        return f"${value / 1_000:.1f}K"
    return f"${value:.0f}"


def _currency(value: float) -> str:
    return f"${value:,.0f}"


def _short_date(value: str) -> str:
    return datetime.strptime(value, "%Y-%m-%d").strftime("%b %-d, %Y")


def _slug(value: str) -> str:
    return value.lower().replace(" ", "-")


templates.env.filters["compact_currency"] = _compact_currency
templates.env.filters["currency"] = _currency
templates.env.filters["short_date"] = _short_date
templates.env.filters["slug"] = _slug


@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request) -> HTMLResponse:
    data = get_dashboard_data()
    peak = max((point["target"] for point in data["revenue"]), default=1)
    updated = datetime.fromisoformat(data["updatedAt"]).strftime("%I:%M %p")
    response = templates.TemplateResponse(
        request,
        "dashboard.html",
        {"data": data, "peak": peak, "updated": updated},
    )
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/api/dashboard")
def dashboard_api() -> JSONResponse:
    response = JSONResponse(get_dashboard_data())
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/health")
def health() -> JSONResponse:
    return JSONResponse(
        {
            "status": "ok",
            "service": SERVICE,
            "version": VERSION,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "uptimeSeconds": int(time.monotonic() - _STARTED_AT),
        }
    )
