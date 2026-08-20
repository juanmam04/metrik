"use client";

/** El producto que se construye ES la oferta Metrik. */
export function BuildProduct() {
  return (
    <div className="mb-product pointer-events-none absolute left-1/2 top-[48%] w-[min(840px,64%)]">
      <div className="mb-prod-shell flex aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-white/[0.09] bg-[#0b0b0d] shadow-[0_50px_120px_rgba(0,0,0,0.5)]">
        <aside className="mb-prod-struct hidden w-[68px] shrink-0 flex-col items-center gap-7 border-r border-white/[0.07] py-6 sm:flex">
          <div className="h-px w-6 bg-white/10" />
          <span className="size-[5px] rounded-full bg-accent" />
          <span className="size-[5px] rounded-full bg-white/18" />
          <span className="size-[5px] rounded-full bg-white/18" />
        </aside>

        <div className="mb-prod-surface flex min-w-0 flex-1 flex-col">
          <header className="flex h-[52px] items-center border-b border-white/[0.07] px-5">
            <p className="text-[13px] tracking-[-0.03em] text-white/85">Metrik</p>
          </header>

          <div className="mb-prod-content grid flex-1 grid-cols-3 gap-2.5 p-3.5 sm:p-4">
            <div className="rounded-md border border-white/[0.07] bg-white/[0.025] px-3.5 py-4">
              <p className="font-display text-[1.15rem] tracking-[-0.04em] text-white">Software</p>
              <p className="mt-3 text-[12px] leading-relaxed text-white/38">
                Productos alrededor de una operación real.
              </p>
            </div>
            <div className="rounded-md border border-white/[0.07] bg-white/[0.02] px-3.5 py-4">
              <p className="font-display text-[1.15rem] tracking-[-0.04em] text-white">Web</p>
              <p className="mt-3 text-[12px] leading-relaxed text-white/38">
                Sitios que comunican y funcionan.
              </p>
            </div>
            <div className="rounded-md border border-white/[0.08] bg-accent/[0.08] px-3.5 py-4">
              <p className="font-display text-[1.15rem] tracking-[-0.04em] text-white">Producto</p>
              <p className="mt-3 text-[12px] leading-relaxed text-white/38">
                Diseño, motion y tecnología juntos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
