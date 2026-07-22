"""Streamlit revenue-operations dashboard.

Run with ``streamlit run streamlit_app.py``. The same demo dataset used by the
other GZERO templates drives KPI tiles, a revenue-vs-target chart, an operating
pulse feed, and a searchable pipeline table.
"""

from __future__ import annotations

from datetime import datetime

import altair as alt
import pandas as pd
import streamlit as st

from dashboard_data import get_dashboard_data

TEAL = "#0f766e"
AMBER = "#b45309"

st.set_page_config(
    page_title="Streamlit Revenue Dashboard",
    page_icon="📊",
    layout="wide",
)


def compact_currency(value: float) -> str:
    if abs(value) >= 1_000_000:
        return f"${value / 1_000_000:.1f}M"
    if abs(value) >= 1_000:
        return f"${value / 1_000:.1f}K"
    return f"${value:.0f}"


data = get_dashboard_data()
updated = datetime.fromisoformat(data["updatedAt"]).strftime("%I:%M %p")

header_left, header_right = st.columns([3, 1])
with header_left:
    st.caption("REVENUE OPERATIONS")
    st.title("Streamlit Revenue Dashboard")
with header_right:
    st.caption("")
    st.metric("Last updated", f"{updated} UTC")

st.divider()

# --- KPI tiles -------------------------------------------------------------
kpis = data["kpis"]
k1, k2, k3, k4 = st.columns(4)
k1.metric("Revenue", compact_currency(kpis["revenue"]), "+12.4% QoQ")
k2.metric("Pipeline", compact_currency(kpis["pipeline"]), "3.1x coverage")
k3.metric("Win rate", f"{kpis['winRate']}%", "+4.6 pts")
k4.metric("Churn risk", f"{kpis['churnRisk']}%", "-2 accounts", delta_color="inverse")

st.write("")

# --- Revenue chart + operating pulse --------------------------------------
chart_col, pulse_col = st.columns([1.6, 0.9])

with chart_col:
    st.subheader("Revenue vs target")
    revenue_df = pd.DataFrame(data["revenue"])
    long_df = revenue_df.melt(
        id_vars="month",
        value_vars=["revenue", "target"],
        var_name="series",
        value_name="amount",
    )
    long_df["series"] = long_df["series"].map({"revenue": "Actual", "target": "Target"})
    chart = (
        alt.Chart(long_df)
        .mark_bar(cornerRadiusTopLeft=4, cornerRadiusTopRight=4)
        .encode(
            x=alt.X("month:N", title=None, sort=list(revenue_df["month"])),
            xOffset="series:N",
            y=alt.Y("amount:Q", title=None, axis=alt.Axis(format="$,.0s")),
            color=alt.Color(
                "series:N",
                title=None,
                scale=alt.Scale(domain=["Actual", "Target"], range=[TEAL, AMBER]),
                legend=alt.Legend(orient="top"),
            ),
            tooltip=["month", "series", alt.Tooltip("amount:Q", format="$,.0f")],
        )
        .properties(height=300)
    )
    st.altair_chart(chart, width="stretch")

with pulse_col:
    st.subheader("Operating pulse")
    dots = {"up": "🟢", "down": "🔴", "flat": "🔵"}
    for item in data["activities"]:
        st.markdown(f"{dots[item['trend']]} **{item['label']}**  \n{item['value']}")

st.divider()

# --- Pipeline table --------------------------------------------------------
st.subheader("Active opportunities")
query = st.text_input("Search deals", placeholder="Search by account, owner, stage…")

deals_df = pd.DataFrame(data["deals"]).drop(columns=["id"])
deals_df = deals_df.rename(
    columns={
        "account": "Account",
        "owner": "Owner",
        "stage": "Stage",
        "region": "Region",
        "value": "Value",
        "probability": "Probability",
        "closeDate": "Close",
        "health": "Health",
    }
)
deals_df["Close"] = pd.to_datetime(deals_df["Close"]).dt.strftime("%b %d, %Y")

if query:
    mask = deals_df.apply(
        lambda row: row.astype(str).str.contains(query, case=False).any(), axis=1
    )
    deals_df = deals_df[mask]

st.dataframe(
    deals_df,
    width="stretch",
    hide_index=True,
    column_config={
        "Value": st.column_config.NumberColumn(format="$%d"),
        "Probability": st.column_config.ProgressColumn(
            format="%d%%", min_value=0, max_value=100
        ),
    },
)
