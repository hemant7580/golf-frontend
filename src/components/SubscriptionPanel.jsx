import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api/client.js';
import { GlassCard } from './ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function SubscriptionPanel({ token, subscription, onRefresh }) {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  async function startCheckout(plan) {
    setError('');
    setLoading(plan);
    try {
      const data = await apiFetch('/api/subscription/checkout', {
        method: 'POST',
        token,
        body: { plan },
      });
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setError(e.data?.error || e.message);
    } finally {
      setLoading(null);
    }
  }

  const status = subscription?.status;
  const active = status === 'active' || status === 'trialing';

  return (
    <GlassCard className="p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-bold text-fairway-deep">Membership</h3>
          <p className="mt-1 text-sm text-slate-600">
            A portion of qualifying payments supports your chosen charity.
          </p>
        </div>
        {active && (
          <span className="shrink-0 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            Active
          </span>
        )}
      </div>

      {subscription ? (
        <dl className="mt-6 grid gap-3 rounded-2xl border border-slate-200/60 bg-white/40 p-4 text-sm backdrop-blur-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Plan</dt>
            <dd className="font-semibold capitalize text-fairway-deep">{subscription.plan}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Status</dt>
            <dd className="font-medium capitalize text-slate-800">{subscription.status}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-sm text-slate-600">No subscription yet — pick a plan to unlock draws.</p>
      )}

      {!active && (
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            type="button"
            disabled={!!loading}
            onClick={() => startCheckout('monthly')}
            className="btn-secondary"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
          >
            {loading === 'monthly' ? 'Opening…' : 'Monthly'}
          </motion.button>
          <motion.button
            type="button"
            disabled={!!loading}
            onClick={() => startCheckout('yearly')}
            className="btn-primary"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
          >
            {loading === 'yearly' ? 'Opening…' : 'Yearly'}
          </motion.button>
        </div>
      )}

      {active && (
        <p className="mt-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-900">
          You’re eligible for monthly draws while this membership stays active.
        </p>
      )}

      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-red-600">
          {error}
        </motion.p>
      )}

      {onRefresh && (
        <button type="button" className="mt-4 text-sm font-semibold text-fairway underline decoration-gold/40 underline-offset-4 hover:text-gold-dark" onClick={onRefresh}>
          Refresh status
        </button>
      )}
    </GlassCard>
  );
}
