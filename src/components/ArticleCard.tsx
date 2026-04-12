import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { Article } from '../lib/data';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

export default function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Link to={`/actualites/${article.id}`} className="group block">
          <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald/20 text-emerald-light text-xs font-semibold backdrop-blur-sm">
                  {article.category}
                </span>
                <span className="text-xs text-white/60">{article.country}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-[var(--font-display)] font-bold text-white leading-tight mb-3 group-hover:text-gold transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-white/70 line-clamp-2 max-w-lg mb-4">{article.excerpt}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={article.authorImage} alt={article.author} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs text-white/80">{article.author}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <Clock size={12} />
                  {article.readTime}
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
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Link to={`/actualites/${article.id}`} className="group flex gap-4 items-start">
          <img src={article.image} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-emerald-light font-medium">{article.category}</span>
            <h4 className="text-sm font-semibold text-text-primary line-clamp-2 mt-1 group-hover:text-gold transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
              <Clock size={11} />
              {article.readTime}
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/actualites/${article.id}`} className="group block bg-bg-card rounded-2xl overflow-hidden border border-border-subtle hover:border-emerald/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald/5">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-emerald-light text-xs font-semibold">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
            <span>{article.country}</span>
            <span>·</span>
            <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <h3 className="font-[var(--font-display)] font-bold text-lg text-text-primary line-clamp-2 mb-2 group-hover:text-gold transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={article.authorImage} alt={article.author} className="w-6 h-6 rounded-full object-cover" />
              <span className="text-xs text-text-muted">{article.author}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <Clock size={11} />
              {article.readTime}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
