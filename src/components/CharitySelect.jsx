import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api/client.js';
import { GlassCard } from './ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function CharitySelect({ token, userCountry, preferredCharityId, onSaved }) {
  const reduce = useReducedMotion();
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(preferredCharityId || '');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setSelected(preferredCharityId ? String(preferredCharityId) : '');
  }, [preferredCharityId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = userCountry ? `?country=${encodeURIComponent(userCountry)}` : '';
        const res = await apiFetch(`/api/charities${q}`);
        if (!cancelled) setCharities(res.charities || []);
      } catch {
        if (!cancelled) setCharities([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userCountry]);

  async function save() {
    setMsg('');
    setLoading(true);
    try {
      await apiFetch('/api/me', {
        method: 'PATCH',
        token,
        body: { preferredCharityId: selected || null },
      });
      setMsg('Preference saved.');
      onSaved?.();
    } catch (e) {
      setMsg(e.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-7">
      <h3 className="font-display text-lg font-bold text-fairway-deep">Charity</h3>
      <p className="mt-1 text-sm text-slate-600">Direct your qualifying contribution share to an organization you trust.</p>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="input-ds mt-5"
      >
        <option value="">— Select a charity —</option>
        {charities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.country})
          </option>
        ))}
      </select>
      <motion.button
        type="button"
        disabled={loading}
        onClick={save}
        className="btn-primary mt-4"
        whileHover={reduce || loading ? {} : { scale: 1.02 }}
        whileTap={reduce || loading ? {} : { scale: 0.98 }}
      >
        {loading ? 'Saving…' : 'Save preference'}
      </motion.button>
      {msg && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-fairway-deep">
          {msg}
        </motion.p>
      )}
    </GlassCard>
  );
}
