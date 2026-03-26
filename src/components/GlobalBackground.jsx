/**
 * Fixed full-viewport backdrop behind all pages (z-index below content).
 */
export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base wash — warm off-white to mint */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(168deg, #f9fbfa 0%, #eef6f1 38%, #f3eee6 72%, #f7f9f7 100%)
          `,
        }}
      />

      {/* Soft corner blooms */}
      <div
        className="absolute -left-[35%] -top-[25%] h-[85vmin] w-[85vmin] rounded-full opacity-90 motion-safe:animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(201, 162, 74, 0.22) 0%, rgba(201, 162, 74, 0.06) 42%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
      <div
        className="absolute -right-[30%] top-[5%] h-[75vmin] w-[75vmin] rounded-full opacity-80 motion-safe:animate-float-slow-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(12, 61, 44, 0.14) 0%, rgba(12, 61, 44, 0.04) 45%, transparent 72%)',
          filter: 'blur(6px)',
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[15%] h-[65vmin] w-[65vmin] rounded-full motion-safe:animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(20, 90, 66, 0.12) 0%, transparent 65%)',
          filter: 'blur(8px)',
        }}
      />
      <div
        className="absolute left-1/2 top-[15%] h-[45vmin] w-[120vmin] -translate-x-1/2 opacity-70"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201, 162, 74, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* Subtle fairway “fairway line” accent */}
      <div
        className="absolute inset-x-0 top-[20%] h-px opacity-50"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(12, 61, 44, 0.08) 35%, rgba(201, 162, 74, 0.2) 50%, rgba(12, 61, 44, 0.08) 65%, transparent 95%)',
        }}
      />

      {/* Fine dot lattice — depth without noise image */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(12, 61, 44, 0.045) 0.5px, transparent 0.6px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Bottom vignette for readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background: 'linear-gradient(to top, rgba(239, 245, 241, 0.65) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
