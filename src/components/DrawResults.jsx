import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch } from '../api/client.js';
import { GlassCard } from './ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function DrawResults({ token }) {
  const reduce = useReducedMotion();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError('');
      try {
        const res = await apiFetch(`/api/draws/${year}/${month}`, { token });
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) setError(e.data?.error || e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, year, month]);

  return (
    <GlassCard className="p-7">
      <h3 className="font-display text-lg font-bold text-fairway-deep">Draw results</h3>
      <p className="mt-1 text-sm text-slate-600">Browse results by month.</p>
      <div className="mt-5 flex flex-wrap gap-4">
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
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
      <AnimatePresence mode="wait">
        {!data?.draw && !error && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-sm text-slate-500"
          >
            No draw recorded for this month yet.
          </motion.p>
        )}
        {data?.draw?.status === 'completed' && (
          <motion.ul
            key="list"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 space-y-3"
          >
            {data.winners?.map((w, i) => (
              <motion.li
                key={w.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-sm ${
                  w.isYou
                    ? 'border-gold/50 bg-gradient-to-r from-gold/10 to-fairway-pale/50'
                    : 'border-slate-200/70 bg-white/40'
                }`}
              >
                <span className="font-semibold text-slate-800">
                  {w.user?.firstName} {w.user?.lastName?.[0]}.
                </span>
                <span className="text-slate-500">{w.prizeLabel}</span>
                {w.isYou && (
                  <span className="rounded-full bg-fairway px-2 py-0.5 text-xs font-bold text-white">You</span>
                )}
                <span className="text-xs uppercase tracking-wide text-slate-400">{w.verificationStatus}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
