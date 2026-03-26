import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      nav('/dashboard');
    } catch (err) {
      setError(err.data?.error || err.message);
    }
  }

  return (
    <div className="page-shell relative flex flex-1 items-center py-14 md:py-20">
      <div className="absolute inset-0 bg-hero-radial opacity-60" aria-hidden />
      <div className="relative grid w-full gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden flex-col justify-center lg:flex"
        >
          <p className="badge w-fit">Welcome back</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-fairway-deep lg:text-5xl">
            Slip into your dashboard like a perfect putt.
          </h1>
          <p className="mt-4 max-w-md text-lg text-slate-600">
            Scores, subscription, draws, and the charity you champion — all in one calm, green space.
          </p>
          <div className="mt-10 h-px max-w-xs bg-gradient-to-r from-gold/60 to-transparent" />
          <p className="mt-6 text-sm font-medium text-slate-500">Trusted by members who play with purpose.</p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
        >
          <GlassCard className="p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-fairway-deep lg:hidden">Log in</h2>
            <h2 className="hidden font-display text-2xl font-bold text-fairway-deep lg:block">Sign in</h2>
            <p className="mt-1 text-sm text-slate-500">Use the email you registered with.</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-ds mt-2"
                  autoComplete="email"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-ds mt-2"
                  autoComplete="current-password"
                />
              </label>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </motion.p>
              )}
              <motion.button
                type="submit"
                className="btn-primary w-full py-3.5"
                whileHover={reduce ? {} : { scale: 1.01 }}
                whileTap={reduce ? {} : { scale: 0.99 }}
              >
                Continue
              </motion.button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              New here?{' '}
              <Link to="/register" className="font-semibold text-fairway underline decoration-gold/50 underline-offset-4 hover:text-gold-dark">
                Create an account
              </Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
