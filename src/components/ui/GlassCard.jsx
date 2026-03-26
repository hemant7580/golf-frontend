import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

export function GlassCard({ children, className = '', delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl border border-white/40 bg-white/75 backdrop-blur-xl shadow-glass ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
