const FONT = "var(--font-display), system-ui, sans-serif";
const MONO = "var(--font-mono), ui-monospace, monospace";

/** Waypoints del pensamiento — curva suave, sin ángulos. */
const THINK = [
  { x: 90, y: 228 }, // nace bajo NECESIDAD
  { x: 210, y: 385 }, // Información dispersa
  { x: 470, y: 305 }, // Procesos manuales
  { x: 690, y: 470 }, // Seguimiento difícil
  { x: 360, y: 640 }, // Trabajo duplicado
] as const;

const FRAGS = [
  {
    chaos: "Información dispersa",
    axis: "CENTRALIZAR",
    detail: "Una sola fuente de verdad",
    num: "01",
    i: 1,
  },
  {
    chaos: "Procesos manuales",
    axis: "AUTOMATIZAR",
    detail: "Flujos que corren solos",
    num: "02",
    i: 2,
  },
  {
    chaos: "Seguimiento difícil",
    axis: "ENTENDER",
    detail: "Visibilidad continua",
    num: "03",
    i: 3,
  },
  {
    chaos: "Trabajo duplicado",
    axis: null,
    detail: null,
    num: null,
    i: 4,
  },
] as const;

/** Catmull-Rom → cubic Bezier continuo. */
function curveThrough(points: readonly { x: number; y: number }[]) {
  const p = points.map((pt) => ({ x: pt.x, y: pt.y }));
  if (p.length < 2) return "";
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p[i + 1];
    // /5 = más suave que /6 (menos tensión, menos “pico”)
    const cp1x = p1.x + (p2.x - p0.x) / 5;
    const cp1y = p1.y + (p2.y - p0.y) / 5;
    const cp2x = p2.x - (p3.x - p1.x) / 5;
    const cp2y = p2.y - (p3.y - p1.y) / 5;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const THINK_PATH = curveThrough(THINK);

/**
 * Un solo mundo SVG. Los mismos nodos mutan de caos → ejes → sistema → módulo.
 */
export function NarrativeWorld() {
  return (
    <svg
      className="nv-world pointer-events-none h-full w-full overflow-hidden"
      viewBox="0 0 900 900"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="nv-camera">
        {/* NECESIDAD */}
        <g className="nv-need">
          <text
            x="72"
            y="118"
            fill="rgba(81,60,250,0.95)"
            fontSize="11"
            fontFamily={MONO}
            letterSpacing="2.6"
          >
            NECESIDAD / 01
          </text>
          <text x="72" y="172" fill="rgba(255,255,255,0.92)" fontSize="28" fontFamily={FONT}>
            La operación creció.
          </text>
          <text x="72" y="208" fill="rgba(255,255,255,0.48)" fontSize="28" fontFamily={FONT}>
            Las herramientas no.
          </text>
        </g>

        {/* Anotaciones — lejos del trazado para no competir */}
        <g className="nv-annos">
          <text x="560" y="150" fill="rgba(255,255,255,0.22)" fontSize="11" fontFamily={MONO}>
            excel + wsp
          </text>
          <text x="760" y="360" fill="rgba(255,255,255,0.18)" fontSize="11" fontFamily={MONO}>
            sin dueño
          </text>
          <text x="80" y="560" fill="rgba(255,255,255,0.16)" fontSize="11" fontFamily={MONO}>
            ¿quién actualiza?
          </text>
        </g>

        {/* Una sola línea de pensamiento */}
        <path
          id="nv-line"
          className="nv-think"
          d={THINK_PATH}
          stroke="#513CFA"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle className="nv-pulse" r="4" fill="#513CFA" cx={THINK[0].x} cy={THINK[0].y} />

        {/* Fragmentos → criterios */}
        {FRAGS.map((f) => {
          const pt = THINK[f.i];
          return (
            <g key={f.chaos} className={`nv-frag nv-frag-${f.i - 1}`}>
              <circle className="nv-frag-dot" cx={pt.x} cy={pt.y} r="3.2" fill="#513CFA" fillOpacity="0.7" />
              <text
                className="nv-frag-chaos"
                x={pt.x}
                y={pt.y - 16}
                textAnchor="middle"
                fill="rgba(255,255,255,0.52)"
                fontSize="15"
                fontFamily={FONT}
              >
                {f.chaos}
              </text>
              {f.axis && f.num && f.detail ? (
                <g className="nv-frag-axis" opacity="0">
                  <text
                    x={pt.x}
                    y={pt.y - 52}
                    textAnchor="middle"
                    fill="rgba(81,60,250,0.9)"
                    fontSize="11"
                    fontFamily={MONO}
                    letterSpacing="2.2"
                  >
                    {f.num}
                  </text>
                  <text
                    x={pt.x}
                    y={pt.y - 18}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.95)"
                    fontSize="20"
                    fontFamily={FONT}
                    letterSpacing="1.6"
                  >
                    {f.axis}
                  </text>
                  <line
                    x1={pt.x - 56}
                    y1={pt.y + 4}
                    x2={pt.x + 56}
                    y2={pt.y + 4}
                    stroke="rgba(81,60,250,0.45)"
                    strokeWidth="0.9"
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 28}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.28)"
                    fontSize="12"
                    fontFamily={FONT}
                  >
                    {f.chaos}
                  </text>
                  <text
                    x={pt.x}
                    y={pt.y + 50}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.55)"
                    fontSize="13"
                    fontFamily={FONT}
                  >
                    {f.detail}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}

        {/* Estructura de criterios — spine + marco editorial */}
        <g className="nv-axis-stage" opacity="0">
          <text
            x="450"
            y="250"
            textAnchor="middle"
            fill="rgba(255,255,255,0.28)"
            fontSize="11"
            fontFamily={MONO}
            letterSpacing="2.8"
          >
            CRITERIOS
          </text>
          <line x1="140" y1="280" x2="760" y2="280" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
          <path
            className="nv-draw nv-axis-spine"
            d="M 160 420 C 280 390, 360 390, 450 420 S 620 450, 740 420"
            stroke="#513CFA"
            strokeWidth="1.35"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Sistema */}
        <g className="nv-sys nv-sys-clientes" opacity="0">
          <rect x="70" y="250" width="180" height="56" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" />
          <text
            x="160"
            y="285"
            textAnchor="middle"
            fill="rgba(255,255,255,0.85)"
            fontSize="15"
            fontFamily={FONT}
            letterSpacing="1.2"
          >
            CLIENTES
          </text>
        </g>

        <g className="nv-sys nv-sys-pedidos" opacity="0">
          <rect
            className="nv-hot-frame"
            x="350"
            y="250"
            width="200"
            height="56"
            stroke="rgba(81,60,250,0.85)"
            strokeWidth="1.15"
          />
          <text
            className="nv-hot-label"
            x="450"
            y="285"
            textAnchor="middle"
            fill="#fff"
            fontSize="15"
            fontFamily={FONT}
            letterSpacing="1.2"
          >
            PEDIDOS
          </text>
          <g className="nv-wire" opacity="0">
            <rect x="360" y="320" width="180" height="120" stroke="rgba(255,255,255,0.16)" strokeWidth="0.75" />
            <line x1="360" y1="348" x2="540" y2="348" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
            <text x="372" y="372" fill="rgba(81,60,250,0.9)" fontSize="10" fontFamily={MONO}>
              #1842
            </text>
            <text x="372" y="396" fill="rgba(255,255,255,0.55)" fontSize="13" fontFamily={FONT}>
              En curso
            </text>
            <line x1="372" y1="412" x2="500" y2="412" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            <line x1="372" y1="428" x2="480" y2="428" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </g>
        </g>

        <g className="nv-sys nv-sys-pagos" opacity="0">
          <rect x="650" y="250" width="180" height="56" stroke="rgba(255,255,255,0.2)" strokeWidth="0.9" />
          <text
            x="740"
            y="285"
            textAnchor="middle"
            fill="rgba(255,255,255,0.8)"
            fontSize="15"
            fontFamily={FONT}
            letterSpacing="1.2"
          >
            PAGOS
          </text>
        </g>

        <g className="nv-sys nv-sys-operacion" opacity="0">
          <rect x="300" y="430" width="300" height="56" stroke="rgba(255,255,255,0.2)" strokeWidth="0.9" />
          <text
            x="450"
            y="465"
            textAnchor="middle"
            fill="rgba(255,255,255,0.8)"
            fontSize="15"
            fontFamily={FONT}
            letterSpacing="1.2"
          >
            OPERACIÓN
          </text>
        </g>

        <g className="nv-sys nv-sys-reportes" opacity="0">
          <rect x="300" y="560" width="300" height="56" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9" />
          <text
            x="450"
            y="595"
            textAnchor="middle"
            fill="rgba(255,255,255,0.75)"
            fontSize="15"
            fontFamily={FONT}
            letterSpacing="1.2"
          >
            REPORTES
          </text>
        </g>

        <g className="nv-sys-links" opacity="0">
          <path
            className="nv-draw"
            d="M 250 278 C 290 278, 310 278, 350 278"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.75"
            fill="none"
          />
          <path
            className="nv-draw"
            d="M 550 278 C 590 278, 610 278, 650 278"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.75"
            fill="none"
          />
          <path
            className="nv-draw"
            d="M 450 306 C 450 350, 450 390, 450 430"
            stroke="rgba(81,60,250,0.5)"
            strokeWidth="0.9"
            fill="none"
          />
          <path
            className="nv-draw"
            d="M 450 486 C 450 520, 450 540, 450 560"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.75"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
