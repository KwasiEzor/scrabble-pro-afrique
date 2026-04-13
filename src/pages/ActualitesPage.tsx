import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ArticleCard from '../components/ArticleCard';
import { articleService } from '../lib/services';
import { articles as staticArticles, categories, countryFilters, type Article } from '../lib/data';
import SEO from '../components/SEO';

export default function ActualitesPage() {
  const [articles, setArticles] = useState<Article[]>(staticArticles);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeCountry, setActiveCountry] = useState('Tous');

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await articleService.getAll().catch(() => null);
        if (data && data.length > 0) {
          setArticles(data);
        }
      } catch (error) {
        console.error("Error loading articles from Supabase:", error);
      }
    }
    loadArticles();
  }, []);

  const filtered = articles.filter(a => {
    const catMatch = activeCategory === 'Tous' || a.category === activeCategory;
    const countryMatch = activeCountry === 'Tous' || a.country === activeCountry;
    return catMatch && countryMatch;
  });

  return (
    <div className="pt-24 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title="Actualités" 
        description="Suivez toute l'actualité du Scrabble francophone en Afrique : tournois, portraits, stratégies et événements." 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Média"
          title="Actualités"
          subtitle="Toute l'actualité du Scrabble francophone en Afrique"
        />

        {/* Filters */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-muted mr-4 self-center">Par Catégorie</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${
                  activeCategory === cat
                    ? 'bg-emerald text-white shadow-lg shadow-emerald/20 border border-emerald'
                    : 'bg-white/5 text-text-secondary border border-white/5 hover:border-emerald/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-muted mr-4 self-center">Par Pays</span>
            {countryFilters.map(c => (
              <button
                key={c}
                onClick={() => setActiveCountry(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${
                  activeCountry === c
                    ? 'bg-gold text-bg-primary shadow-lg shadow-gold/20 border border-gold'
                    : 'bg-white/5 text-text-secondary border border-white/5 hover:border-gold/30 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
            <p className="text-text-muted text-lg font-light italic">Aucun article trouvé pour ces filtres.</p>
            <button 
              onClick={() => { setActiveCategory('Tous'); setActiveCountry('Tous'); }}
              className="mt-6 text-emerald-light font-bold uppercase tracking-widest text-xs hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
