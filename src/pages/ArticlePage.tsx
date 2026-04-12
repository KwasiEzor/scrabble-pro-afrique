import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Bookmark } from 'lucide-react';
import { articles } from '../lib/data';
import ArticleCard from '../components/ArticleCard';

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);
  const related = articles.filter(a => a.id !== id && a.category === article?.category).slice(0, 3);

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Article non trouv\u00e9</h1>
        <Link to="/actualites" className="text-emerald-light mt-4 inline-block">Retour aux actualit\u00e9s</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/actualites" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-emerald-light transition-colors mb-6">
            <ArrowLeft size={16} /> Retour aux actualit\u00e9s
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald/20 text-emerald-light text-xs font-semibold">{article.category}</span>
            <span className="text-xs text-text-muted">{article.country}</span>
          </div>

          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-8 border-b border-border-subtle">
            <div className="flex items-center gap-4">
              <img src={article.authorImage} alt={article.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-sm font-medium text-text-primary">{article.author}</div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-muted hover:text-emerald-light hover:border-emerald/30 transition-all">
                <Share2 size={16} />
              </button>
              <button className="p-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-muted hover:text-gold hover:border-gold/30 transition-all">
                <Bookmark size={16} />
              </button>
            </div>
          </div>

          {/* Article body */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-text-secondary leading-relaxed mb-6">{article.excerpt}</p>
            <p className="text-text-secondary leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <blockquote className="border-l-4 border-emerald pl-6 py-2 my-8">
              <p className="text-lg italic text-text-primary font-[var(--font-display)]">
                \u00ab Le Scrabble francophone africain est en pleine renaissance. Nous assistons \u00e0 l'\u00e9mergence d'une nouvelle g\u00e9n\u00e9ration de champions. \u00bb
              </p>
            </blockquote>
            <p className="text-text-secondary leading-relaxed mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </motion.div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-border-subtle">
            <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary mb-6">Articles li\u00e9s</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
