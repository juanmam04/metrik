"use client";

import { cn } from "@/lib/utils";

/**
 * Consecuencia del módulo PEDIDOS.
 * Payoff de la secuencia: la UI real del sistema.
 */
export function NarrativeProduct({
  variant = "stage",
}: {
  variant?: "stage" | "inline";
}) {
  const inline = variant === "inline";

  return (
    <div
      className={cn(
        "nv-product pointer-events-none",
        inline
          ? "relative w-full"
          : "absolute inset-0 z-20 flex items-end justify-center px-4 pb-36 pt-16 sm:items-center sm:p-8 lg:p-6 xl:p-8"
      )}
      style={inline ? undefined : { opacity: 0, visibility: "hidden" }}
    >
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-[12px] border border-white/[0.12] bg-[#0b0b0d] shadow-[0_40px_100px_rgba(0,0,0,0.55)]",
          inline
            ? "max-h-none"
            : "max-h-[min(52svh,380px)] max-w-[920px] sm:max-h-none sm:aspect-[16/10] sm:flex-row lg:max-h-[min(78vh,640px)]"
        )}
      >
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-5 border-r border-white/[0.07] py-5 sm:flex">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="flex h-11 shrink-0 items-center justify-between border-b border-white/[0.07] px-4">
            <p className="text-[13px] tracking-[-0.03em] text-white/85">Pedidos</p>
            <p className="font-mono text-[10px] tracking-[0.08em] text-accent/70">#1842 · En curso</p>
          </header>

          <div className="grid flex-1 grid-cols-2 gap-2 overflow-auto p-3 sm:grid-cols-12 sm:gap-2.5 sm:p-3.5">
            <div className="col-span-1 rounded-md border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 sm:col-span-4">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Cliente</p>
              <p className="mt-1.5 font-display text-base tracking-[-0.05em] text-white sm:text-lg">
                Vinculado
              </p>
            </div>
            <div className="col-span-1 rounded-md border border-accent/40 bg-accent/[0.08] px-3 py-2.5 sm:col-span-4">
              <p className="font-mono text-[9px] tracking-[0.14em] text-accent/85 uppercase">Estado</p>
              <p className="mt-1.5 font-display text-base tracking-[-0.05em] text-white sm:text-lg">
                En curso
              </p>
            </div>
            <div className="col-span-2 rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 sm:col-span-4">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Pago</p>
              <p className="mt-1.5 font-display text-base tracking-[-0.05em] text-white sm:text-lg">
                Pendiente
              </p>
            </div>

            <div className="col-span-2 rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-3 sm:col-span-7">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Flujo</p>
              <p className="mt-2 text-[12px] text-white/55 sm:mt-3">
                Cliente → <span className="text-accent">Pedido</span> → Estado → Pago → Entrega
              </p>
              <div className="mt-3 space-y-2 sm:mt-4">
                {[
                  ["#1842", "En curso"],
                  ["#1839", "Pago"],
                  ["#1831", "Entrega"],
                ].map(([id, state]) => (
                  <div
                    key={id}
                    className="flex justify-between border-t border-white/[0.05] pt-2 text-[11px]"
                  >
                    <span className="font-mono text-white/45">{id}</span>
                    <span className="text-white/35">{state}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 hidden rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-3 sm:col-span-5 sm:block">
              <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">Historial</p>
              <div className="mt-3 space-y-2">
                <div className="h-1 w-4/5 rounded-full bg-white/[0.08]" />
                <div className="h-1 w-3/5 rounded-full bg-white/[0.06]" />
                <div className="h-1 w-[70%] rounded-full bg-accent/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
