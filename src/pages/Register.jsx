import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const reduce = useReducedMotion();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: 'US',
  });
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      nav('/dashboard');
    } catch (err) {
      setError(err.data?.error || err.message);
    }
  }

  const fields = [
    { key: 'firstName', label: 'First name', type: 'text', required: false },
    { key: 'lastName', label: 'Last name', type: 'text', required: false },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'country', label: 'Country (ISO code)', type: 'text', required: false },
  ];

  return (
    <div className="page-shell relative flex flex-1 py-14 md:py-20">
      <div className="absolute inset-0 bg-hero-radial opacity-50" aria-hidden />
      <div className="relative mx-auto w-full max-w-lg">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center lg:text-left"
        >
          <p className="badge mx-auto w-fit lg:mx-0">Join the club</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-fairway-deep sm:text-4xl">
            Membership that <span className="text-gold-dark">matters</span>.
          </h1>
          <p className="mt-2 text-slate-600">One account — scores, draws, and charitable giving.</p>
        </motion.div>

        <GlassCard className="p-8 sm:p-10">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.slice(0, 2).map((f) => (
                <label key={f.key} className="block text-sm font-medium text-slate-700 sm:col-span-1">
                  {f.label}
                  <input
                    type={f.type}
                    required={f.required}
                    value={form[f.key]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className="input-ds mt-2"
                  />
                </label>
              ))}
            </div>
            {fields.slice(2).map((f) => (
              <label key={f.key} className="block text-sm font-medium text-slate-700">
                {f.label}
                <input
                  type={f.type}
                  required={f.required}
                  value={form[f.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  className="input-ds mt-2"
                />
              </label>
            ))}
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                className="input-ds mt-2"
                autoComplete="new-password"
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
              className="btn-primary mt-2 w-full py-3.5"
              whileHover={reduce ? {} : { scale: 1.01 }}
              whileTap={reduce ? {} : { scale: 0.99 }}
            >
              Create account
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already a member?{' '}
            <Link to="/login" className="font-semibold text-fairway underline decoration-gold/50 underline-offset-4 hover:text-gold-dark">
              Log in
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
