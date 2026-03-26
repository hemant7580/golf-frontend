import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api/client.js';
import { GlassCard } from './ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function ScoreInput({ token, onUpdated }) {
  const reduce = useReducedMotion();
  const [grossScore, setGrossScore] = useState('');
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const n = Number(grossScore);
      await apiFetch('/api/scores', {
        method: 'POST',
        token,
        body: { grossScore: n, courseName: courseName || undefined },
      });
      setGrossScore('');
      setCourseName('');
      setMessage('Score saved. We keep your last five rounds.');
      onUpdated?.();
    } catch (err) {
      setMessage(err.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-7">
      <h3 className="font-display text-lg font-bold text-fairway-deep">Add a round</h3>
      <p className="mt-1 text-sm text-slate-600">
        Log a gross score; older entries roll off after five.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Gross score
            <input
              type="number"
              min={50}
              max={200}
              required
              value={grossScore}
              onChange={(e) => setGrossScore(e.target.value)}
              className="input-ds mt-2"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Course (optional)
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="input-ds mt-2"
            />
          </label>
        </div>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${message.includes('saved') ? 'text-emerald-700' : 'text-red-600'}`}
          >
            {message}
          </motion.p>
        )}
        <motion.button
          type="submit"
          disabled={loading}
          className="btn-primary"
          whileHover={reduce || loading ? {} : { scale: 1.02 }}
          whileTap={reduce || loading ? {} : { scale: 0.98 }}
        >
          {loading ? 'Saving…' : 'Save score'}
        </motion.button>
      </form>
    </GlassCard>
  );
}
