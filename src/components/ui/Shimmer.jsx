/** Ambient gradient sheen for hero sections */
export function ShimmerBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-gold/15 blur-3xl motion-safe:animate-float-slow" />
      <div className="absolute -right-1/4 bottom-0 h-[480px] w-[480px] rounded-full bg-fairway/20 blur-3xl motion-safe:animate-float-slow-reverse" />
      <div className="absolute left-1/2 top-1/3 h-px w-[120%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}
