import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { apiFetch } from '../api/client.js';
import { ScoreInput } from '../components/ScoreInput.jsx';
import { SubscriptionPanel } from '../components/SubscriptionPanel.jsx';
import { DrawResults } from '../components/DrawResults.jsx';
import { CharitySelect } from '../components/CharitySelect.jsx';
import { WinnerVerificationUpload } from '../components/WinnerVerificationUpload.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

function DashboardSkeleton() {
  return (
    <div className="page-shell flex flex-1 flex-col gap-6 py-14">
      <div className="h-10 w-1/3 animate-pulse rounded-2xl bg-white/60" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-56 animate-pulse rounded-3xl bg-white/50" />
        <div className="h-56 animate-pulse rounded-3xl bg-white/50" />
      </div>
    </div>
  );
}

export function Dashboard() {
  const { token, user } = useAuth();
  const reduce = useReducedMotion();
  const [profile, setProfile] = useState(null);
  const [entries, setEntries] = useState([]);

  const load = useCallback(async () => {
    const [me, scores] = await Promise.all([
      apiFetch('/api/me', { token }),
      apiFetch('/api/scores', { token }),
    ]);
    setProfile(me);
    setEntries(scores.entries || []);
  }, [token]);

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  if (!user || !profile) {
    return <DashboardSkeleton />;
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  };
  const item = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="page-shell relative flex-1 py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-40" aria-hidden />

      <motion.div variants={container} initial="hidden" animate="show" className="relative space-y-10">
        <motion.header variants={item} className="max-w-3xl">
          <p className="badge">Your fairway</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-fairway-deep md:text-4xl">
            Hello{profile.user.firstName ? `, ${profile.user.firstName}` : ''}.
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Manage membership, log rounds, and follow draws — all in one refined view.
          </p>
        </motion.header>

        <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
          <SubscriptionPanel token={token} subscription={profile.subscription} onRefresh={load} />
          <CharitySelect
            token={token}
            userCountry={profile.user.country}
            preferredCharityId={profile.user.preferredCharityId}
            onSaved={load}
          />
        </motion.div>

        <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
          <ScoreInput token={token} onUpdated={load} />
          <GlassCard className="p-7">
            <h3 className="font-display text-lg font-bold text-fairway-deep">Last five rounds</h3>
            <p className="mt-1 text-sm text-slate-500">Newest on top after each save.</p>
            <ul className="mt-5 space-y-2">
              {entries.length === 0 && <li className="text-sm text-slate-500">No rounds yet — add your first score.</li>}
              {entries.map((e, i) => (
                <motion.li
                  key={`${e.playedAt}-${i}`}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/50 px-4 py-3 text-sm backdrop-blur-sm"
                >
                  <span className="font-medium text-slate-700">{e.courseName || 'Round'}</span>
                  <span className="rounded-full bg-fairway/10 px-3 py-1 font-display text-lg font-bold text-fairway">
                    {e.grossScore}
                  </span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div variants={item} className="grid gap-6 lg:grid-cols-1">
          <DrawResults token={token} />
          <WinnerVerificationUpload token={token} />
        </motion.div>
      </motion.div>
    </div>
  );
}
