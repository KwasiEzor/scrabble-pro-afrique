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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
    >
      {overline && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 mb-4" 
          style={align === 'center' ? { justifyContent: 'center' } : {}}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/80 bg-gold/10 px-2 py-0.5 rounded-sm">{overline}</span>
        </motion.div>
      )}
      <div className={`relative inline-block ${align === 'center' ? 'mx-auto' : ''}`}>
        <h2 className={`font-[var(--font-display)] font-bold leading-tight relative z-10 ${
          light ? 'text-bg-primary' : 'text-text-primary'
        } text-3xl sm:text-4xl lg:text-5xl`}>
          {title}
        </h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '40%' }}
          transition={{ delay: 0.4, duration: 1, ease: "circOut" }}
          className="h-1 bg-gradient-to-r from-emerald to-transparent mt-2 rounded-full"
          style={align === 'center' ? { margin: '8px auto 0' } : {}}
        />
      </div>
      {subtitle && (
        <p className={`mt-6 text-lg max-w-2xl leading-relaxed font-light ${
          light ? 'text-bg-primary/70' : 'text-text-secondary'
        } ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
