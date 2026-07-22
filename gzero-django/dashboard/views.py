"""Views for the revenue-operations dashboard.

Django templates cannot do arithmetic, so every derived value (bar heights,
formatted currency, CSS class slugs) is computed here and handed to the template
ready to render.
"""

from __future__ import annotations

import time
from datetime import datetime, timezone

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .data import get_dashboard_data

SERVICE = "gzero-django"
VERSION = "1.0.0"
_STARTED_AT = time.monotonic()


def _currency(value: float) -> str:
    return f"${value:,.0f}"


def _compact_currency(value: float) -> str:
    if abs(value) >= 1_000_000:
        return f"${value / 1_000_000:.1f}M"
    if abs(value) >= 1_000:
        return f"${value / 1_000:.1f}K"
    return f"${value:.0f}"


def _short_date(value: str) -> str:
    return datetime.strptime(value, "%Y-%m-%d").strftime("%b %-d, %Y")


def _slug(value: str) -> str:
    return value.lower().replace(" ", "-")


def dashboard(request) -> HttpResponse:
    data = get_dashboard_data()
    peak = max((point["target"] for point in data["revenue"]), default=1)

    revenue = [
        {
            "month": point["month"],
            "actual_height": max(point["revenue"] / peak * 100, 8),
            "target_height": max(point["target"] / peak * 100, 8),
        }
        for point in data["revenue"]
    ]

    deals = [
        {
            "account": deal["account"],
            "region": deal["region"],
            "owner": deal["owner"],
            "stage": deal["stage"],
            "stage_class": deal["stage"].lower(),
            "value": _currency(deal["value"]),
            "probability": deal["probability"],
            "close_date": _short_date(deal["closeDate"]),
            "health": deal["health"],
            "health_class": _slug(deal["health"]),
        }
        for deal in data["deals"]
    ]

    context = {
        "updated": datetime.fromisoformat(data["updatedAt"]).strftime("%I:%M %p"),
        "kpis": {
            "revenue": _compact_currency(data["kpis"]["revenue"]),
            "pipeline": _compact_currency(data["kpis"]["pipeline"]),
            "win_rate": data["kpis"]["winRate"],
            "churn_risk": data["kpis"]["churnRisk"],
        },
        "revenue": revenue,
        "activities": data["activities"],
        "deals": deals,
    }

    response = render(request, "dashboard/dashboard.html", context)
    response.headers["Cache-Control"] = "no-store"
    return response


def dashboard_api(request) -> JsonResponse:
    response = JsonResponse(get_dashboard_data())
    response.headers["Cache-Control"] = "no-store"
    return response


def health(request) -> JsonResponse:
    return JsonResponse(
        {
            "status": "ok",
            "service": SERVICE,
            "version": VERSION,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "uptimeSeconds": int(time.monotonic() - _STARTED_AT),
        }
    )
