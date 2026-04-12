import { motion } from 'framer-motion';

interface SectionTitleProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionTitle({ overline, title, subtitle, align = 'left', light = false }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-10 ${align === 'center' ? 'text-center' : ''}`}
    >
      {overline && (
        <div className="flex items-center gap-3 mb-3" style={align === 'center' ? { justifyContent: 'center' } : {}}>
          <div className="w-8 h-px bg-gradient-to-r from-emerald to-gold" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-light">{overline}</span>
          <div className="w-8 h-px bg-gradient-to-r from-gold to-emerald" />
        </div>
      )}
      <h2 className={`font-[var(--font-display)] font-bold leading-tight ${
        light ? 'text-bg-primary' : 'text-text-primary'
      } text-2xl sm:text-3xl lg:text-4xl`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base max-w-2xl leading-relaxed ${
          light ? 'text-bg-primary/70' : 'text-text-secondary'
        } ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
