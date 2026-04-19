/* Dashboard page — composes top bar, nav, KPI row, chart, alerts, stream grid. */

const App = () => {
  // Sample data
  const kpis = [
    { label: "Active streams", value: "1,247", delta: "+12 · 1h", deltaDir: "up",
      spark: [40,42,41,45,48,50,52,51,55,58,62,66,68,72,75,78], sparkColor: "var(--primary)" },
    { label: "P95 latency", value: "184", unit: "ms", delta: "+23 ms", deltaDir: "dn",
      spark: [120,130,125,140,155,160,170,168,175,180,178,185,182,188,184,184], sparkColor: "var(--warning)" },
    { label: "Inference rate", value: "42.8k", unit: "fps", delta: "Stable", deltaDir: "up",
      spark: [42,42,43,42,43,42,43,43,42,43,43,42,43,43,42,43], sparkColor: "var(--success)" },
    { label: "Alerts · 24h", value: "187", delta: "−8%", deltaDir: "up",
      spark: [22,18,15,20,24,19,14,16,20,18,14,12,16,14,11,10], sparkColor: "var(--primary)" },
  ];

  // Build chart with 60 points
  const mkSeries = (base, amp, trend = 0) => Array.from({ length: 60 }, (_, i) =>
    base + trend * i + Math.sin(i * 0.4) * amp * 0.6 + (Math.random() - 0.5) * amp * 0.4
  );
  const chartSeries = [
    { label: "Healthy", color: "#4ade80", points: mkSeries(1180, 60, 0.6) },
    { label: "Degraded", color: "#fbbf24", points: mkSeries(48, 20, 0) },
    { label: "Offline", color: "#f87171", points: mkSeries(18, 8, -0.08) },
  ];

  const alerts = [
    { level: "critical", title: "Unauthorized entry detected", meta: "Warehouse NE-04 · ST-00421 · zone C", time: "14:31:52" },
    { level: "warning",  title: "Frame rate dropped below threshold", meta: "Lobby west · ST-00119 · 12 fps vs 24 target", time: "14:28:04" },
    { level: "warning",  title: "Inference queue backlog rising", meta: "pool us-east-1 · 1,240 pending", time: "14:22:31" },
    { level: "info",     title: "Model v2.4.1 deployed", meta: "Global · rollout 42% complete", time: "14:12:18" },
    { level: "info",     title: "New stream registered", meta: "Parking lot south · ST-01248", time: "14:08:02" },
  ];

  const streams = [
    { name: "Warehouse NE-04 · aisle cam", id: "ST-00421 · us-east-1", status: "live", fps: "24.0", ms: 32, time: "14:32:08",
      boxes: [
        { top: "36%", left: "22%", w: "18%", h: "38%", label: "person · 94%" },
        { top: "44%", left: "58%", w: "14%", h: "28%", label: "person · 88%" },
      ] },
    { name: "Main entrance · north", id: "ST-00088 · us-east-1", status: "live", fps: "24.0", ms: 28, time: "14:32:08",
      boxes: [
        { top: "48%", left: "38%", w: "16%", h: "36%", label: "person · 91%" },
      ] },
    { name: "Lobby west · entrance", id: "ST-00119 · us-east-1", status: "degraded", fps: "12.1", ms: 480, time: "14:32:07" },
    { name: "Loading dock · bay 3", id: "ST-00542 · us-east-1", status: "live", fps: "24.0", ms: 45, time: "14:32:08",
      boxes: [
        { top: "30%", left: "12%", w: "28%", h: "52%", label: "vehicle · 97%" },
      ] },
    { name: "Parking · south", id: "ST-01248 · us-east-1", status: "live", fps: "24.0", ms: 38, time: "14:32:08" },
    { name: "Server room A · rack 12", id: "ST-00873 · eu-west-1", status: "offline", fps: null, ms: null, time: "—" },
  ];

  return (
    <>
      <TopBar/>
      <div className="shell">
        <Nav active="dashboard"/>
        <main className="content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Operations dashboard</h1>
              <p className="page-sub">1,247 streams · updated 2 seconds ago · us-east-1, eu-west-1</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn secondary"><DsIcon name="download" size={14} stroke={2}/>Export</button>
              <button className="btn primary"><DsIcon name="plus" size={14} stroke={2.2}/>Add stream</button>
            </div>
          </div>

          <div className="kpis">
            {kpis.map((k, i) => <Kpi key={i} {...k}/>)}
          </div>

          <div className="dashboard-grid">
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Stream health · last 30 min</div>
                  <div className="card-sub">Stacked count by state · 1 s tick</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn ghost sm">30m</button>
                  <button className="btn secondary sm">6h</button>
                  <button className="btn ghost sm">24h</button>
                </div>
              </div>
              <div className="chart-area">
                <AreaChart series={chartSeries}/>
              </div>
              <div className="chart-legend">
                {chartSeries.map(s => (
                  <span key={s.label}><span className="sw" style={{ background: s.color }}></span>{s.label}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Active alerts</div>
                  <div className="card-sub">3 unacknowledged · 2 info</div>
                </div>
                <button className="btn ghost sm">View all</button>
              </div>
              {alerts.map((a, i) => <AlertRow key={i} {...a}/>)}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div>
                <h2 style={{ font: "600 18px/22px var(--font-sans)", letterSpacing: "-.01em", margin: 0 }}>Live streams</h2>
                <div style={{ font: "400 12px/16px var(--font-sans)", color: "var(--fg-3)", marginTop: 2 }}>Showing 6 of 1,247</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn ghost sm"><DsIcon name="filter" size={14} stroke={1.75}/>Filter</button>
                <button className="btn secondary sm">View all</button>
              </div>
            </div>
            <div className="stream-grid">
              {streams.map((s, i) => <StreamCard key={i} {...s}/>)}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
