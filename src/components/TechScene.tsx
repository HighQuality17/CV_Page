import { useEffect, useRef } from "react";

const modules = [
  { label: "Cloud", className: "module-cloud" },
  { label: "POS", className: "module-pos" },
  { label: "Network", className: "module-network" },
  { label: "Automation", className: "module-automation" },
  { label: "Data", className: "module-data" }
];

const layers = [
  { title: "Business Value", items: ["Process", "Users"] },
  { title: "Systems Integration", items: ["POS", "APIs"] },
  { title: "Hybrid Infrastructure", items: ["Cloud", "Network"] }
];

const indicators = ["Cloud", "POS", "Network", "Automation", "Data"];

export default function TechScene() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;

    if (!visual) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = visual.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

      visual.style.setProperty("--tilt-x", `${(-y * 2.8).toFixed(2)}deg`);
      visual.style.setProperty("--tilt-y", `${(x * 3.8).toFixed(2)}deg`);
      visual.style.setProperty("--shift-x", `${(x * 9).toFixed(2)}px`);
      visual.style.setProperty("--shift-y", `${(y * 7).toFixed(2)}px`);
    };

    const handlePointerLeave = () => {
      visual.style.setProperty("--tilt-x", "0deg");
      visual.style.setProperty("--tilt-y", "0deg");
      visual.style.setProperty("--shift-x", "0px");
      visual.style.setProperty("--shift-y", "0px");
    };

    visual.addEventListener("pointermove", handlePointerMove);
    visual.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      visual.removeEventListener("pointermove", handlePointerMove);
      visual.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={visualRef}
      className="enterprise-core-visual"
      aria-label="Enterprise Digital Core: arquitectura digital con cloud, redes, automatización, sistemas y datos conectados"
      role="img"
    >
      <div className="core-depth-layer core-depth-layer--back" />
      <div className="core-depth-layer core-depth-layer--front" />
      <div className="architecture-plane architecture-plane--upper" />
      <div className="architecture-plane architecture-plane--lower" />

      <svg className="core-connections" viewBox="0 0 720 620" aria-hidden="true">
        <defs>
          <linearGradient id="connectionCyan" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
            <stop offset="48%" stopColor="rgba(56, 189, 248, 0.58)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
          <linearGradient id="connectionViolet" x1="0%" x2="100%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.46)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
        </defs>
        <path className="connection-spine" d="M360 112 V512" />
        <path className="connection-line connection-line--a" d="M136 116 C224 126 292 184 334 250" />
        <path className="connection-line connection-line--b" d="M584 116 C496 126 428 184 386 250" />
        <path className="connection-line connection-line--c" d="M108 316 C218 306 282 302 326 304" />
        <path className="connection-line connection-line--d" d="M612 316 C502 306 438 302 394 304" />
        <path className="connection-line connection-line--e" d="M184 506 C252 458 298 426 336 386" />
        <path className="connection-line connection-line--f" d="M536 506 C468 458 422 426 384 386" />
        <path className="connection-arc" d="M140 226 C252 162 468 162 580 226" />
        <path className="connection-arc connection-arc--low" d="M124 416 C262 492 458 492 596 416" />
        <circle className="connection-node-svg" cx="360" cy="252" r="3.3" />
        <circle className="connection-node-svg" cx="360" cy="304" r="3.3" />
        <circle className="connection-node-svg" cx="360" cy="386" r="3.3" />
        <circle className="connection-node-svg connection-node-svg--muted" cx="180" cy="512" r="2.8" />
        <circle className="connection-node-svg connection-node-svg--muted" cx="540" cy="512" r="2.8" />
      </svg>

      <div className="enterprise-core-shell">
        <div className="enterprise-core-card">
          <div className="core-card-header">
            <span className="core-status-dot" />
            <span>Hybrid Command Surface</span>
          </div>

          <div className="core-card-body">
            <span className="core-axis core-axis--left" aria-hidden="true" />
            <span className="core-axis core-axis--right" aria-hidden="true" />
            <div className="architecture-stack">
              {layers.map((layer) => (
                <section className="architecture-layer" key={layer.title}>
                  <div className="layer-header">
                    <span></span>
                    <h3>{layer.title}</h3>
                  </div>
                  <div className="layer-items">
                    {layer.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="core-card-footer">
            <span>Cloud</span>
            <span>POS</span>
            <span>Data</span>
          </div>
        </div>
      </div>

      {modules.map((module) => (
        <article className={`floating-module ${module.className}`} key={module.label}>
          <span className="module-node" />
          <div>
            <h3>{module.label}</h3>
            <div className="module-signal" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </article>
      ))}

      <div className="system-panel system-panel--left">
        <p>operational signal</p>
        <div className="panel-chart">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="system-panel system-panel--right">
        <p>integration flow</p>
        <div className="panel-flow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="operations-deck">
        <div className="deck-column">
          <span className="deck-kicker">Operations Layer</span>
          <strong>Business + Systems + Infrastructure</strong>
        </div>
        <div className="deck-rail" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="indicator-strip" aria-hidden="true">
        {indicators.map((indicator) => (
          <span key={indicator}>{indicator}</span>
        ))}
      </div>
    </div>
  );
}
