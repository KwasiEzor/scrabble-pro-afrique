import { motion } from 'framer-motion';

const tileValues: Record<string, number> = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8,
  K: 10, L: 1, M: 2, N: 1, O: 1, P: 3, Q: 8, R: 1, S: 1, T: 1,
  U: 1, V: 4, W: 10, X: 10, Y: 10, Z: 10
};

export default function ScrabbleTile({ letter, delay = 0, size = 'md' }: { letter: string; delay?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-3xl'
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0, rotateX: 45 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      className={`${sizeClasses[size]} relative flex items-center justify-center rounded-md bg-gradient-to-br from-bg-ivory to-bg-ivory-dark text-bg-primary font-bold font-[var(--font-display)] shadow-lg cursor-default select-none`}
      whileHover={{ scale: 1.1, rotate: [-2, 2, 0], transition: { duration: 0.3 } }}
    >
      {letter.toUpperCase()}
      <span className="absolute bottom-0.5 right-1 text-[8px] font-mono font-semibold text-text-muted">
        {tileValues[letter.toUpperCase()] || ''}
      </span>
    </motion.div>
  );
}
