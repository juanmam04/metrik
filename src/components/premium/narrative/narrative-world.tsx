const FONT = "var(--font-display), system-ui, sans-serif";
const MONO = "var(--font-mono), ui-monospace, monospace";

/** Waypoints: una sola curva suave pasa exactamente por cada uno. */
const NEED_NODES = [
  { x: 110, y: 210, label: null as string | null },
  { x: 230, y: 355, label: "Clientes" },
  { x: 510, y: 300, label: "Pedidos" },
  { x: 300, y: 510, label: "Equipo" },
  { x: 640, y: 560, label: "Pagos" },
  { x: 410, y: 730, label: "Reportes" },
] as const;

/** Catmull-Rom → cubic Bezier continua (sin tramos rectos). */
function curveThrough(points: readonly { x: number; y: number }[]) {
  if (points.length < 2) return "";
  const p = points.map((pt) => ({ x: pt.x, y: pt.y }));
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p[i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const NEED_PATH = curveThrough(NEED_NODES);

/** Escena derecha. Capas exclusivas — una sola visible. */
export function NarrativeWorld() {
  return (
    <svg
      className="nv-world pointer-events-none h-full w-full overflow-hidden"
      viewBox="0 0 900 900"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ACTO A — una sola curva por todos los conceptos */}
      <g className="nv-act nv-act-a" style={{ opacity: 1 }}>
        <text x="80" y="168" fill="rgba(81,60,250,0.95)" fontSize="11" fontFamily={MONO} letterSpacing="2.4">
          NECESIDAD
        </text>

        <path
          id="nv-line"
          className="nv-draw nv-draw-main"
          d={NEED_PATH}
          stroke="#513CFA"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset="1"
        />

        <circle
          className="nv-pulse"
          r="4.5"
          fill="#513CFA"
          cx={NEED_NODES[0].x}
          cy={NEED_NODES[0].y}
        />

        {NEED_NODES.filter((n) => n.label).map((n) => (
          <g key={n.label} className="nv-node">
            <circle cx={n.x} cy={n.y} r="3.4" fill="#513CFA" fillOpacity="0.75" />
            <text
              x={n.x}
              y={n.y - 16}
              textAnchor="middle"
              fill="rgba(255,255,255,0.58)"
              fontSize="15"
              fontFamily={FONT}
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      {/* ACTO B — operación (solo curvas) */}
      <g className="nv-act nv-act-b" style={{ opacity: 0, visibility: "hidden" }}>
        <rect x="340" y="380" width="220" height="64" stroke="rgba(81,60,250,0.75)" strokeWidth="1.1" />
        <text x="450" y="420" textAnchor="middle" fill="#fff" fontSize="17" fontFamily={FONT} letterSpacing="1.8">
          OPERACIÓN
        </text>

        <path
          className="nv-draw"
          d="M 180 280 Q 240 340, 340 400"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        <path
          className="nv-draw"
          d="M 680 260 Q 620 320, 560 390"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        <path
          className="nv-draw"
          d="M 200 560 Q 260 500, 340 430"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          className="nv-draw"
          d="M 720 540 Q 650 490, 560 430"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          className="nv-draw"
          d="M 450 640 Q 450 540, 450 444"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        <text x="140" y="268" fill="rgba(255,255,255,0.7)" fontSize="15" fontFamily={FONT}>
          Clientes
        </text>
        <text x="680" y="248" fill="rgba(255,255,255,0.7)" fontSize="15" fontFamily={FONT}>
          Pedidos
        </text>
        <text x="140" y="572" fill="rgba(255,255,255,0.65)" fontSize="15" fontFamily={FONT}>
          Equipo
        </text>
        <text x="720" y="552" fill="rgba(255,255,255,0.65)" fontSize="15" fontFamily={FONT}>
          Pagos
        </text>
        <text x="450" y="668" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="15" fontFamily={FONT}>
          Reportes
        </text>
      </g>

      {/* ACTO C — cadena */}
      <g className="nv-act nv-act-c" style={{ opacity: 0, visibility: "hidden" }}>
        {[
          { y: 180, label: "CLIENTE", hot: false },
          { y: 290, label: "PEDIDO", hot: true },
          { y: 400, label: "ESTADO", hot: false },
          { y: 510, label: "PAGO", hot: false },
          { y: 620, label: "ENTREGA", hot: false },
        ].map((n, i, arr) => (
          <g key={n.label} className={`nv-step nv-step-${i}`}>
            <rect
              x={280}
              y={n.y}
              width={340}
              height={68}
              stroke={n.hot ? "rgba(81,60,250,0.9)" : "rgba(255,255,255,0.22)"}
              strokeWidth={n.hot ? 1.15 : 0.75}
            />
            <text
              x={450}
              y={n.y + 42}
              textAnchor="middle"
              fill={n.hot ? "#fff" : "rgba(255,255,255,0.78)"}
              fontSize="16"
              fontFamily={FONT}
              letterSpacing="2"
            >
              {n.label}
            </text>
            {i < arr.length - 1 ? (
              <path
                className="nv-draw"
                d={`M 450 ${n.y + 68} Q 450 ${(n.y + 68 + arr[i + 1].y) / 2}, 450 ${arr[i + 1].y}`}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            ) : null}
          </g>
        ))}
      </g>

      {/* ACTO D — detalle */}
      <g className="nv-act nv-act-d" style={{ opacity: 0, visibility: "hidden" }}>
        <text x="80" y="150" fill="rgba(81,60,250,0.95)" fontSize="11" fontFamily={MONO} letterSpacing="2.2">
          PEDIDO
        </text>

        {[
          ["Cliente", "vinculado al pedido"],
          ["Estado", "pendiente → en curso"],
          ["Pago", "condiciona la entrega"],
          ["Responsable", "asignado al flujo"],
          ["Historial", "queda registrado"],
        ].map(([k, v], i) => (
          <g key={k} className={`nv-row nv-row-${i}`}>
            <line
              x1="80"
              y1={220 + i * 90}
              x2="820"
              y2={220 + i * 90}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.6"
            />
            <text x="80" y={268 + i * 90} fill="rgba(255,255,255,0.78)" fontSize="18" fontFamily={FONT}>
              {k}
            </text>
            <text
              x="820"
              y={268 + i * 90}
              textAnchor="end"
              fill="rgba(255,255,255,0.32)"
              fontSize="14"
              fontFamily={MONO}
            >
              {v}
            </text>
          </g>
        ))}
      </g>

      {/* ACTO E — wire UI */}
      <g className="nv-act nv-act-e" style={{ opacity: 0, visibility: "hidden" }}>
        <rect
          className="nv-draw"
          x="60"
          y="140"
          width="780"
          height="580"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="0.85"
        />
        <line
          className="nv-draw"
          x1="140"
          y1="140"
          x2="140"
          y2="720"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.7"
        />
        <line
          className="nv-draw"
          x1="140"
          y1="200"
          x2="840"
          y2="200"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.65"
        />

        <g className="nv-panel nv-panel-0">
          <rect x="168" y="232" width="200" height="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
          <text x="188" y="268" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily={MONO}>
            CLIENTE
          </text>
          <text x="188" y="302" fill="rgba(255,255,255,0.88)" fontSize="17" fontFamily={FONT}>
            Registro activo
          </text>
        </g>
        <g className="nv-panel nv-panel-1">
          <rect x="388" y="232" width="220" height="100" stroke="rgba(81,60,250,0.6)" strokeWidth="0.95" />
          <text x="408" y="268" fill="rgba(81,60,250,0.9)" fontSize="11" fontFamily={MONO}>
            PEDIDO
          </text>
          <text x="408" y="302" fill="#fff" fontSize="17" fontFamily={FONT}>
            #1842 · En curso
          </text>
        </g>
        <g className="nv-panel nv-panel-2">
          <rect x="628" y="232" width="190" height="100" stroke="rgba(255,255,255,0.16)" strokeWidth="0.75" />
          <text x="648" y="268" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily={MONO}>
            ESTADO
          </text>
          <text x="648" y="302" fill="rgba(255,255,255,0.85)" fontSize="17" fontFamily={FONT}>
            Operativo
          </text>
        </g>
        <g className="nv-panel nv-panel-3">
          <rect x="168" y="360" width="320" height="160" stroke="rgba(255,255,255,0.14)" strokeWidth="0.75" />
          <text x="188" y="396" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily={MONO}>
            PAGO
          </text>
          <line x1="188" y1="428" x2="440" y2="428" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <line x1="188" y1="456" x2="400" y2="456" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <line x1="188" y1="484" x2="420" y2="484" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        </g>
        <g className="nv-panel nv-panel-4">
          <rect x="512" y="360" width="306" height="160" stroke="rgba(255,255,255,0.14)" strokeWidth="0.75" />
          <text x="532" y="396" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily={MONO}>
            REPORTES
          </text>
          <path
            className="nv-draw"
            d="M 548 480 C 600 480, 620 430, 680 440 S 760 420, 790 426"
            stroke="#513CFA"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
