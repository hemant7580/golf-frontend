import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { apiFetch } from '../api/client.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function AdminDashboard() {
  const { token, user } = useAuth();
  const reduce = useReducedMotion();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [mode, setMode] = useState('random');
  const [drawMsg, setDrawMsg] = useState('');
  const [charityForm, setCharityForm] = useState({ name: '', description: '', country: 'US' });
  const [charityMsg, setCharityMsg] = useState('');

  if (user?.role !== 'admin') {
    return (
      <div className="page-shell flex flex-1 items-center justify-center py-24">
        <motion.div
          initial={reduce ? false : { scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md rounded-3xl border border-red-200/80 bg-red-50/90 p-10 text-center shadow-glass backdrop-blur"
        >
          <p className="font-display text-xl font-bold text-red-800">Admin only</p>
          <p className="mt-2 text-sm text-red-700/90">This area is restricted. Ask an owner to promote your account.</p>
        </motion.div>
      </div>
    );
  }

  async function runDraw(e) {
    e.preventDefault();
    setDrawMsg('');
    try {
      const res = await apiFetch(`/api/admin/draws/${year}/${month}/execute`, {
        method: 'POST',
        token,
        body: { mode },
      });
      setDrawMsg(`Draw complete. Winner record: ${res.winnerId}. Eligible: ${res.eligibleCount}.`);
    } catch (err) {
      setDrawMsg(err.data?.error || err.message);
    }
  }

  async function createCharity(e) {
    e.preventDefault();
    setCharityMsg('');
    try {
      await apiFetch('/api/admin/charities', {
        method: 'POST',
        token,
        body: charityForm,
      });
      setCharityMsg('Charity created.');
      setCharityForm({ name: '', description: '', country: 'US' });
    } catch (err) {
      setCharityMsg(err.data?.error || err.message);
    }
  }

  return (
    <div className="page-shell relative flex-1 py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-35" aria-hidden />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative space-y-10"
      >
        <div>
          <p className="badge border-gold/40 bg-gold/15 text-gold-dark">Operations</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-fairway-deep md:text-4xl">Admin console</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Run regulated draws and grow the charity directory. Eligibility follows active subscriptions for the
            selected month.
          </p>
        </div>

        <GlassCard className="p-8">
          <h2 className="font-display text-lg font-bold text-fairway-deep">Execute monthly draw</h2>
          <p className="mt-1 text-sm text-slate-600">
            Subscribers with an active period overlapping the calendar month are eligible.
          </p>
          <form onSubmit={runDraw} className="mt-6 flex flex-wrap items-end gap-4">
            <label className="text-sm font-medium text-slate-700">
              Year
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="input-ds mt-1.5 w-28"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Month
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="input-ds mt-1.5 w-24"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Mode
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="input-ds mt-1.5 min-w-[12rem]"
              >
                <option value="random">Random</option>
                <option value="algorithmic">Algorithmic (best of last 5)</option>
              </select>
            </label>
            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={reduce ? {} : { scale: 1.02 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
            >
              Run draw
            </motion.button>
          </form>
          {drawMsg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 rounded-2xl border border-slate-200/80 bg-fairway-pale/50 px-4 py-3 text-sm text-fairway-deep"
            >
              {drawMsg}
            </motion.p>
          )}
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="font-display text-lg font-bold text-fairway-deep">Create charity</h2>
          <form onSubmit={createCharity} className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Organization name"
              value={charityForm.name}
              onChange={(e) => setCharityForm((f) => ({ ...f, name: e.target.value }))}
              className="input-ds sm:col-span-1"
            />
            <input
              placeholder="Country code"
              value={charityForm.country}
              onChange={(e) => setCharityForm((f) => ({ ...f, country: e.target.value }))}
              className="input-ds sm:col-span-1"
            />
            <textarea
              placeholder="Description / mission"
              value={charityForm.description}
              onChange={(e) => setCharityForm((f) => ({ ...f, description: e.target.value }))}
              className="input-ds min-h-[100px] sm:col-span-2"
            />
            <motion.button
              type="submit"
              className="btn-secondary border-fairway/30 sm:col-span-2 sm:w-fit"
              whileHover={reduce ? {} : { scale: 1.02 }}
            >
              Save charity
            </motion.button>
          </form>
          {charityMsg && (
            <p className="mt-4 text-sm font-medium text-fairway-deep">{charityMsg}</p>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
