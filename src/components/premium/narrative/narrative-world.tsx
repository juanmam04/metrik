const FONT = "var(--font-display), system-ui, sans-serif";
const MONO = "var(--font-mono), ui-monospace, monospace";

/** Waypoints del pensamiento — curva suave, sin ángulos. */
const THINK = [
  { x: 110, y: 268 }, // nace bajo NECESIDAD
  { x: 230, y: 400 }, // Información dispersa
  { x: 470, y: 310 }, // Procesos manuales
  { x: 700, y: 470 }, // Seguimiento difícil
  { x: 380, y: 650 }, // Trabajo duplicado
] as const;

const FRAGS = [
  {
    chaos: "Información dispersa",
    axis: "CENTRALIZAR",
    detail: "Una sola fuente de verdad",
    num: "01",
    i: 1,
    tag: "A",
    side: "left" as const,
  },
  {
    chaos: "Procesos manuales",
    axis: "AUTOMATIZAR",
    detail: "Flujos que corren solos",
    num: "02",
    i: 2,
    tag: "B",
    side: "right" as const,
  },
  {
    chaos: "Seguimiento difícil",
    axis: "ENTENDER",
    detail: "Visibilidad continua",
    num: "03",
    i: 3,
    tag: "C",
    side: "right" as const,
  },
  {
    chaos: "Trabajo duplicado",
    axis: null,
    detail: null,
    num: null,
    i: 4,
    tag: "D",
    side: "left" as const,
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
      className="nv-world pointer-events-none h-full w-full"
      viewBox="40 40 820 780"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="nv-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="nv-think-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B5CFF" />
          <stop offset="55%" stopColor="#513CFA" />
          <stop offset="100%" stopColor="#3D2CC7" />
        </linearGradient>
      </defs>

      <g className="nv-camera">
        {/* Atmósfera suave — llena el vacío sin competir */}
        <g className="nv-atmosphere" opacity="0.9">
          <circle cx="420" cy="420" r="280" fill="rgba(81,60,250,0.035)" />
          <circle cx="620" cy="320" r="160" fill="rgba(81,60,250,0.02)" />
        </g>

        {/* NECESIDAD — portada con tensión editorial */}
        <g className="nv-need">
          <line x1="88" y1="96" x2="88" y2="248" stroke="rgba(81,60,250,0.55)" strokeWidth="1" />
          <text
            x="108"
            y="116"
            fill="rgba(81,60,250,0.95)"
            fontSize="11"
            fontFamily={MONO}
            letterSpacing="2.6"
          >
            NECESIDAD / 01
          </text>
          <text x="108" y="172" fill="rgba(255,255,255,0.96)" fontSize="32" fontFamily={FONT}>
            La operación creció.
          </text>
          <text x="108" y="210" fill="rgba(255,255,255,0.4)" fontSize="32" fontFamily={FONT}>
            Las herramientas no.
          </text>
          <text x="108" y="250" fill="rgba(255,255,255,0.32)" fontSize="14" fontFamily={FONT}>
            Cuatro síntomas. Todavía sin sistema.
          </text>
        </g>

        {/* Notas de campo — evidencia pegada al trazo */}
        <g className="nv-annos">
          <g opacity="0.7">
            <path
              d="M 286 168 L 286 180 L 298 180"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="0.8"
            />
            <text x="304" y="183" fill="rgba(255,255,255,0.38)" fontSize="11" fontFamily={MONO}>
              [excel + wsp]
            </text>
          </g>
          <g opacity="0.62">
            <path
              d="M 760 318 L 760 330 L 772 330"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="0.8"
            />
            <text x="778" y="333" fill="rgba(255,255,255,0.32)" fontSize="11" fontFamily={MONO}>
              sin dueño
            </text>
          </g>
          <g opacity="0.55">
            <path
              d="M 88 520 L 88 532 L 100 532"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.8"
            />
            <text x="106" y="535" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily={MONO}>
              ¿quién actualiza?
            </text>
          </g>
          <g opacity="0.5">
            <text x="520" y="720" fill="rgba(255,255,255,0.26)" fontSize="11" fontFamily={MONO}>
              v3 / v7 / “la buena”
            </text>
          </g>
          <g opacity="0.45">
            <text x="760" y="620" fill="rgba(255,255,255,0.22)" fontSize="10" fontFamily={MONO}>
              hallazgo · offline
            </text>
          </g>
        </g>

        {/* Ramales incompletos — salen del criterio, no llegan */}
        <g className="nv-deadends" opacity="0.85">
          <path
            d={`M ${THINK[1].x} ${THINK[1].y} C 250 350, 290 330, 330 318`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2.5 5"
          />
          <path
            d={`M ${THINK[2].x} ${THINK[2].y} C 520 330, 560 370, 590 410`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2.5 5"
          />
          <path
            d={`M ${THINK[3].x} ${THINK[3].y} C 660 520, 600 560, 540 585`}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2.5 5"
          />
          <path
            d={`M ${THINK[1].x} ${THINK[1].y} C 180 450, 150 490, 130 520`}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="2 6"
          />
          <circle cx="330" cy="318" r="2" fill="rgba(255,255,255,0.28)" />
          <circle cx="590" cy="410" r="2" fill="rgba(255,255,255,0.22)" />
          <circle cx="540" cy="585" r="2" fill="rgba(255,255,255,0.2)" />
          <circle cx="130" cy="520" r="1.8" fill="rgba(255,255,255,0.18)" />
          <text x="338" y="314" fill="rgba(255,255,255,0.22)" fontSize="9" fontFamily={MONO}>
            ?
          </text>
          <text x="598" y="408" fill="rgba(255,255,255,0.18)" fontSize="9" fontFamily={MONO}>
            ?
          </text>
        </g>

        {/* Glow bajo el trazo */}
        <path
          className="nv-think-glow"
          d={THINK_PATH}
          stroke="rgba(81,60,250,0.45)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#nv-glow)"
          opacity="0"
        />

        {/* Una sola línea de pensamiento */}
        <path
          id="nv-line"
          className="nv-think"
          d={THINK_PATH}
          stroke="url(#nv-think-grad)"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle className="nv-pulse" r="4.8" fill="#513CFA" cx={THINK[0].x} cy={THINK[0].y} />
        <circle
          className="nv-pulse-ring"
          r="11"
          cx={THINK[0].x}
          cy={THINK[0].y}
          stroke="rgba(81,60,250,0.4)"
          strokeWidth="0.85"
          fill="none"
          opacity="0"
        />

        {/* Fragmentos → criterios */}
        {FRAGS.map((f, idx) => {
          const pt = THINK[f.i];
          const labelX = f.side === "left" ? pt.x - 14 : pt.x + 14;
          const anchor = f.side === "left" ? "end" : "start";
          const tagX = f.side === "left" ? pt.x - 14 : pt.x + 14;
          return (
            <g key={f.chaos} className={`nv-frag nv-frag-${idx}`}>
              <circle
                className="nv-frag-halo"
                cx={pt.x}
                cy={pt.y}
                r="13"
                stroke="rgba(81,60,250,0.28)"
                strokeWidth="0.75"
                fill="rgba(81,60,250,0.04)"
                opacity="0.2"
              />
              <circle
                className="nv-frag-dot"
                cx={pt.x}
                cy={pt.y}
                r="3.6"
                fill="#513CFA"
                fillOpacity="0.85"
              />
              <text
                className="nv-frag-tag"
                x={tagX}
                y={pt.y - 28}
                textAnchor={anchor}
                fill="rgba(81,60,250,0.7)"
                fontSize="10"
                fontFamily={MONO}
              >
                {f.tag}
              </text>
              <line
                className="nv-frag-tick"
                x1={pt.x}
                y1={pt.y - 6}
                x2={f.side === "left" ? pt.x - 10 : pt.x + 10}
                y2={pt.y - 18}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.7"
                opacity="0.4"
              />
              <text
                className="nv-frag-chaos"
                x={labelX}
                y={pt.y - 18}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.72)"
                fontSize="15.5"
                fontFamily={FONT}
                opacity="0.35"
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
          <line
            x1="140"
            y1="280"
            x2="760"
            y2="280"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.6"
          />
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
          <rect
            x="70"
            y="250"
            width="180"
            height="56"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.9"
          />
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
            <rect
              x="360"
              y="320"
              width="180"
              height="120"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="0.75"
            />
            <line
              x1="360"
              y1="348"
              x2="540"
              y2="348"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.6"
            />
            <text x="372" y="372" fill="rgba(81,60,250,0.9)" fontSize="10" fontFamily={MONO}>
              #1842
            </text>
            <text x="372" y="396" fill="rgba(255,255,255,0.55)" fontSize="13" fontFamily={FONT}>
              En curso
            </text>
            <line
              x1="372"
              y1="412"
              x2="500"
              y2="412"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />
            <line
              x1="372"
              y1="428"
              x2="480"
              y2="428"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
          </g>
        </g>

        <g className="nv-sys nv-sys-pagos" opacity="0">
          <rect
            x="650"
            y="250"
            width="180"
            height="56"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.9"
          />
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
          <rect
            x="300"
            y="430"
            width="300"
            height="56"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.9"
          />
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
          <rect
            x="300"
            y="560"
            width="300"
            height="56"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.9"
          />
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
