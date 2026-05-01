import { useEffect, useRef } from "react";

const modules = [
  { label: "Cloud", detail: "AWS ready", className: "module-cloud" },
  { label: "Network", detail: "Hybrid infra", className: "module-network" },
  { label: "Automation", detail: "Python flows", className: "module-automation" },
  { label: "Systems", detail: "POS + data", className: "module-systems" }
];

const indicators = ["API", "VPC", "POS", "CI/CD", "SQL", "LAN"];

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

      visual.style.setProperty("--tilt-x", `${(-y * 3.6).toFixed(2)}deg`);
      visual.style.setProperty("--tilt-y", `${(x * 4.8).toFixed(2)}deg`);
      visual.style.setProperty("--shift-x", `${(x * 10).toFixed(2)}px`);
      visual.style.setProperty("--shift-y", `${(y * 8).toFixed(2)}px`);
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
      aria-label="Enterprise Digital Core: infraestructura digital, cloud, redes y automatización conectadas"
      role="img"
    >
      <div className="core-depth-layer core-depth-layer--back" />
      <div className="core-depth-layer core-depth-layer--front" />

      <svg className="core-connections" viewBox="0 0 720 560" aria-hidden="true">
        <defs>
          <linearGradient id="connectionCyan" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
            <stop offset="44%" stopColor="rgba(56, 189, 248, 0.62)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
          <linearGradient id="connectionViolet" x1="0%" x2="100%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
        </defs>
        <path className="connection-line connection-line--a" d="M154 144 C246 176 288 220 352 276" />
        <path className="connection-line connection-line--b" d="M555 136 C472 164 428 218 368 275" />
        <path className="connection-line connection-line--c" d="M140 414 C250 374 296 334 354 292" />
        <path className="connection-line connection-line--d" d="M560 416 C474 374 432 336 370 292" />
        <path className="connection-arc" d="M138 282 C238 190 478 190 582 282" />
        <path className="connection-arc connection-arc--low" d="M138 306 C250 402 468 402 582 306" />
      </svg>

      <div className="enterprise-core-shell">
        <div className="enterprise-core-card">
          <div className="core-card-header">
            <span className="core-status-dot" />
            <span>Enterprise Digital Core</span>
          </div>

          <div className="core-card-body">
            <div className="core-ring" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="core-metric">
              <strong>99%</strong>
              <span>connected flow</span>
            </div>
          </div>

          <div className="core-card-footer">
            <span>Cloud</span>
            <span>Network</span>
            <span>Automation</span>
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
        <div className="panel-bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="panel-chart">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="system-panel system-panel--right">
        <p>value stream</p>
        <div className="panel-flow">
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
