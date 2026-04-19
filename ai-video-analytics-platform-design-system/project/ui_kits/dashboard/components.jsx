/* Dashboard UI Kit — top bar, nav, KPI widget, chart, stream card, alert row.
   Global-scoped component functions, attached to window at bottom. */

/* ---------- Inline icons (Lucide-style) ---------- */
const dsIconProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };
const DsIcon = ({ name, size = 16, stroke = 1.75 }) => {
  const p = { ...dsIconProps, width: size, height: size, strokeWidth: stroke };
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></>,
    video:     <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
    activity:  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    bell:      <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    server:    <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    users:     <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    search:    <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    alert:     <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    info:      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    chevUp:    <polyline points="18 15 12 9 6 15"/>,
    chevDown:  <polyline points="6 9 12 15 18 9"/>,
    plus:      <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    filter:    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
    more:      <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
    refresh:   <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
    download:  <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
};

/* ---------- Top Bar ---------- */
const TopBar = ({ crumb = "Dashboard", section = "Operations", alertCount = 3 }) => (
  <div className="topbar">
    <div className="brand-cell">
      <svg className="brand-glyph" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.75"/>
        <circle cx="16" cy="16" r="5" fill="currentColor"/>
        <path d="M16 3 L21 10 L11 10 Z" fill="currentColor" opacity="0.9"/>
        <path d="M16 29 L11 22 L21 22 Z" fill="currentColor" opacity="0.9"/>
        <path d="M3 16 L10 11 L10 21 Z" fill="currentColor" opacity="0.9"/>
        <path d="M29 16 L22 21 L22 11 Z" fill="currentColor" opacity="0.9"/>
      </svg>
      <div className="brand-wordmark">
        <div className="brand-name">Aperture</div>
        <div className="brand-sub">Video analytics</div>
      </div>
    </div>
    <div className="crumbs">
      <span>{section}</span>
      <span className="sep">/</span>
      <span className="now">{crumb}</span>
    </div>
    <div className="topright">
      <button className="iconbtn" title="Refresh"><DsIcon name="refresh" size={16} stroke={1.5}/></button>
      <button className="iconbtn" title="Search"><DsIcon name="search" size={16} stroke={1.5}/></button>
      <button className="iconbtn" title="Alerts"><DsIcon name="bell" size={16} stroke={1.5}/>{alertCount > 0 && <span className="badge">{alertCount}</span>}</button>
      <button className="iconbtn" title="Settings"><DsIcon name="settings" size={16} stroke={1.5}/></button>
      <div className="user-chip">
        <div className="avatar">RM</div>
        <div className="user-name">R. Medeiros</div>
      </div>
    </div>
  </div>
);

/* ---------- Side Nav ---------- */
const Nav = ({ active = "dashboard" }) => {
  const items = [
    { group: "Operations", items: [
      { key: "dashboard", name: "Dashboard", icon: "dashboard", href: "index.html" },
      { key: "streams", name: "Streams", icon: "video", count: 1247, href: "streams.html" },
      { key: "alerts", name: "Alerts", icon: "alert", count: 3 },
      { key: "analytics", name: "Analytics", icon: "activity" },
    ]},
    { group: "Platform", items: [
      { key: "models", name: "Models", icon: "server" },
      { key: "users", name: "Users", icon: "users" },
      { key: "settings", name: "Settings", icon: "settings" },
    ]},
  ];
  return (
    <nav className="nav">
      {items.map((sec, i) => (
        <React.Fragment key={i}>
          <div className="nav-section">{sec.group}</div>
          {sec.items.map(it => (
            <a key={it.key} href={it.href || "#"} className={"nav-item" + (it.key === active ? " active" : "")} style={{textDecoration: "none"}}>
              <DsIcon name={it.icon} size={16} stroke={1.5}/>
              <span>{it.name}</span>
              {it.count != null && <span className="count">{it.count.toLocaleString()}</span>}
            </a>
          ))}
        </React.Fragment>
      ))}
    </nav>
  );
};

/* ---------- KPI widget ---------- */
const Sparkline = ({ points, color = "var(--primary)" }) => {
  const w = 200, h = 28;
  const max = Math.max(...points), min = Math.min(...points);
  const span = max - min || 1;
  const d = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 4) - 2;
    return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
  }).join(" ");
  return (
    <svg className="kpi-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const Kpi = ({ label, value, unit, delta, deltaDir, spark, sparkColor }) => (
  <div className="card kpi">
    <div className="kpi-eyebrow"><span>{label}</span></div>
    <div className="kpi-metric-row">
      <div className="kpi-metric">{value}{unit && <span className="kpi-unit">{unit}</span>}</div>
      {delta && (
        <div className={"kpi-delta " + (deltaDir === "up" ? "up" : "dn")}>
          <DsIcon name={deltaDir === "up" ? "chevUp" : "chevDown"} size={12} stroke={2.2}/>
          {delta}
        </div>
      )}
    </div>
    {spark && <Sparkline points={spark} color={sparkColor}/>}
  </div>
);

/* ---------- Area chart ---------- */
const AreaChart = ({ series }) => {
  const w = 720, h = 220, padL = 36, padR = 8, padT = 12, padB = 28;
  const pw = w - padL - padR, ph = h - padT - padB;
  const allPts = series.flatMap(s => s.points);
  const max = Math.max(...allPts), min = 0;
  const span = max - min || 1;
  const n = series[0].points.length;
  const x = i => padL + (i / (n - 1)) * pw;
  const y = v => padT + ph - ((v - min) / span) * ph;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(f => padT + ph - f * ph);
  const labels = ["14:00", "14:06", "14:12", "14:18", "14:24", "14:30"];

  return (
    <svg className="chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {gridLines.map((gy, i) => (
        <line key={i} className="chart-grid-line" x1={padL} y1={gy} x2={w - padR} y2={gy}/>
      ))}
      {/* y labels */}
      {[0, 0.5, 1].map((f, i) => {
        const v = Math.round(min + f * span);
        const gy = padT + ph - f * ph;
        return <text key={i} className="chart-axis-label" x={padL - 6} y={gy + 3} textAnchor="end">{v}</text>;
      })}
      {/* x labels */}
      {labels.map((l, i) => {
        const xx = padL + (i / (labels.length - 1)) * pw;
        return <text key={i} className="chart-axis-label" x={xx} y={h - 8} textAnchor="middle">{l}</text>;
      })}
      {series.map((s, si) => {
        const path = s.points.map((v, i) => (i === 0 ? "M" : "L") + x(i) + "," + y(v)).join(" ");
        const fill = path + ` L${x(n - 1)},${padT + ph} L${x(0)},${padT + ph} Z`;
        return (
          <g key={si}>
            <path d={fill} fill={s.color} opacity="0.15"/>
            <path d={path} fill="none" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        );
      })}
    </svg>
  );
};

/* ---------- Alert row ---------- */
const AlertRow = ({ level, title, meta, time }) => (
  <div className="alert">
    <div className={"alert-accent " + level}></div>
    <div className={"alert-icon " + level}>
      <DsIcon name={level === "info" ? "info" : level === "warning" ? "check" : "alert"} size={14} stroke={2}/>
    </div>
    <div>
      <div className="alert-title">{title}</div>
      <div className="alert-meta">{meta}</div>
    </div>
    <div className="alert-time">{time}</div>
  </div>
);

/* ---------- Stream card ---------- */
const StreamCard = ({ name, id, status, fps, ms, time, persons, boxes }) => {
  const degraded = status === "degraded";
  const offline = status === "offline";
  return (
    <div className="stream-card">
      <div className={"sc-frame" + (offline ? " offline" : "")}>
        {boxes && !offline && boxes.map((b, i) => (
          <div key={i} className="overlay-box" style={{ top: b.top, left: b.left, width: b.w, height: b.h }} data-label={b.label}/>
        ))}
        <div className="sc-top">
          {status === "live" && <div className="chip live"><div className="dot"></div>Live</div>}
          {degraded && <div className="chip warn"><div className="dot"></div>Degraded</div>}
          {offline && <div className="chip err"><div className="dot"></div>Offline</div>}
          <div className="sc-time">{time}</div>
        </div>
        <div className="sc-bottom">
          <div className="sc-label">{name}</div>
        </div>
      </div>
      <div className="sc-meta">
        <div>
          <div className="sc-name">{name}</div>
          <div className="sc-id">{id}</div>
        </div>
        <div className="sc-stats">
          {fps != null ? (
            <div>
              <div className="sc-stat-val" style={degraded ? {color: "var(--warning)"} : offline ? {color: "var(--fg-3)"} : null}>{offline ? "—" : fps}</div>
              <div className="sc-stat-lbl">fps</div>
            </div>
          ) : null}
          {ms != null ? (
            <div>
              <div className="sc-stat-val" style={degraded ? {color: "var(--warning)"} : offline ? {color: "var(--fg-3)"} : null}>{offline ? "—" : `${ms}ms`}</div>
              <div className="sc-stat-lbl">latency</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DsIcon, TopBar, Nav, Kpi, Sparkline, AreaChart, AlertRow, StreamCard });
