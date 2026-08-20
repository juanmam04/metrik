const VB = "0 0 1440 900";
const FONT = "var(--font-display), system-ui, sans-serif";

function Node({
  x,
  y,
  hot,
  className,
}: {
  x: number;
  y: number;
  hot?: boolean;
  className?: string;
}) {
  return (
    <g className={className}>
      <circle
        className={hot ? "mb-node-ring" : undefined}
        cx={x}
        cy={y}
        r="7"
        fill="none"
        stroke={hot ? "rgba(81,60,250,0)" : "rgba(255,255,255,0.14)"}
        strokeWidth="0.6"
      />
      <circle cx={x} cy={y} r="1.7" fill={hot ? "#513CFA" : "rgba(255,255,255,0.5)"} />
    </g>
  );
}

export function BuildPlaneGrid() {
  return (
    <svg className="pointer-events-none h-full w-full" viewBox={VB} fill="none" aria-hidden>
      <defs>
        <pattern id="mb-grid-lg" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" stroke="rgba(255,255,255,0.032)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect className="mb-grid" x="-240" y="-180" width="1920" height="1260" fill="url(#mb-grid-lg)" />
    </svg>
  );
}

/** Tres ofertas: Software, Web, Producto */
export function BuildPlaneStructure() {
  return (
    <svg className="pointer-events-none h-full w-full" viewBox={VB} fill="none" aria-hidden>
      <line x1="-40" y1="120" x2="1500" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

      <g className="mb-offer mb-offer-sw">
        <path d="M 520 200 H 760 V 700 H 520 Z" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" />
        <text x="540" y="186" fill="rgba(255,255,255,0.55)" fontSize="15" fontFamily={FONT} letterSpacing="-0.4">
          Software
        </text>
      </g>
      <g className="mb-offer mb-offer-web">
        <path d="M 784 200 H 1024 V 700 H 784 Z" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
        <text x="804" y="186" fill="rgba(255,255,255,0.55)" fontSize="15" fontFamily={FONT} letterSpacing="-0.4">
          Web
        </text>
      </g>
      <g className="mb-offer mb-offer-pr">
        <path d="M 1048 200 H 1288 V 700 H 1048 Z" stroke="rgba(81,60,250,0.45)" strokeWidth="0.9" />
        <text x="1068" y="186" fill="rgba(81,60,250,0.8)" fontSize="15" fontFamily={FONT} letterSpacing="-0.4">
          Producto
        </text>
      </g>
    </svg>
  );
}

export function BuildPlaneModules() {
  return (
    <svg className="pointer-events-none h-full w-full" viewBox={VB} fill="none" aria-hidden>
      {/* Software — lógica, módulos, flujo */}
      <g className="mb-sw-inn">
        <rect x="548" y="236" width="196" height="52" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" />
        <rect x="548" y="308" width="196" height="52" stroke="rgba(255,255,255,0.16)" strokeWidth="0.7" />
        <rect x="548" y="380" width="196" height="52" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
        <path className="mb-draw" d="M 646 288 V 308" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
        <path className="mb-draw" d="M 646 360 V 380" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
        <text x="560" y="266" fill="rgba(255,255,255,0.38)" fontSize="11" fontFamily={FONT}>
          Operación
        </text>
        <text x="560" y="338" fill="rgba(255,255,255,0.28)" fontSize="11" fontFamily={FONT}>
          Lógica
        </text>
        <text x="560" y="410" fill="rgba(255,255,255,0.22)" fontSize="11" fontFamily={FONT}>
          Sistema
        </text>
      </g>

      {/* Web — página editorial */}
      <g className="mb-web-inn">
        <line x1="812" y1="248" x2="996" y2="248" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" />
        <line x1="812" y1="268" x2="948" y2="268" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" />
        <rect x="812" y="292" width="184" height="110" stroke="rgba(255,255,255,0.16)" strokeWidth="0.7" />
        <line x1="812" y1="428" x2="996" y2="428" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        <line x1="812" y1="448" x2="940" y2="448" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        <text x="812" y="238" fill="rgba(255,255,255,0.32)" fontSize="10" fontFamily={FONT}>
          Sitio
        </text>
      </g>

      {/* Producto — interfaz que crece */}
      <g className="mb-pr-inn">
        <rect x="1072" y="236" width="192" height="36" stroke="rgba(81,60,250,0.35)" strokeWidth="0.7" />
        <rect className="mb-module" x="1072" y="288" width="88" height="72" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
        <rect x="1172" y="288" width="92" height="72" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" />
        <rect x="1072" y="376" width="192" height="120" stroke="rgba(255,255,255,0.16)" strokeWidth="0.7" />
        <path
          id="mb-curve"
          className="mb-to-curve"
          d="M 1090 460 C 1130 460, 1148 410, 1188 416 S 1238 400, 1248 404"
          stroke="rgba(81,60,250,0.55)"
          strokeWidth="1.05"
        />
        <text x="1084" y="258" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily={FONT}>
          Producto digital
        </text>
      </g>
    </svg>
  );
}

export function BuildPlaneLine() {
  return (
    <svg className="pointer-events-none h-full w-full overflow-visible" viewBox={VB} fill="none" aria-hidden>
      <path
        id="mb-line"
        className="mb-line"
        d="M -80 320 C 180 310, 400 300, 520 340 S 640 470, 640 470 S 900 470, 904 450 S 1160 330, 1168 330"
        stroke="#513CFA"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path className="mb-draw mb-cause-1" d="M 640 470 L 640 236" stroke="#513CFA" strokeWidth="0.75" />
      <path className="mb-draw mb-cause-2" d="M 904 450 L 904 248" stroke="rgba(81,60,250,0.75)" strokeWidth="0.75" />
      <path className="mb-draw mb-cause-3" d="M 1168 330 L 1168 236" stroke="rgba(81,60,250,0.9)" strokeWidth="0.85" />

      <Node x={640} y={470} hot className="mb-node-a" />
      <Node x={904} y={450} className="mb-node-b" />
      <Node x={1168} y={330} className="mb-node-c" />

      <circle className="mb-pulse" r="2.4" fill="#513CFA" />
    </svg>
  );
}
