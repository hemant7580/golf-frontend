import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { GlobalBackground } from './GlobalBackground.jsx';

export function Layout() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate min-h-screen flex flex-col">
      <GlobalBackground />
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/55 backdrop-blur-2xl">
        <div className="page-shell flex h-[4.25rem] items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fairway to-fairway-light text-sm font-bold text-white shadow-glass"
              whileHover={reduce ? {} : { scale: 1.06, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              GC
            </motion.span>
            <span className="font-display text-lg font-bold tracking-tight text-fairway-deep sm:text-xl">
              Golf Charity<span className="text-gold"> Club</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-fairway/10 text-fairway shadow-sm'
                    : 'text-slate-600 hover:bg-white/50 hover:text-fairway'
                }`
              }
            >
              Home
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-fairway/10 text-fairway shadow-sm'
                        : 'text-slate-600 hover:bg-white/50 hover:text-fairway'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                {user?.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-gold/15 text-gold-dark shadow-sm'
                          : 'text-slate-600 hover:bg-white/50 hover:text-gold-dark'
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                )}
                <span className="mx-2 hidden max-w-[10rem] truncate text-xs text-slate-500 lg:inline">
                  {user?.email}
                </span>
                <button type="button" onClick={logout} className="btn-ghost">
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn-ghost">
                  Log in
                </NavLink>
                <NavLink to="/register" className="btn-primary !py-2 !px-5 text-xs sm:text-sm">
                  Join the club
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile compact */}
          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated ? (
              <button type="button" onClick={logout} className="btn-ghost text-xs">
                Out
              </button>
            ) : (
              <NavLink to="/register" className="btn-primary !py-2 !px-4 text-xs">
                Join
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? false : { opacity: 0, y: -14 }}
          transition={{ duration: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <footer className="mt-auto border-t border-white/40 bg-white/40 py-8 backdrop-blur-md">
        <div className="page-shell flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-slate-600">
            Supporting charities through the game{' '}
            <span className="font-medium text-fairway">we love</span>.
          </p>
          <p className="text-xs text-slate-400">Fair draws · Last-five scoring · Transparent giving</p>
        </div>
      </footer>
    </div>
  );
}
