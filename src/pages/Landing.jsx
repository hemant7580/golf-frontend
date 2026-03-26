import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { ShimmerBackdrop } from '../components/ui/Shimmer.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const features = [
  {
    title: 'Rolling scores',
    copy: 'Your five most recent rounds — clean, fair, always current.',
    icon: '⛳',
  },
  {
    title: 'Monthly draws',
    copy: 'Random luck or skill-weighted modes. Winners verify in-app.',
    icon: '🎁',
  },
  {
    title: 'Your charity',
    copy: 'Point a share of every qualifying payment to a cause you trust.',
    icon: '❤️',
  },
];

export function Landing() {
  const root = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce || !root.current) return;
    const q = gsap.utils.selector(root.current);
    const ctx = gsap.context(() => {
      gsap.from(q('.hero-line'), {
        y: 72,
        opacity: 0,
        duration: 0.95,
        stagger: 0.11,
        ease: 'power3.out',
        delay: 0.08,
      });
      gsap.from(q('.hero-card'), {
        y: 48,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power2.out',
        delay: 0.45,
      });
      gsap.to(q('.hero-orb'), {
        y: 12,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={root} className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial" />
      <ShimmerBackdrop />

      <section className="page-shell relative pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <p className="hero-line badge mb-4 w-fit">Play · Give · Win</p>
            <h1 className="hero-line font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-fairway-deep md:text-5xl lg:text-[3.25rem]">
              Where every round <span className="text-transparent bg-gradient-to-r from-gold to-gold-light bg-clip-text">supports something bigger</span>.
            </h1>
            <p className="hero-line mt-6 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Subscribe, track your last five scores, and enter fair monthly draws — with algorithmic or pure
              chance modes. Your membership fuels the fairway and the charities you choose.
            </p>
            <div className="hero-line mt-10 flex flex-wrap gap-4">
              <motion.div whileHover={reduce ? {} : { scale: 1.03 }} whileTap={reduce ? {} : { scale: 0.98 }}>
                <Link to="/register" className="btn-primary px-8 py-3.5 text-base shadow-lift">
                  Start your membership
                </Link>
              </motion.div>
              <motion.div whileHover={reduce ? {} : { scale: 1.02 }} whileTap={reduce ? {} : { scale: 0.98 }}>
                <Link to="/login" className="btn-secondary px-8 py-3.5 text-base">
                  Sign in
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="hero-line mt-12 flex flex-wrap gap-6 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow" /> Live draws
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold shadow-glow" /> Charity-first
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-fairway-light shadow-glow" /> Secure checkout
              </span>
            </motion.div>
          </div>

          <div className="relative">
            <div
              className="hero-orb pointer-events-none absolute -right-8 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold/40 to-transparent blur-2xl md:h-80 md:w-80"
              aria-hidden
            />
            <GlassCard className="relative p-8 lg:p-10" delay={0.15}>
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-dark">
                This month on the course
              </p>
              <p className="mt-3 font-display text-3xl font-bold text-fairway-deep">Build habits that give back.</p>
              <ul className="mt-8 space-y-4 border-t border-slate-200/60 pt-8">
                {['Log rounds in seconds', 'See draw history anytime', 'Pick your impact'].map((line, i) => (
                  <motion.li
                    key={line}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fairway-pale text-xs font-bold text-fairway">
                      {i + 1}
                    </span>
                    {line}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className="hero-card">
              <GlassCard className="h-full p-7 transition hover:shadow-lift" delay={i * 0.08}>
                <span className="text-3xl" aria-hidden>
                  {f.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-fairway-deep">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.copy}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
