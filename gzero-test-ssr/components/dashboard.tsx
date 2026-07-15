"use client";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CircleDollarSign,
  Search,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type HeaderContext,
  type SortingState,
} from "@tanstack/react-table";
import {
  dashboardQueryKey,
  getDashboardData,
  type Deal,
  type DealHealth,
  type DealStage,
} from "@/lib/dashboard-data";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

const columnHelper = createColumnHelper<Deal>();

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatCompactCurrency(value: number) {
  return compactCurrencyFormatter.format(value);
}

function SortGlyph({ state }: { state: false | "asc" | "desc" }) {
  if (state === "asc") {
    return <ArrowUp aria-hidden="true" size={14} strokeWidth={2.2} />;
  }

  if (state === "desc") {
    return <ArrowDown aria-hidden="true" size={14} strokeWidth={2.2} />;
  }

  return <ArrowUpDown aria-hidden="true" size={14} strokeWidth={2.2} />;
}

function sortableHeader<TValue>(label: string) {
  return ({ column }: HeaderContext<Deal, TValue>) => (
    <button
      type="button"
      className="table-sort"
      onClick={column.getToggleSortingHandler()}
    >
      <span>{label}</span>
      <SortGlyph state={column.getIsSorted()} />
    </button>
  );
}

function StageBadge({ stage }: { stage: DealStage }) {
  return <span className={`badge stage-${stage.toLowerCase()}`}>{stage}</span>;
}

function HealthBadge({ health }: { health: DealHealth }) {
  const className = health.toLowerCase().replace(" ", "-");

  return <span className={`health ${className}`}>{health}</span>;
}

export function Dashboard() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "value", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: dashboardQueryKey,
    queryFn: getDashboardData,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("account", {
        header: sortableHeader("Account"),
        cell: (info) => (
          <div className="account-cell">
            <strong>{info.getValue()}</strong>
            <span>{info.row.original.region}</span>
          </div>
        ),
      }),
      columnHelper.accessor("owner", {
        header: sortableHeader("Owner"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("stage", {
        header: sortableHeader("Stage"),
        cell: (info) => <StageBadge stage={info.getValue()} />,
      }),
      columnHelper.accessor("value", {
        header: sortableHeader("Value"),
        cell: (info) => formatCurrency(info.getValue()),
      }),
      columnHelper.accessor("probability", {
        header: sortableHeader("Probability"),
        cell: (info) => `${info.getValue()}%`,
      }),
      columnHelper.accessor("closeDate", {
        header: sortableHeader("Close"),
        cell: (info) => dateFormatter.format(new Date(info.getValue())),
      }),
      columnHelper.accessor("health", {
        header: sortableHeader("Health"),
        cell: (info) => <HealthBadge health={info.getValue()} />,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: data?.deals ?? [],
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const peakRevenue = Math.max(...(data?.revenue.map((point) => point.target) ?? [1]));

  if (!data) {
    return (
      <main className="shell">
        <div className="loading-panel">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Revenue operations</p>
          <h1>SSR TanStack Dashboard</h1>
        </div>
        <div className="sync-state" aria-live="polite">
          <Activity aria-hidden="true" size={18} />
          <span>
            {isFetching ? "Refreshing" : "Updated"}{" "}
            {timeFormatter.format(new Date(data.updatedAt))} UTC
          </span>
        </div>
      </header>

      <section className="metric-grid" aria-label="Key metrics">
        <article className="metric">
          <CircleDollarSign aria-hidden="true" size={22} />
          <span>Revenue</span>
          <strong>{formatCompactCurrency(data.kpis.revenue)}</strong>
          <small>+12.4% quarter over quarter</small>
        </article>
        <article className="metric">
          <TrendingUp aria-hidden="true" size={22} />
          <span>Pipeline</span>
          <strong>{formatCompactCurrency(data.kpis.pipeline)}</strong>
          <small>3.1x coverage this quarter</small>
        </article>
        <article className="metric">
          <Users aria-hidden="true" size={22} />
          <span>Win rate</span>
          <strong>{data.kpis.winRate}%</strong>
          <small>+4.6 points from last month</small>
        </article>
        <article className="metric">
          <ShieldAlert aria-hidden="true" size={22} />
          <span>Churn risk</span>
          <strong>{data.kpis.churnRisk}%</strong>
          <small>2 enterprise accounts flagged</small>
        </article>
      </section>

      <section className="dashboard-grid">
        <div className="panel revenue-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Performance</p>
              <h2>Revenue vs target</h2>
            </div>
            <div className="legend">
              <span><i className="legend-actual" /> Actual</span>
              <span><i className="legend-target" /> Target</span>
            </div>
          </div>

          <div className="bar-chart" aria-label="Monthly revenue chart">
            {data.revenue.map((point) => (
              <div className="bar-group" key={point.month}>
                <div className="bar-track">
                  <span
                    className="bar target"
                    style={{
                      height: `${Math.max((point.target / peakRevenue) * 100, 8)}%`,
                    }}
                  />
                  <span
                    className="bar actual"
                    style={{
                      height: `${Math.max((point.revenue / peakRevenue) * 100, 8)}%`,
                    }}
                  />
                </div>
                <span className="bar-label">{point.month}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Signals</p>
              <h2>Operating pulse</h2>
            </div>
          </div>
          <div className="activity-list">
            {data.activities.map((item) => (
              <div className="activity-item" key={item.id}>
                <span className={`trend-dot trend-${item.trend}`} />
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="panel table-panel">
        <div className="panel-heading table-heading">
          <div>
            <p className="eyebrow">Pipeline</p>
            <h2>Active opportunities</h2>
          </div>
          <label className="search-box">
            <Search aria-hidden="true" size={16} />
            <input
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder="Search deals"
              type="search"
            />
          </label>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
