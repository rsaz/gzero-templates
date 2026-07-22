"""Flask application exposing a server-rendered revenue dashboard.

Routes:
    GET /                 HTML dashboard (KPIs, revenue chart, pipeline table).
    GET /api/dashboard    The same data as JSON.
    GET /health           Liveness probe with service identity and uptime.
"""

from __future__ import annotations

import os
import time
from datetime import datetime, timezone

from flask import Flask, jsonify, render_template

from dashboard_data import get_dashboard_data

SERVICE = "gzero-flask"
VERSION = "1.0.0"
_STARTED_AT = time.monotonic()

app = Flask(__name__)


@app.template_filter("currency")
def currency(value: float) -> str:
    """Format a number as a whole-dollar amount, e.g. ``$420,000``."""
    return f"${value:,.0f}"


@app.template_filter("compact_currency")
def compact_currency(value: float) -> str:
    """Format a number compactly, e.g. ``$846.2K`` or ``$2.1M``."""
    if abs(value) >= 1_000_000:
        return f"${value / 1_000_000:.1f}M"
    if abs(value) >= 1_000:
        return f"${value / 1_000:.1f}K"
    return f"${value:.0f}"


@app.template_filter("short_date")
def short_date(value: str) -> str:
    """Render an ISO ``YYYY-MM-DD`` string as ``Aug 14, 2026``."""
    return datetime.strptime(value, "%Y-%m-%d").strftime("%b %-d, %Y")


@app.template_filter("slug")
def slug(value: str) -> str:
    """Lowercase and hyphenate a label for use as a CSS class."""
    return value.lower().replace(" ", "-")


@app.after_request
def no_store(response):
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/")
def dashboard():
    data = get_dashboard_data()
    peak = max((point["target"] for point in data["revenue"]), default=1)
    updated = datetime.fromisoformat(data["updatedAt"]).strftime("%I:%M %p")
    return render_template(
        "dashboard.html",
        data=data,
        peak=peak,
        updated=updated,
    )


@app.get("/api/dashboard")
def dashboard_api():
    return jsonify(get_dashboard_data())


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "service": SERVICE,
            "version": VERSION,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "uptimeSeconds": int(time.monotonic() - _STARTED_AT),
        }
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "3000"))
    host = os.environ.get("HOST", "0.0.0.0")
    app.run(host=host, port=port, debug=True)
