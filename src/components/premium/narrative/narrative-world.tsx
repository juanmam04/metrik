const FONT = "var(--font-display), system-ui, sans-serif";
const MONO = "var(--font-mono), ui-monospace, monospace";

/** Waypoints del pensamiento — el trazo pasa por cada uno. */
export const THINK = [
  { x: 200, y: 210 },
  { x: 300, y: 370 },
  { x: 520, y: 270 },
  { x: 700, y: 420 },
  { x: 440, y: 590 },
] as const;

/** Columnas de criterios — curva; mismo formato de nodo en los tres. */
export const AXIS_LAYOUT = [
  {
    x: 220,
    y: 460,
    num: "01",
    axis: "CENTRALIZAR",
    chaos: "Información dispersa",
    detail: "Una sola fuente de verdad",
  },
  {
    x: 450,
    y: 360,
    num: "02",
    axis: "AUTOMATIZAR",
    chaos: "Procesos manuales",
    detail: "Flujos que corren solos",
  },
  {
    x: 680,
    y: 470,
    num: "03",
    axis: "ENTENDER",
    chaos: "Seguimiento difícil",
    detail: "Visibilidad continua",
  },
] as const;

const FRAGS = [
  {
    chaos: "Información dispersa",
    evidence: "planillas · chats · mail",
    axis: "CENTRALIZAR",
    detail: "Una sola fuente de verdad",
    num: "01",
    i: 1,
    tag: "A",
    side: "left" as const,
  },
  {
    chaos: "Procesos manuales",
    evidence: "copiar · pegar · avisar",
    axis: "AUTOMATIZAR",
    detail: "Flujos que corren solos",
    num: "02",
    i: 2,
    tag: "B",
    side: "right" as const,
  },
  {
    chaos: "Seguimiento difícil",
    evidence: "nadie ve el estado",
    axis: "ENTENDER",
    detail: "Visibilidad continua",
    num: "03",
    i: 3,
    tag: "C",
    side: "left" as const, // label hacia adentro — evita corte en el borde derecho
  },
  {
    chaos: "Trabajo duplicado",
    evidence: "tres versiones vivas",
    axis: null,
    detail: null,
    num: "04",
    i: 4,
    tag: "D",
    side: "left" as const,
  },
] as const;

/** Catmull-Rom → cubic Bezier (pasa exactamente por cada waypoint). */
function curveThrough(points: readonly { x: number; y: number }[]) {
  const p = points.map((pt) => ({ x: pt.x, y: pt.y }));
  if (p.length < 2) return "";
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p[i + 1];
    // /6 = Catmull-Rom uniforme: el segmento termina exactamente en p2
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const THINK_PATH = curveThrough(THINK);

/** Curva cuadrática entre dos puertos (inicio y fin exactos). */
function linkCurve(
  a: { x: number; y: number },
  b: { x: number; y: number },
  bend: number
) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

/** Puertos de las cards del sistema — mismos bordes que los rects. */
const SYS_PORTS = {
  clientesOut: { x: 268, y: 360 },
  pedidosInL: { x: 340, y: 380 },
  pedidosInR: { x: 600, y: 380 },
  pedidosOutBL: { x: 400, y: 490 },
  pedidosOutBR: { x: 540, y: 490 },
  pagosIn: { x: 680, y: 360 },
  operacionIn: { x: 238, y: 560 },
  reportesIn: { x: 668, y: 560 },
} as const;
const AXIS_SPINE = curveThrough([
  { x: 130, y: 430 },
  { x: AXIS_LAYOUT[0].x, y: AXIS_LAYOUT[0].y },
  { x: AXIS_LAYOUT[1].x, y: AXIS_LAYOUT[1].y },
  { x: AXIS_LAYOUT[2].x, y: AXIS_LAYOUT[2].y },
  { x: 780, y: 440 },
]);

/**
 * Un solo mundo SVG. Los mismos nodos mutan de caos → ejes → sistema → módulo.
 * Sistema: arquitectura abierta (sin placa contenedora) — hub + satélites.
 */
export function NarrativeWorld({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className="nv-world pointer-events-none h-full w-full"
      viewBox={compact ? "60 60 780 720" : "100 70 740 640"}
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
        <radialGradient id="nv-orb-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(81,60,250,0.28)" />
          <stop offset="55%" stopColor="rgba(81,60,250,0.08)" />
          <stop offset="100%" stopColor="rgba(81,60,250,0)" />
        </radialGradient>
        <radialGradient id="nv-orb-b" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(107,92,255,0.2)" />
          <stop offset="60%" stopColor="rgba(81,60,250,0.05)" />
          <stop offset="100%" stopColor="rgba(81,60,250,0)" />
        </radialGradient>
        <radialGradient id="nv-orb-c" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(81,60,250,0.16)" />
          <stop offset="100%" stopColor="rgba(81,60,250,0)" />
        </radialGradient>
      </defs>

      <g className="nv-camera">
        {/* Burbujas violetas — atmósfera, sin pelear con el copy */}
        <g className="nv-atmosphere" opacity="0.5">
          <circle cx="560" cy="340" r="210" fill="url(#nv-orb-a)" />
          <circle cx="340" cy="480" r="160" fill="url(#nv-orb-b)" />
          <circle cx="700" cy="520" r="130" fill="url(#nv-orb-c)" />
          <circle cx="420" cy="220" r="90" fill="url(#nv-orb-c)" />
          <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.7">
            <line x1="160" y1="120" x2="176" y2="120" />
            <line x1="160" y1="120" x2="160" y2="136" />
            <line x1="800" y1="150" x2="784" y2="150" />
            <line x1="800" y1="150" x2="800" y2="166" />
          </g>
        </g>

        <g className="nv-need" opacity="0">
          <text
            x="108"
            y="128"
            fill="rgba(81,60,250,0.8)"
            fontSize="10"
            fontFamily={MONO}
            letterSpacing="2.4"
          >
            OBSERVAR
          </text>
        </g>

        {/* Evidencia de campo — legible, anclada al trazo */}
        <g className="nv-annos" opacity="0">
          <g>
            <path
              d="M 360 140 L 360 158 L 378 158"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.9"
            />
            <text x="386" y="162" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily={MONO}>
              excel + wsp
            </text>
          </g>
          <g>
            <path
              d="M 740 280 L 740 298 L 722 298"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.9"
            />
            <text x="716" y="302" textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="12" fontFamily={MONO}>
              sin dueño
            </text>
          </g>
          <g>
            <path
              d="M 620 560 L 620 578 L 638 578"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="0.9"
            />
            <text x="646" y="582" fill="rgba(255,255,255,0.42)" fontSize="12" fontFamily={MONO}>
              ¿quién actualiza?
            </text>
          </g>
          <text x="580" y="650" fill="rgba(255,255,255,0.36)" fontSize="12" fontFamily={MONO}>
            v3 / v7 / “la buena”
          </text>
        </g>

        <g className="nv-deadends" opacity="0">
          <path
            d={`M ${THINK[1].x} ${THINK[1].y} C 260 355, 300 335, 342 322`}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeDasharray="3 6"
          />
          <path
            d={`M ${THINK[2].x} ${THINK[2].y} C 530 340, 575 380, 610 430`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeDasharray="3 6"
          />
          <path
            d={`M ${THINK[3].x} ${THINK[3].y} C 660 530, 600 575, 545 600`}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeDasharray="3 6"
          />
          <circle cx="342" cy="322" r="2.4" fill="rgba(255,255,255,0.35)" />
          <circle cx="610" cy="430" r="2.4" fill="rgba(255,255,255,0.28)" />
          <circle cx="545" cy="600" r="2.4" fill="rgba(255,255,255,0.25)" />
        </g>

        <path
          className="nv-think-glow"
          d={THINK_PATH}
          stroke="rgba(81,60,250,0.55)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#nv-glow)"
          opacity="0"
        />

        <path
          id="nv-line"
          className="nv-think"
          d={THINK_PATH}
          stroke="url(#nv-think-grad)"
          strokeWidth="2.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="2400"
          strokeDashoffset="2400"
        />
        <circle
          className="nv-pulse"
          r="5.2"
          fill="#513CFA"
          cx={THINK[0].x}
          cy={THINK[0].y}
          opacity="0.55"
        />
        <circle
          className="nv-pulse-ring"
          r="13"
          cx={THINK[0].x}
          cy={THINK[0].y}
          stroke="rgba(81,60,250,0.45)"
          strokeWidth="1"
          fill="none"
          opacity="0"
        />

        {FRAGS.map((f, idx) => {
          const pt = THINK[f.i];
          const isLeft = f.side === "left";
          const labelX = isLeft ? pt.x - 18 : pt.x + 18;
          const anchor = isLeft ? "end" : "start";
          const tickX2 = isLeft ? pt.x - 14 : pt.x + 14;
          return (
            <g key={f.chaos} className={`nv-frag nv-frag-${idx}`}>
              <circle
                className="nv-frag-halo"
                cx={pt.x}
                cy={pt.y}
                r="16"
                stroke="rgba(81,60,250,0.35)"
                strokeWidth="0.85"
                fill="rgba(81,60,250,0.06)"
                opacity="0"
              />
              <circle
                className="nv-frag-dot"
                cx={pt.x}
                cy={pt.y}
                r="4.2"
                fill="#513CFA"
                fillOpacity="0"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="1.6"
                fill="#fff"
                fillOpacity="0.55"
                className="nv-frag-core"
                opacity="0"
              />
              <line
                className="nv-frag-tick"
                x1={pt.x}
                y1={pt.y}
                x2={tickX2}
                y2={pt.y - 22}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.85"
                opacity="0"
              />
              <text
                className="nv-frag-tag"
                x={labelX}
                y={pt.y - 42}
                textAnchor={anchor}
                fill="rgba(81,60,250,0.85)"
                fontSize="11"
                fontFamily={MONO}
                letterSpacing="1.6"
                opacity="0"
              >
                {f.num}
              </text>
              <text
                className="nv-frag-chaos"
                x={labelX}
                y={pt.y - 22}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.94)"
                fontSize="18"
                fontFamily={FONT}
                opacity="0"
              >
                {f.chaos}
              </text>
              <text
                className="nv-frag-evidence"
                x={labelX}
                y={pt.y - 4}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.38)"
                fontSize="12"
                fontFamily={MONO}
                opacity="0"
              >
                {f.evidence}
              </text>
              {f.axis && f.detail ? (
                <g className="nv-frag-axis" opacity="0">
                  <text
                    x={pt.x}
                    y={pt.y - 56}
                    textAnchor="middle"
                    fill="rgba(81,60,250,0.95)"
                    fontSize="11"
                    fontFamily={MONO}
                    letterSpacing="2.2"
                  >
                    {f.num}
                  </text>
                  <text
                    x={pt.x}
                    y={pt.y - 22}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.96)"
                    fontSize="20"
                    fontFamily={FONT}
                    letterSpacing="1.6"
                  >
                    {f.axis}
                  </text>
                  <line
                    x1={pt.x - 52}
                    y1={pt.y - 8}
                    x2={pt.x + 52}
                    y2={pt.y - 8}
                    stroke="rgba(81,60,250,0.5)"
                    strokeWidth="0.9"
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 36}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="12"
                    fontFamily={FONT}
                  >
                    {f.chaos}
                  </text>
                  <text
                    x={pt.x}
                    y={pt.y + 58}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
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

        <g className="nv-axis-stage" opacity="0">
          <text
            x="450"
            y="240"
            textAnchor="middle"
            fill="rgba(255,255,255,0.85)"
            fontSize="14"
            fontFamily={MONO}
            letterSpacing="3.6"
          >
            CRITERIOS
          </text>
          <line
            x1="180"
            y1="262"
            x2="720"
            y2="262"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.85"
          />
          <path
            className="nv-draw nv-axis-spine"
            d={AXIS_SPINE}
            stroke="#513CFA"
            strokeWidth="1.55"
            strokeLinecap="round"
            fill="none"
          />
          {AXIS_LAYOUT.map((a) => (
            <g key={a.num} className="nv-axis-node">
              <circle cx={a.x} cy={a.y} r="5" fill="#513CFA" />
              <circle cx={a.x} cy={a.y} r="1.8" fill="#fff" fillOpacity="0.7" />
              <text
                x={a.x}
                y={a.y - 56}
                textAnchor="middle"
                fill="rgba(81,60,250,0.95)"
                fontSize="11"
                fontFamily={MONO}
                letterSpacing="2.2"
              >
                {a.num}
              </text>
              <text
                x={a.x}
                y={a.y - 22}
                textAnchor="middle"
                fill="rgba(255,255,255,0.96)"
                fontSize="20"
                fontFamily={FONT}
                letterSpacing="1.6"
              >
                {a.axis}
              </text>
              <line
                x1={a.x - 52}
                y1={a.y - 8}
                x2={a.x + 52}
                y2={a.y - 8}
                stroke="rgba(81,60,250,0.5)"
                strokeWidth="0.9"
              />
              <text
                x={a.x}
                y={a.y + 36}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="12"
                fontFamily={FONT}
              >
                {a.chaos}
              </text>
              <text
                x={a.x}
                y={a.y + 58}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="13"
                fontFamily={FONT}
              >
                {a.detail}
              </text>
            </g>
          ))}
        </g>

        {/* Arquitectura abierta: tipografía libre + hub + satélites */}
        <g className="nv-sys-head" opacity="0">
          <text
            x="120"
            y="178"
            fill="rgba(81,60,250,0.95)"
            fontSize="11"
            fontFamily={MONO}
            letterSpacing="2.6"
          >
            SISTEMA / 03
          </text>
          <text x="120" y="214" fill="rgba(255,255,255,0.9)" fontSize="22" fontFamily={FONT}>
            La operación, armada.
          </text>
          <text x="120" y="240" fill="rgba(255,255,255,0.55)" fontSize="14" fontFamily={FONT}>
            Piezas que se hablan. Un solo criterio.
          </text>
        </g>

        {/*
          Enlaces enteros (sin stroke-dash): salen y llegan a los puertos.
        */}
        <g className="nv-sys-links" opacity="0">
          <path
            className="nv-link-side"
            d={linkCurve(SYS_PORTS.clientesOut, SYS_PORTS.pedidosInL, 28)}
            stroke="rgba(81,60,250,0.7)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="nv-link-side"
            d={linkCurve(SYS_PORTS.pedidosInR, SYS_PORTS.pagosIn, -28)}
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1.25"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="nv-link-bottom"
            d={linkCurve(SYS_PORTS.pedidosOutBL, SYS_PORTS.operacionIn, -36)}
            stroke="rgba(255,255,255,0.34)"
            strokeWidth="1.25"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="nv-link-bottom"
            d={linkCurve(SYS_PORTS.pedidosOutBR, SYS_PORTS.reportesIn, 36)}
            stroke="rgba(255,255,255,0.34)"
            strokeWidth="1.25"
            strokeLinecap="round"
            fill="none"
          />
          {Object.values(SYS_PORTS).map((p) => (
            <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="2.8" fill="#513CFA" fillOpacity="0.9" />
          ))}
        </g>

        <g className="nv-sys nv-sys-clientes" opacity="0">
          <rect
            x="100"
            y="300"
            width="168"
            height="120"
            rx="10"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="0.9"
          />
          <text x="118" y="328" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily={MONO}>
            01
          </text>
          <text x="118" y="352" fill="rgba(255,255,255,0.92)" fontSize="15" fontFamily={FONT}>
            Clientes
          </text>
          <line
            x1="118"
            y1="366"
            x2="248"
            y2="366"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.6"
          />
          <text x="118" y="388" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily={FONT}>
            Norte · SA
          </text>
          <text x="118" y="406" fill="rgba(255,255,255,0.28)" fontSize="11" fontFamily={FONT}>
            Rivadavia
          </text>
        </g>

        {/* Hub Pedidos — ya se lee como producto */}
        <g className="nv-sys nv-sys-pedidos" opacity="0">
          <rect
            className="nv-hot-frame"
            x="340"
            y="270"
            width="260"
            height="220"
            rx="12"
            fill="rgba(10,10,14,0.94)"
            stroke="rgba(81,60,250,0.8)"
            strokeWidth="1.4"
          />
          <rect
            className="nv-hot-chrome"
            x="340"
            y="270"
            width="260"
            height="44"
            rx="12"
            fill="rgba(81,60,250,0.14)"
          />
          <rect x="340" y="302" width="260" height="12" fill="rgba(81,60,250,0.14)" />
          <circle cx="358" cy="292" r="3.2" fill="#513CFA" />
          <text className="nv-hot-label" x="372" y="297" fill="#fff" fontSize="14" fontFamily={FONT}>
            Pedidos
          </text>
          <text
            className="nv-hot-meta"
            x="580"
            y="297"
            textAnchor="end"
            fill="rgba(81,60,250,0.8)"
            fontSize="10"
            fontFamily={MONO}
          >
            núcleo
          </text>

          <g className="nv-hot-preview">
            <text x="356" y="342" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily={MONO}>
              HOY
            </text>
            <rect
              x="356"
              y="354"
              width="228"
              height="44"
              rx="5"
              fill="rgba(81,60,250,0.1)"
              stroke="rgba(81,60,250,0.4)"
              strokeWidth="0.75"
            />
            <text x="368" y="374" fill="rgba(81,60,250,0.95)" fontSize="11" fontFamily={MONO}>
              #1842
            </text>
            <text x="368" y="390" fill="rgba(255,255,255,0.68)" fontSize="12" fontFamily={FONT}>
              En curso
            </text>
            <text
              x="568"
              y="382"
              textAnchor="end"
              fill="rgba(255,255,255,0.32)"
              fontSize="10"
              fontFamily={FONT}
            >
              vinculado
            </text>

            <rect
              x="356"
              y="408"
              width="228"
              height="36"
              rx="5"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="0.65"
            />
            <text x="368" y="430" fill="rgba(255,255,255,0.42)" fontSize="11" fontFamily={MONO}>
              #1839 · esperando pago
            </text>
          </g>

          <g className="nv-wire" opacity="0">
            <rect
              x="356"
              y="454"
              width="228"
              height="36"
              rx="5"
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.65"
            />
            <text x="368" y="476" fill="rgba(255,255,255,0.36)" fontSize="11" fontFamily={MONO}>
              #1831 · en entrega
            </text>
            <text x="356" y="514" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily={MONO}>
              cliente → pedido → pago → entrega
            </text>
            <line
              x1="356"
              y1="526"
              x2="540"
              y2="526"
              stroke="rgba(81,60,250,0.4)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </g>
        </g>

        <g className="nv-sys nv-sys-pagos" opacity="0">
          <rect
            x="680"
            y="300"
            width="160"
            height="120"
            rx="10"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="0.9"
          />
          <text x="698" y="328" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily={MONO}>
            03
          </text>
          <text x="698" y="352" fill="rgba(255,255,255,0.9)" fontSize="15" fontFamily={FONT}>
            Pagos
          </text>
          <line
            x1="698"
            y1="366"
            x2="820"
            y2="366"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.6"
          />
          <text x="698" y="388" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily={FONT}>
            2 pendientes
          </text>
          <text x="698" y="406" fill="rgba(81,60,250,0.55)" fontSize="11" fontFamily={FONT}>
            1 cobrado
          </text>
        </g>

        <g className="nv-sys nv-sys-operacion" opacity="0">
          <rect
            x="150"
            y="560"
            width="176"
            height="100"
            rx="10"
            fill="rgba(255,255,255,0.035)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.9"
          />
          <text x="168" y="588" fill="rgba(255,255,255,0.32)" fontSize="10" fontFamily={MONO}>
            04
          </text>
          <text x="168" y="612" fill="rgba(255,255,255,0.88)" fontSize="15" fontFamily={FONT}>
            Operación
          </text>
          <text x="168" y="636" fill="rgba(255,255,255,0.34)" fontSize="11" fontFamily={FONT}>
            3 en piso
          </text>
        </g>

        <g className="nv-sys nv-sys-reportes" opacity="0">
          <rect
            x="580"
            y="560"
            width="176"
            height="100"
            rx="10"
            fill="rgba(255,255,255,0.035)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.9"
          />
          <text x="598" y="588" fill="rgba(255,255,255,0.32)" fontSize="10" fontFamily={MONO}>
            05
          </text>
          <text x="598" y="612" fill="rgba(255,255,255,0.88)" fontSize="15" fontFamily={FONT}>
            Reportes
          </text>
          <text x="598" y="636" fill="rgba(255,255,255,0.34)" fontSize="11" fontFamily={FONT}>
            lectura viva
          </text>
        </g>
      </g>
    </svg>
  );
}
