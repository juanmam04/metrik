"use client";

/** Producto conceptual — payoff de la necesidad inicial. */
export function NarrativeProduct() {
  return (
    <div
      className="nv-product pointer-events-none absolute inset-0 flex items-center justify-center p-4 lg:p-8"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <div className="flex aspect-[16/10] w-full max-w-[880px] overflow-hidden rounded-[10px] border border-white/[0.09] bg-[#0b0b0d] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <aside className="hidden w-16 shrink-0 flex-col items-center gap-5 border-r border-white/[0.07] py-5 sm:flex">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-11 items-center justify-between border-b border-white/[0.07] px-4">
            <p className="text-[13px] tracking-[-0.03em] text-white/85">Operación</p>
            <p className="font-mono text-[10px] tracking-[0.08em] text-white/28">Todo conectado</p>
          </header>

          <div className="grid flex-1 grid-cols-12 gap-2 p-3 sm:gap-2.5 sm:p-3.5">
            <div className="col-span-4 rounded-md border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Clientes</p>
              <p className="mt-1.5 font-display text-lg tracking-[-0.05em] text-white">Activos</p>
            </div>
            <div className="col-span-4 rounded-md border border-accent/35 bg-accent/[0.07] px-3 py-2.5">
              <p className="font-mono text-[9px] tracking-[0.14em] text-accent/85 uppercase">Pedidos</p>
              <p className="mt-1.5 font-display text-lg tracking-[-0.05em] text-white">En curso</p>
            </div>
            <div className="col-span-4 rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Pagos</p>
              <p className="mt-1.5 font-display text-lg tracking-[-0.05em] text-white">Vinculados</p>
            </div>

            <div className="col-span-7 rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-3">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Flujo</p>
              <p className="mt-3 text-[12px] text-white/55">
                Cliente → <span className="text-accent">Pedido</span> → Estado → Pago → Entrega
              </p>
              <div className="mt-4 space-y-2">
                {[
                  ["#1842", "En curso"],
                  ["#1839", "Pago"],
                  ["#1831", "Entrega"],
                ].map(([id, state]) => (
                  <div key={id} className="flex justify-between border-t border-white/[0.05] pt-2 text-[11px]">
                    <span className="font-mono text-white/45">{id}</span>
                    <span className="text-white/35">{state}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-5 rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-3">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Reportes</p>
              <svg viewBox="0 0 140 56" className="mt-3 h-12 w-full" aria-hidden>
                <path
                  d="M6 44 C 28 44, 36 18, 58 22 S 96 10, 134 14"
                  fill="none"
                  stroke="#513CFA"
                  strokeWidth="1.35"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
