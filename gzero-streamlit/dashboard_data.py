"""Revenue-operations dashboard data.

A single source of demo data shared by the view and the JSON endpoint. In a
real application this module would query a database or an upstream service.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

KPIS: dict[str, float] = {
    "revenue": 846_200,
    "pipeline": 2_140_000,
    "winRate": 41.8,
    "churnRisk": 7.4,
}

REVENUE: list[dict[str, Any]] = [
    {"month": "Jan", "revenue": 118_000, "target": 110_000},
    {"month": "Feb", "revenue": 126_500, "target": 118_000},
    {"month": "Mar", "revenue": 139_200, "target": 128_000},
    {"month": "Apr", "revenue": 151_800, "target": 145_000},
    {"month": "May", "revenue": 162_100, "target": 154_000},
    {"month": "Jun", "revenue": 148_600, "target": 160_000},
]

ACTIVITIES: list[dict[str, str]] = [
    {"id": "a1", "label": "Enterprise expansion meetings", "value": "18 scheduled", "trend": "up"},
    {"id": "a2", "label": "High-risk renewals", "value": "$214K exposed", "trend": "down"},
    {"id": "a3", "label": "Inbound qualified leads", "value": "72 this week", "trend": "up"},
    {"id": "a4", "label": "Average sales cycle", "value": "43 days", "trend": "flat"},
]

DEALS: list[dict[str, Any]] = [
    {"id": "d1", "account": "Northstar Bank", "owner": "Maya Chen", "stage": "Negotiation", "region": "East", "value": 420_000, "probability": 72, "closeDate": "2026-08-14", "health": "On track"},
    {"id": "d2", "account": "Greenline Logistics", "owner": "Noah Patel", "stage": "Proposal", "region": "West", "value": 310_000, "probability": 54, "closeDate": "2026-08-22", "health": "At risk"},
    {"id": "d3", "account": "Atlas Clinics", "owner": "Sofia Rivera", "stage": "Discovery", "region": "Central", "value": 180_000, "probability": 33, "closeDate": "2026-09-03", "health": "On track"},
    {"id": "d4", "account": "Beacon Energy", "owner": "Liam Turner", "stage": "Negotiation", "region": "South", "value": 560_000, "probability": 68, "closeDate": "2026-08-29", "health": "Stalled"},
    {"id": "d5", "account": "Urban Nest", "owner": "Amara Okafor", "stage": "Won", "region": "West", "value": 240_000, "probability": 100, "closeDate": "2026-07-24", "health": "On track"},
    {"id": "d6", "account": "Summit Foods", "owner": "Ethan Brooks", "stage": "Proposal", "region": "East", "value": 270_000, "probability": 49, "closeDate": "2026-09-10", "health": "At risk"},
    {"id": "d7", "account": "Cobalt Media", "owner": "Priya Shah", "stage": "Discovery", "region": "North", "value": 132_000, "probability": 28, "closeDate": "2026-09-18", "health": "On track"},
]


def get_dashboard_data() -> dict[str, Any]:
    """Return the dashboard payload with a fresh ``updatedAt`` timestamp."""
    return {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "kpis": KPIS,
        "revenue": REVENUE,
        "activities": ACTIVITIES,
        "deals": DEALS,
    }
