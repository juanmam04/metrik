export function SiteAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Burbujas violetas — atmósfera de toda la web */}
      <div
        className="absolute -top-[12%] left-[5%] size-[min(58vw,560px)] rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(81,60,250,0.26) 0%, rgba(81,60,250,0.07) 42%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[12%] right-[5%] size-[min(52vw,500px)] rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(107,92,255,0.2) 0%, rgba(81,60,250,0.05) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute top-[42%] left-[22%] size-[min(40vw,380px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,60,250,0.14) 0%, rgba(81,60,250,0.03) 50%, transparent 75%)",
        }}
      />
      <div
        className="absolute -bottom-[8%] right-[12%] size-[min(58vw,560px)] rounded-full opacity-95"
        style={{
          background:
            "radial-gradient(circle, rgba(81,60,250,0.22) 0%, rgba(61,44,199,0.06) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[18%] left-[8%] size-[min(44vw,420px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(107,92,255,0.15) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute top-[68%] left-[48%] size-[min(32vw,300px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,60,250,0.11) 0%, transparent 70%)",
        }}
      />

      {/* Grain muy suave para que no se vea flat */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
