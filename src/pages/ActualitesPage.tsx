import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ArticleCard from '../components/ArticleCard';
import { articles, categories, countryFilters } from '../lib/data';

export default function ActualitesPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeCountry, setActiveCountry] = useState('Tous');

  const filtered = articles.filter(a => {
    const catMatch = activeCategory === 'Tous' || a.category === activeCategory;
    const countryMatch = activeCountry === 'Tous' || a.country === activeCountry;
    return catMatch && countryMatch;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="M\u00e9dia"
          title="Actualit\u00e9s"
          subtitle="Toute l'actualit\u00e9 du Scrabble francophone en Afrique"
        />

        {/* Filters */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wider text-text-muted mr-2 self-center">Cat\u00e9gorie :</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald/20 text-emerald-light border border-emerald/30'
                    : 'bg-bg-card text-text-secondary border border-border-subtle hover:border-emerald/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wider text-text-muted mr-2 self-center">Pays :</span>
            {countryFilters.map(c => (
              <button
                key={c}
                onClick={() => setActiveCountry(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCountry === c
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'bg-bg-card text-text-secondary border border-border-subtle hover:border-gold/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">Aucun article trouv\u00e9 pour ces filtres.</p>
          </div>
        )}
      </div>
    </div>
  );
}
