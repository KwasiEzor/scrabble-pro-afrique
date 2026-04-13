import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight, Globe } from 'lucide-react';
import type { Article } from '../lib/data';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

export default function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.1 }
    }
  };

  if (variant === 'featured') {
    return (
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="relative group h-full"
      >
        <Link to={`/actualites/${article.slug}`} className="block h-full relative overflow-hidden rounded-[2.5rem] bg-[#121212] border border-white/5 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-emerald text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald/20">
                {article.category}
              </span>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] text-white/80 font-bold uppercase tracking-widest">
                <Globe size={12} className="text-gold" />
                {article.country}
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-white leading-[1.1] mb-6 group-hover:text-gold transition-colors duration-500">
              {article.title}
            </h3>

            <p className="text-lg text-white/60 font-light line-clamp-2 max-w-2xl mb-8 group-hover:text-white/80 transition-colors">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={article.authorImage} alt={article.author} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-emerald/40 transition-all shadow-xl" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald border-2 border-bg-primary" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-wide">{article.author}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-0.5">Rédacteur en chef</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] text-white/50 font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                  <Clock size={14} className="text-gold" />
                  {article.readTime} de lecture
                </div>
                <div className="w-12 h-12 rounded-full bg-white text-bg-primary flex items-center justify-center shadow-2xl transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.1 } }
        }}
        className="group"
      >
        <Link to={`/actualites/${article.slug}`} className="flex gap-6 items-center p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl group-hover:scale-95 transition-transform duration-500">
            <img src={article.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-emerald-light font-black uppercase tracking-widest">{article.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[10px] text-white/40 font-bold">{article.country}</span>
            </div>
            <h4 className="text-base font-bold text-text-primary line-clamp-2 leading-snug group-hover:text-gold transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center gap-3 mt-3 text-[10px] text-text-muted font-bold uppercase tracking-tighter">
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-gold" />
                {article.readTime}
              </div>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="group h-full"
    >
      <Link to={`/actualites/${article.slug}`} className="flex flex-col h-full bg-[#161616] rounded-[2rem] overflow-hidden border border-white/5 hover:border-emerald/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-4">
            <span className="px-4 py-1.5 rounded-xl bg-bg-primary/80 backdrop-blur-xl text-emerald-light text-[10px] font-black uppercase tracking-widest border border-white/5 shadow-2xl">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-7 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-[10px] text-text-muted font-black uppercase tracking-widest mb-4">
            <span className="text-gold">{article.country}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <h3 className="font-[var(--font-display)] font-bold text-xl text-text-primary line-clamp-2 mb-4 group-hover:text-gold transition-colors leading-tight">
            {article.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-3 mb-6 font-light leading-relaxed flex-1 italic opacity-80 group-hover:opacity-100 transition-opacity">
            "{article.excerpt}"
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-emerald/40 transition-all" />
              <span className="text-[11px] text-text-muted font-bold tracking-wide">{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Clock size={12} className="text-gold" />
              {article.readTime}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
