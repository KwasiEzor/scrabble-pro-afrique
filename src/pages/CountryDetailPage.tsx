import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Building2, Trophy } from 'lucide-react';
import { countries, players, articles, competitions } from '../lib/data';
import PlayerCard from '../components/PlayerCard';
import ArticleCard from '../components/ArticleCard';

export default function CountryDetailPage() {
  const { id } = useParams();
  const country = countries.find(c => c.id === id);

  if (!country) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Pays non trouv\u00e9</h1>
        <Link to="/pays" className="text-emerald-light mt-4 inline-block">Retour</Link>
      </div>
    );
  }

  const countryPlayers = players.filter(p => p.country === country.name);
  const countryArticles = articles.filter(a => a.country === country.name).slice(0, 3);

  return (
    <div className="pt-20 pb-20">
      <div className="relative h-[40vh] overflow-hidden">
        <img src={country.image} alt={country.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/pays" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-emerald-light transition-colors mb-6">
            <ArrowLeft size={16} /> Retour aux pays
          </Link>

          <div className="glass rounded-2xl p-8 lg:p-10 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{country.flag}</span>
              <div>
                <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-text-primary">{country.name}</h1>
                <p className="text-emerald-light font-medium">{country.federation}</p>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed mb-8">{country.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-bg-tertiary rounded-xl p-5 text-center">
                <Building2 size={20} className="text-emerald-light mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono text-emerald-light">{country.clubs}</div>
                <div className="text-xs text-text-muted mt-1">Clubs</div>
              </div>
              <div className="bg-bg-tertiary rounded-xl p-5 text-center">
                <Users size={20} className="text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono text-gold">{country.players}</div>
                <div className="text-xs text-text-muted mt-1">Joueurs</div>
              </div>
              <div className="bg-bg-tertiary rounded-xl p-5 text-center col-span-2 sm:col-span-1">
                <Trophy size={20} className="text-bordeaux-light mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono text-bordeaux-light">{countryPlayers.length}</div>
                <div className="text-xs text-text-muted mt-1">Top joueurs</div>
              </div>
            </div>
          </div>

          {countryPlayers.length > 0 && (
            <div className="mb-12">
              <h2 className="font-[var(--font-display)] text-2xl font-bold text-text-primary mb-6">Joueurs marquants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {countryPlayers.map((p, i) => (
                  <PlayerCard key={p.id} player={p} index={i} />
                ))}
              </div>
            </div>
          )}

          {countryArticles.length > 0 && (
            <div>
              <h2 className="font-[var(--font-display)] text-2xl font-bold text-text-primary mb-6">Actualit\u00e9s</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {countryArticles.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
