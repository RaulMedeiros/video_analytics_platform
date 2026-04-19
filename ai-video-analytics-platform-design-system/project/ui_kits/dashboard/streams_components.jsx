/* Streams-page-specific components. Consumes DsIcon, Nav, TopBar from components.jsx. */

/* Additional icons not in base set */
const StreamsIconPaths = {
  sort:       <polyline points="8 7 12 3 16 7 16 17 12 21 8 17 8 7"/>,
  sortUp:     <><path d="M12 19V5"/><polyline points="5 12 12 5 19 12"/></>,
  sortDown:   <><path d="M12 5v14"/><polyline points="19 12 12 19 5 12"/></>,
  grid:       <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
  list:       <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  map:        <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
  chevLeft:   <polyline points="15 18 9 12 15 6"/>,
  chevRight:  <polyline points="9 18 15 12 9 6"/>,
  x:          <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  play:       <polygon points="5 3 19 12 5 21 5 3"/>,
  pause:      <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
  camera:     <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
  globe:      <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  folder:     <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></>,
  tag:        <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  trash:      <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  power:      <><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></>,
  copy:       <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  edit:       <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  expand:     <><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></>,
  link:       <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
  upload:     <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
  mapPin:     <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
};

const StIcon = ({ name, size = 14, stroke = 1.75 }) => {
  const base = { ...{ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" } };
  return <svg {...base}>{StreamsIconPaths[name] || null}</svg>;
};

/* Checkbox */
const Cb = ({ checked, indeterminate, onClick, stop = true }) => (
  <span
    className={"cb" + (checked ? " checked" : "") + (indeterminate ? " indeterminate" : "")}
    onClick={(e) => { if (stop) e.stopPropagation(); onClick && onClick(e); }}
    role="checkbox"
    aria-checked={indeterminate ? "mixed" : !!checked}
  >
    {checked && !indeterminate && (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    )}
  </span>
);

/* Summary pill — clickable filter counter */
const SummaryPill = ({ dot, label, value, sub, active, onClick }) => (
  <button className={"summary-pill" + (active ? " active" : "")} onClick={onClick}>
    <div className="sp-label">
      {dot && <span className="d" style={{ background: dot }}></span>}
      {label}
    </div>
    <div className="sp-value">{value}</div>
    {sub && <div className="sp-sub">{sub}</div>}
  </button>
);

/* Column definition + sort header cell */
const SortHead = ({ label, sortKey, sort, setSort, align = "left" }) => {
  const active = sort.key === sortKey;
  const dir = active ? sort.dir : null;
  return (
    <span
      className={"sort" + (active ? " active" : "")}
      style={{ justifyContent: align === "right" ? "flex-end" : "flex-start", width: "100%" }}
      onClick={() => setSort({ key: sortKey, dir: active && dir === "asc" ? "desc" : "asc" })}
    >
      {label}
      {active
        ? <StIcon name={dir === "asc" ? "sortUp" : "sortDown"} size={10} stroke={2}/>
        : <StIcon name="sort" size={10} stroke={1.5}/>}
    </span>
  );
};

/* Table header */
const StreamsTableHead = ({ allChecked, someChecked, onToggleAll, sort, setSort }) => (
  <div className="streams-table-head">
    <Cb checked={allChecked} indeterminate={!allChecked && someChecked} onClick={onToggleAll} stop={false}/>
    <span></span>{/* status dot col */}
    <SortHead label="Stream" sortKey="name" sort={sort} setSort={setSort}/>
    <SortHead label="FPS" sortKey="fps" sort={sort} setSort={setSort} align="right"/>
    <SortHead label="Latency" sortKey="latency" sort={sort} setSort={setSort} align="right"/>
    <SortHead label="Uptime" sortKey="uptime" sort={sort} setSort={setSort} align="right"/>
    <SortHead label="Model" sortKey="model" sort={sort} setSort={setSort}/>
    <SortHead label="Region" sortKey="region" sort={sort} setSort={setSort}/>
    <span></span>{/* actions col */}
  </div>
);

/* Table row */
const StreamsTableRow = ({ s, selected, onToggleSelect, onOpen, active }) => {
  const warnFps = s.status === "degraded";
  const errFps = s.status === "offline";
  const warnLat = s.latency != null && s.latency > 300;
  const errLat = s.status === "offline";
  return (
    <div className={"streams-table-row" + (active ? " selected" : "")} onClick={() => onOpen(s.id)}>
      <Cb checked={selected} onClick={() => onToggleSelect(s.id)}/>
      <span className={"row-dot " + s.status}></span>
      <span className="row-name">
        <span className="row-name-main">{s.name}</span>
        <span className="row-name-sub">{s.id} · {s.site}</span>
      </span>
      <span className={"num" + (warnFps ? " warn" : "") + (errFps ? " err" : "")} style={{ textAlign: "right" }}>
        {errFps ? "—" : s.fps.toFixed(1)}
      </span>
      <span className={"num" + (warnLat ? " warn" : "") + (errLat ? " err" : "")} style={{ textAlign: "right" }}>
        {errLat ? "—" : s.latency}<span className="u">ms</span>
      </span>
      <span className="num muted" style={{ textAlign: "right" }}>{s.uptime}<span className="u">%</span></span>
      <span className="row-model">{s.model}</span>
      <span className="row-region">{s.region}</span>
      <button className="iconbtn" style={{width: 24, height: 24}} onClick={(e) => e.stopPropagation()} title="More">
        <DsIcon name="more" size={14} stroke={2}/>
      </button>
    </div>
  );
};

/* ---------- DRAWER ---------- */

const DrawerPreview = ({ stream }) => {
  const offline = stream.status === "offline";
  return (
    <div className={"drawer-preview" + (offline ? " offline" : "")}>
      {!offline && stream.boxes && stream.boxes.map((b, i) => (
        <div key={i} className="overlay-box" style={{ top: b.top, left: b.left, width: b.w, height: b.h }} data-label={b.label}/>
      ))}
      <div className="dp-top">
        {stream.status === "live" && <div className="chip live"><div className="dot"></div>Live</div>}
        {stream.status === "degraded" && <div className="chip warn"><div className="dot"></div>Degraded</div>}
        {stream.status === "offline" && <div className="chip err"><div className="dot"></div>Offline</div>}
        <button className="iconbtn" style={{ width: 28, height: 28, color: "#fff", background: "rgba(0,0,0,0.4)" }} title="Expand">
          <StIcon name="expand" size={14} stroke={1.75}/>
        </button>
      </div>
      {!offline && (
        <div className="dp-bottom">
          <span>{stream.name}</span>
          <span>{stream.fps.toFixed(1)} fps · {stream.resolution}</span>
        </div>
      )}
      {offline && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, color: "var(--fg-3)" }}>
          <StIcon name="power" size={32} stroke={1.25}/>
          <div style={{ fontSize: 12 }}>Stream offline · last seen 2h 14m ago</div>
        </div>
      )}
    </div>
  );
};

const DrawerEmpty = ({ totalSelected, onAdd }) => (
  <div className="drawer-empty">
    {totalSelected > 0 ? (
      <>
        <div className="glyph">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M6 4v16M18 4v16M2 12h20M2 8h4M2 16h4M18 8h4M18 16h4"/>
          </svg>
        </div>
        <div className="title">{totalSelected} streams selected</div>
        <div className="sub">Use the bulk actions bar to assign models, change region, pause or archive selected streams.</div>
      </>
    ) : (
      <>
        <div className="glyph">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </div>
        <div className="title">Select a stream to inspect</div>
        <div className="sub">Click any row to view live preview, health metrics, configuration and recent events — or add a new stream below.</div>
        <div className="add-methods">
          <button className="add-method" onClick={onAdd}>
            <div className="icon"><StIcon name="camera" size={18} stroke={1.75}/></div>
            <div>
              <div className="name">Connect camera (RTSP / WebRTC)</div>
              <div className="desc">Single stream · paste URL and credentials</div>
            </div>
            <div className="chev"><StIcon name="chevRight" size={14} stroke={2}/></div>
          </button>
          <button className="add-method">
            <div className="icon"><StIcon name="upload" size={18} stroke={1.75}/></div>
            <div>
              <div className="name">Bulk import</div>
              <div className="desc">CSV · up to 500 streams at once</div>
            </div>
            <div className="chev"><StIcon name="chevRight" size={14} stroke={2}/></div>
          </button>
          <button className="add-method">
            <div className="icon"><StIcon name="link" size={18} stroke={1.75}/></div>
            <div>
              <div className="name">Connect existing NVR</div>
              <div className="desc">Hikvision · Axis · Milestone · Genetec</div>
            </div>
            <div className="chev"><StIcon name="chevRight" size={14} stroke={2}/></div>
          </button>
        </div>
      </>
    )}
  </div>
);

const MiniMetric = ({ label, value, unit, tone }) => (
  <div className={"mini-metric" + (tone ? " " + tone : "")}>
    <div className="l">{label}</div>
    <div className="v">{value}{unit && <span className="u">{unit}</span>}</div>
  </div>
);

const Drawer = ({ stream, totalSelected, onClose }) => {
  const [tab, setTab] = React.useState("overview");
  if (!stream) return <aside className="drawer"><DrawerEmpty totalSelected={totalSelected}/></aside>;

  const events = [
    { level: "warning", text: "Frame rate dropped to 12 fps (target 24)", time: "14:28:04" },
    { level: "info", text: "Model aperture-people-v2.4.1 loaded", time: "14:12:18" },
    { level: "ok", text: "Stream recovered · reconnect successful", time: "13:52:41" },
    { level: "critical", text: "Connection lost · RTSP timeout", time: "13:51:06" },
    { level: "info", text: "Configuration updated · ROI mask changed", time: "12:04:32" },
  ];

  return (
    <aside className="drawer">
      <div className="drawer-header">
        <div className="drawer-title-row">
          <div style={{ minWidth: 0 }}>
            <h2 className="drawer-title">{stream.name}</h2>
            <div className="drawer-id">{stream.id} · {stream.site}</div>
          </div>
          <button className="drawer-close" onClick={onClose} title="Close"><StIcon name="x" size={14} stroke={2}/></button>
        </div>
        <div className="drawer-actions">
          <button className="btn secondary sm"><StIcon name="edit" size={12} stroke={2}/>Configure</button>
          <button className="btn ghost sm"><StIcon name="pause" size={12} stroke={2}/>Pause</button>
          <button className="btn ghost sm"><StIcon name="expand" size={12} stroke={2}/>Fullscreen</button>
          <button className="btn ghost sm" style={{marginLeft: "auto"}}><DsIcon name="more" size={14} stroke={2}/></button>
        </div>
      </div>

      <DrawerPreview stream={stream}/>

      <div className="drawer-tabs">
        {["overview", "health", "events", "config"].map(t => (
          <div key={t} className={"drawer-tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </div>
        ))}
      </div>

      <div className="drawer-body">
        {tab === "overview" && (
          <>
            <div className="drawer-section">
              <div className="drawer-section-title">Live metrics</div>
              <div className="mini-metrics">
                <MiniMetric label="FPS" value={stream.status === "offline" ? "—" : stream.fps.toFixed(1)} tone={stream.status === "degraded" ? "warn" : stream.status === "live" ? "ok" : undefined}/>
                <MiniMetric label="Latency" value={stream.status === "offline" ? "—" : stream.latency} unit="ms" tone={stream.latency > 300 ? "warn" : undefined}/>
                <MiniMetric label="Uptime" value={stream.uptime} unit="%"/>
                <MiniMetric label="Bitrate" value={stream.status === "offline" ? "—" : stream.bitrate} unit="Mbps"/>
              </div>
            </div>
            <div className="drawer-section">
              <div className="drawer-section-title">Details</div>
              <dl className="kv-grid">
                <dt>Stream ID</dt><dd>{stream.id}</dd>
                <dt>Region</dt><dd className="sans">{stream.region}</dd>
                <dt>Site</dt><dd className="sans">{stream.site}</dd>
                <dt>Model</dt><dd>{stream.model}</dd>
                <dt>Protocol</dt><dd>{stream.protocol}</dd>
                <dt>Source URL</dt><dd>{stream.source}</dd>
                <dt>Resolution</dt><dd>{stream.resolution}</dd>
                <dt>Added</dt><dd className="sans">{stream.added}</dd>
              </dl>
            </div>
          </>
        )}
        {tab === "health" && (
          <div className="drawer-section">
            <div className="drawer-section-title">Last 60 min</div>
            <div style={{ background: "var(--surface-2)", borderRadius: 6, padding: 12, border: "1px solid var(--border-1)" }}>
              <div style={{ font: "400 12px/16px var(--font-sans)", color: "var(--fg-3)", marginBottom: 8 }}>Frame rate (target 24)</div>
              <svg viewBox="0 0 320 60" style={{width: "100%", height: 60, display: "block"}}>
                <line x1="0" y1="20" x2="320" y2="20" stroke="var(--border-1)" strokeDasharray="2 4"/>
                <path d="M0,22 L20,20 L40,21 L60,22 L80,20 L100,23 L120,22 L140,20 L160,21 L180,38 L200,42 L220,40 L240,38 L260,22 L280,21 L300,22 L320,20"
                  fill="none" stroke="var(--warning)" strokeWidth="1.5"/>
              </svg>
              <div style={{ font: "400 12px/16px var(--font-sans)", color: "var(--fg-3)", margin: "14px 0 8px" }}>Latency (ms)</div>
              <svg viewBox="0 0 320 60" style={{width: "100%", height: 60, display: "block"}}>
                <line x1="0" y1="40" x2="320" y2="40" stroke="var(--border-1)" strokeDasharray="2 4"/>
                <path d="M0,42 L20,40 L40,38 L60,40 L80,38 L100,36 L120,38 L140,35 L160,38 L180,22 L200,18 L220,20 L240,22 L260,36 L280,38 L300,40 L320,38"
                  fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        )}
        {tab === "events" && (
          <div className="drawer-section">
            <div className="drawer-section-title">Recent events</div>
            <div className="timeline">
              {events.map((e, i) => (
                <div key={i} className="timeline-row">
                  <span className={"d " + e.level}></span>
                  <span className="text">{e.text}</span>
                  <span className="meta">{e.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "config" && (
          <div className="drawer-section">
            <div className="drawer-section-title">Pipeline configuration</div>
            <div>
              <div className="cfg-row"><span className="k">Inference model</span><span className="v">{stream.model}</span></div>
              <div className="cfg-row"><span className="k">Target FPS</span><span className="v">24</span></div>
              <div className="cfg-row"><span className="k">Detection threshold</span><span className="v">0.70</span></div>
              <div className="cfg-row"><span className="k">ROI mask</span><span className="v">2 zones · 4 vertices</span></div>
              <div className="cfg-row"><span className="k">Alert sensitivity</span><span className="v">Normal</span></div>
              <div className="cfg-row"><span className="k">Retention</span><span className="v">30 days</span></div>
              <div className="cfg-row"><span className="k">Recording</span><span className="v">On motion</span></div>
              <div className="cfg-row"><span className="k">Webhook</span><span className="v">ops-alerts.internal</span></div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

Object.assign(window, { StIcon, Cb, SummaryPill, StreamsTableHead, StreamsTableRow, Drawer });
