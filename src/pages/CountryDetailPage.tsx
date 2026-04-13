import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Building2, Trophy, Globe } from 'lucide-react';
import { countries as staticCountries, players as staticPlayers, articles as staticArticles } from '../lib/data';
import type { Country, Player, Article } from '../lib/data';
import { loadCountryBySlug } from '../lib/siteContent';
import PlayerCard from '../components/PlayerCard';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';

export default function CountryDetailPage() {
  const { slug } = useParams();
  const [country, setCountry] = useState<Country | null>(staticCountries.find(c => c.slug === slug) || null);
  const [countryPlayers, setCountryPlayers] = useState<Player[]>(staticPlayers.filter(p => p.country === country?.name));
  const [countryArticles, setCountryArticles] = useState<Article[]>(staticArticles.filter(a => a.country === country?.name).slice(0, 3));

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const data = await loadCountryBySlug(slug);

      if (data) {
        setCountry(data);
        setCountryPlayers(staticPlayers.filter(p => p.country === data.name));
        setCountryArticles(staticArticles.filter(a => a.country === data.name).slice(0, 3));
      }
    }

    loadData();
  }, [slug]);

  if (!country) {
    return (
      <div className="pt-32 pb-20 text-center bg-bg-primary min-h-screen">
        <h1 className="text-2xl font-bold text-text-primary">Pays non trouvé</h1>
        <Link to="/pays" className="text-emerald-light mt-4 inline-block">Retour</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title={`${country.name} - Scrabble National`} 
        description={`Découvrez l'écosystème du Scrabble en ${country.name}. ${country.federation}, ${country.clubs} clubs et ${country.players} joueurs actifs.`} 
        image={country.image}
      />
      
      <div className="relative h-[45vh] sm:h-[55vh] overflow-hidden">
        <img src={country.image} alt={country.name} className="w-full h-full object-cover grayscale opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/pays" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors mb-8 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft size={16} /> Fédérations Nationales
          </Link>

          <div className="glass rounded-[3rem] p-8 lg:p-14 border-white/5 shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald/10 blur-[100px] rounded-full" />
            
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
              <div className="text-7xl sm:text-8xl filter drop-shadow-2xl">{country.flag}</div>
              <div>
                <h1 className="font-[var(--font-display)] text-4xl sm:text-6xl font-black text-white tracking-tighter mb-2 italic">
                  {country.name}
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald/10 border border-emerald/20 text-emerald-light text-[10px] font-black uppercase tracking-[0.2em]">
                  <Globe size={12} />
                  {country.federation}
                </div>
              </div>
            </div>

            <p className="text-xl text-text-secondary leading-relaxed mb-12 font-light max-w-4xl italic">
              "{country.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5 transition-all hover:bg-white/[0.08] group">
                <Building2 size={28} className="text-emerald-light mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-black font-mono text-white mb-1 tabular-nums">{country.clubs}</div>
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Clubs Affiliés</div>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5 transition-all hover:bg-white/[0.08] group">
                <Users size={28} className="text-gold mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-black font-mono text-white mb-1 tabular-nums">{country.players}</div>
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Joueurs Licenciés</div>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5 transition-all hover:bg-white/[0.08] group">
                <Trophy size={28} className="text-bordeaux-light mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-black font-mono text-white mb-1 tabular-nums">{countryPlayers.length}</div>
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Membres du Top 100</div>
              </div>
            </div>
          </div>

          {countryPlayers.length > 0 && (
            <div className="mb-20">
              <h2 className="font-[var(--font-display)] text-3xl font-bold text-white mb-10 flex items-center gap-4 tracking-tight">
                <div className="w-12 h-px bg-emerald" />
                Champions Nationaux
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {countryPlayers.map((p, i) => (
                  <PlayerCard key={p.id} player={p} index={i} />
                ))}
              </div>
            </div>
          )}

          {countryArticles.length > 0 && (
            <div>
              <h2 className="font-[var(--font-display)] text-3xl font-bold text-white mb-10 flex items-center gap-4 tracking-tight">
                <div className="w-12 h-px bg-gold" />
                Dernières Actualités
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
