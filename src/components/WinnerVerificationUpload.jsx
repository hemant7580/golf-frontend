import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const base = import.meta.env.VITE_API_URL || '';

export function WinnerVerificationUpload({ token }) {
  const reduce = useReducedMotion();
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload(e) {
    e.preventDefault();
    if (!file) return;
    setMsg('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${base}/api/verification`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setMsg(`Uploaded: ${data.verificationAssetUrl}`);
      setFile(null);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="border-dashed border-gold/30 bg-gradient-to-br from-white/80 to-fairway-pale/30 p-7">
      <h3 className="font-display text-lg font-bold text-fairway-deep">Winner verification</h3>
      <p className="mt-1 text-sm text-slate-600">
        Won a draw? Upload a scorecard image or PDF (max 5MB). Our team reviews every submission.
      </p>
      <form onSubmit={upload} className="mt-6">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300/80 bg-white/50 px-6 py-10 transition hover:border-gold/50 hover:bg-white/80">
          <span className="text-2xl" aria-hidden>
            📎
          </span>
          <span className="mt-2 text-sm font-medium text-slate-600">Tap to choose file</span>
          <input
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        {file && <p className="mt-3 text-center text-xs text-slate-500">{file.name}</p>}
        <motion.button
          type="submit"
          disabled={loading || !file}
          className="btn-secondary mt-6 w-full border-fairway/40 sm:w-auto"
          whileHover={reduce || loading ? {} : { scale: 1.02 }}
        >
          {loading ? 'Uploading…' : 'Upload proof'}
        </motion.button>
        {msg && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-fairway-deep">
            {msg}
          </motion.p>
        )}
      </form>
    </GlassCard>
  );
}
