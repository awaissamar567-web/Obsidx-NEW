// Illustrative mockup only: every figure below is sample data, not a real partner's results.
const kpis = [
  { label: "Revenue this month", value: "$48.2k", delta: "+18%" },
  { label: "Active members", value: "1,284", delta: "+96" },
  { label: "Checkout conversion", value: "4.7%", delta: "+0.6" },
] as const;

const products = [
  { name: "Signature course", status: "Live", tone: "live" },
  { name: "Paid community", status: "Live", tone: "live" },
  { name: "Template library", status: "Building", tone: "build" },
  { name: "Annual membership", status: "Research", tone: "research" },
] as const;

const actions = [
  { text: "Review March cohort feedback", done: true },
  { text: "Approve new pricing test", done: false },
  { text: "Record onboarding walkthrough", done: false },
] as const;

const chartLine = "M0 92 L40 84 L80 88 L120 70 L160 74 L200 56 L240 60 L280 42 L320 46 L360 26 L400 18";

export function PartnerDashboard() {
  return (
    <figure className="ox-dash" aria-label="Illustrative partner dashboard with sample data">
      <div className="ox-dash-window">
        <div className="ox-dash-bar">
          <span className="ox-dash-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>Obsidx · Partner dashboard</span>
          <span className="ox-dash-live"><span aria-hidden="true" />Live</span>
        </div>

        <div className="ox-dash-grid">
          <ul className="ox-dash-kpis">
            {kpis.map((kpi) => (
              <li key={kpi.label}>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <em>{kpi.delta}</em>
              </li>
            ))}
          </ul>

          <div className="ox-dash-chart">
            <div className="ox-dash-chart-head">
              <span>Monthly revenue</span>
              <span>Last 6 months</span>
            </div>
            <svg viewBox="0 0 400 110" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="ox-dash-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FCBA4B" stopOpacity="0.32" />
                  <stop offset="1" stopColor="#FCBA4B" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[28, 56, 84].map((y) => (
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.06)" />
              ))}
              <path d={`${chartLine} L400 110 L0 110 Z`} fill="url(#ox-dash-fill)" />
              <path className="ox-dash-line" d={chartLine} fill="none" stroke="#FCBA4B" strokeWidth="2.5" vectorEffect="non-scaling-stroke" pathLength={1} />
            </svg>
          </div>

          <div className="ox-dash-panel">
            <p className="ox-dash-panel-title">Products</p>
            <ul className="ox-dash-products">
              {products.map((product) => (
                <li key={product.name}>
                  <span>{product.name}</span>
                  <em className={`ox-pill ox-pill--${product.tone}`}>{product.status}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="ox-dash-panel">
            <p className="ox-dash-panel-title">Next actions</p>
            <ul className="ox-dash-actions">
              {actions.map((action) => (
                <li key={action.text} className={action.done ? "is-done" : undefined}>
                  <span aria-hidden="true" />
                  {action.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption>Illustrative view with sample data.</figcaption>
    </figure>
  );
}
