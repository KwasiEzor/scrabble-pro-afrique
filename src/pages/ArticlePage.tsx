import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Bookmark, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { articles as staticArticles } from '../lib/data';
import type { Article } from '../lib/data';
import { getSafeArticleParagraphs, loadArticleBySlug, loadArticles } from '../lib/siteContent';
import SEO from '../components/SEO';

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(staticArticles.find(a => a.slug === slug) || null);
  const [related, setRelated] = useState<Article[]>(staticArticles.filter(a => a.slug !== slug && a.category === article?.category));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const data = await loadArticleBySlug(slug);

      if (data) {
        setArticle(data);

        const allArticles = await loadArticles();
        const filtered = allArticles.filter(a => a.slug !== slug && a.category === data.category);
        setRelated(filtered.length > 0 ? filtered : staticArticles.filter(a => a.slug !== slug && a.category === data.category));
      }
    }

    loadData();
  }, [slug]);

  const nextArticle = () => {
    setCurrentIndex((prev) => (prev + 1) % related.length);
  };

  const prevArticle = () => {
    setCurrentIndex((prev) => (prev - 1 + related.length) % related.length);
  };

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center bg-bg-primary min-h-screen">
        <h1 className="text-2xl font-bold text-text-primary">Article non trouvé</h1>
        <Link to="/actualites" className="text-emerald-light mt-4 inline-block">Retour aux actualités</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title={article.title} 
        description={article.excerpt} 
        image={article.image}
        type="article"
      />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[75vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="px-4 py-1.5 rounded-full bg-emerald text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald/20">
                {article.category}
              </span>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                {article.country}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-[var(--font-display)] text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8"
            >
              {article.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between py-8 border-b border-white/5 mb-12"
        >
          <div className="flex items-center gap-4">
            <img src={article.authorImage} alt={article.author} className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-xl" />
            <div>
              <div className="text-sm font-bold text-white tracking-wide">{article.author}</div>
              <div className="flex items-center gap-3 text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">
                <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className="flex items-center gap-1"><Clock size={12} className="text-gold" /> {article.readTime}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-emerald-light hover:border-emerald/30 transition-all">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 transition-all">
              <Bookmark size={18} />
            </button>
          </div>
        </motion.div>

        {/* Article content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose prose-invert max-w-none prose-lg prose-p:text-white/70 prose-p:leading-relaxed prose-blockquote:border-emerald prose-blockquote:bg-emerald/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-2xl"
        >
          <p className="text-2xl text-white font-light leading-relaxed mb-10 italic border-l-2 border-gold pl-8">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-12">
            {article.tags.map(tag => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/5 text-white/40 rounded-lg border border-white/5 hover:border-white/20 hover:text-white transition-all cursor-default">
                #{tag}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            {getSafeArticleParagraphs(article.content).map((paragraph) => (
              <p key={paragraph} className="text-white/70 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
          <Link to="/actualites" className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald/20 group-hover:text-emerald-light transition-all">
              <ArrowLeft size={16} />
            </div>
            Toutes les actualités
          </Link>
        </div>
      </div>

      {/* Cinematic Spotlight Carousel */}
      {related.length > 0 && (
        <section className="mt-32 relative overflow-hidden py-20">
          {/* Animated Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald/5 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-3">À découvrir ensuite</h2>
                <h3 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white tracking-tight">Spotlight Editorial</h3>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={prevArticle}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-gold/50 transition-all active:scale-95"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextArticle}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-gold/50 transition-all active:scale-95"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="relative min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={related[currentIndex]?.id || 'empty'}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden bg-[#111] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] group"
                >
                  <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img 
                      src={related[currentIndex]?.image} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
                  </div>
                  
                  <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-light">{related[currentIndex]?.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{related[currentIndex]?.country}</span>
                    </div>
                    
                    <h4 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                      {related[currentIndex]?.title}
                    </h4>
                    
                    <p className="text-white/50 font-light leading-relaxed mb-10 line-clamp-3 italic">
                      "{related[currentIndex]?.excerpt}"
                    </p>
                    
                    <Link 
                      to={`/actualites/${related[currentIndex]?.slug}`}
                      className="group/btn inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white transition-all"
                    >
                      <span className="relative">
                        Continuer la lecture
                        <span className="absolute -bottom-2 left-0 w-full h-px bg-gold transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white text-bg-primary flex items-center justify-center group-hover/btn:bg-gold transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </Link>
                  </div>

                  {/* Progressive indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                    <motion.div 
                      key={currentIndex}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                      className="h-full bg-gold/50"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {related.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    currentIndex === idx ? 'w-8 bg-gold' : 'w-2 bg-white/10 hover:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
