export function SiteAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,92,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(124,92,255,0.05),transparent_35%)]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
      />
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
