import { useEffect, useRef } from "react";

const modules = [
  { label: "Cloud", detail: "AWS services", className: "module-cloud" },
  { label: "POS", detail: "Business system", className: "module-pos" },
  { label: "Network", detail: "Hybrid topology", className: "module-network" },
  { label: "Automation", detail: "Operational flows", className: "module-automation" },
  { label: "Data", detail: "Structured insight", className: "module-data" }
];

const layers = [
  { title: "Business Layer", items: ["Process", "Value", "Users"] },
  { title: "Systems Layer", items: ["POS", "APIs", "Data"] },
  { title: "Infrastructure Layer", items: ["Cloud", "Network", "Linux"] }
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
      <div className="architecture-plane architecture-plane--lower" />

      <svg className="core-connections" viewBox="0 0 720 620" aria-hidden="true">
        <defs>
          <linearGradient id="connectionCyan" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
            <stop offset="48%" stopColor="rgba(56, 189, 248, 0.52)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
          <linearGradient id="connectionViolet" x1="0%" x2="100%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.42)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
        </defs>
        <path className="connection-line connection-line--a" d="M138 128 C236 154 286 218 344 280" />
        <path className="connection-line connection-line--b" d="M582 128 C484 154 430 218 376 280" />
        <path className="connection-line connection-line--c" d="M118 296 C214 296 278 300 326 306" />
        <path className="connection-line connection-line--d" d="M604 300 C506 300 440 302 390 308" />
        <path className="connection-line connection-line--e" d="M352 406 C286 440 238 472 190 508" />
        <path className="connection-line connection-line--f" d="M368 406 C452 438 506 474 558 512" />
        <path className="connection-arc" d="M140 236 C250 146 470 146 580 236" />
        <path className="connection-arc connection-arc--low" d="M124 392 C254 502 468 502 596 392" />
        <circle className="connection-node-svg" cx="344" cy="280" r="3.5" />
        <circle className="connection-node-svg" cx="376" cy="280" r="3.5" />
        <circle className="connection-node-svg" cx="352" cy="406" r="3.5" />
        <circle className="connection-node-svg" cx="368" cy="406" r="3.5" />
      </svg>

      <div className="enterprise-core-shell">
        <div className="enterprise-core-card">
          <div className="core-card-header">
            <span className="core-status-dot" />
            <span>Digital Operations Core</span>
          </div>

          <div className="core-card-body">
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
            <span>Network</span>
            <span>Data</span>
          </div>
        </div>
      </div>

      {modules.map((module) => (
        <article className={`floating-module ${module.className}`} key={module.label}>
          <span className="module-node" />
          <div>
            <h3>{module.label}</h3>
            <p>{module.detail}</p>
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
          <span className="deck-kicker">Architecture</span>
          <strong>Cloud + Network + Data</strong>
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
