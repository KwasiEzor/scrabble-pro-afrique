import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Globe, Newspaper, Star, Zap, BookOpen, Mail } from 'lucide-react';
import ScrabbleTile from '../components/ScrabbleTile';
import SectionTitle from '../components/SectionTitle';
import ArticleCard from '../components/ArticleCard';
import CompetitionCard from '../components/CompetitionCard';
import { articles as staticArticles, players as staticPlayers, competitions as staticCompetitions, countries as staticCountries } from '../lib/data';
import type { Article, Player, Competition, Country } from '../lib/data';
import { loadHomeContent } from '../lib/siteContent';
import SEO from '../components/SEO';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>(staticArticles.filter(a => a.featured));
  const [otherArticles, setOtherArticles] = useState<Article[]>(staticArticles.filter(a => !a.featured).slice(0, 3));
  const [upcomingComps, setUpcomingComps] = useState<Competition[]>(staticCompetitions.filter(c => c.status !== 'completed').slice(0, 3));
  const [featuredPlayer, setFeaturedPlayer] = useState<Player | null>(staticPlayers.find(p => p.featured) || staticPlayers[0]);
  const [topCountries, setTopCountries] = useState<Country[]>(staticCountries.slice(0, 6));

  useEffect(() => {
    async function loadHomeData() {
      const { articles, competitions, players, countries } = await loadHomeContent();
      setFeaturedArticles(articles.filter(a => a.featured));
      setOtherArticles(articles.filter(a => !a.featured).slice(0, 3));
      setUpcomingComps(competitions.slice(0, 3));
      setFeaturedPlayer(players.find(p => p.featured) || players[0] || null);
      setTopCountries(countries.slice(0, 6));
    }
    loadHomeData();
  }, []);

  const heroLetters = 'SCRABBLE';

  return (
    <div className="relative bg-bg-primary">
      <SEO 
        title="Le portail du Scrabble francophone en Afrique" 
        description="Actualités, compétitions, portraits de champions et ressources. La plateforme qui fédère et valorise la communauté des scrabbleurs africains." 
      />
      
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/images/hero-scrabble.jpg" alt="Scrabble Competition" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/95 to-bg-primary" />
          <div className="absolute inset-0 scrabble-pattern" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Scrabble tiles title */}
            <motion.div
              className="flex flex-wrap gap-1.5 sm:gap-2 mb-8"
              initial="hidden"
              animate="visible"
            >
              {heroLetters.split('').map((letter, i) => (
                <ScrabbleTile key={i} letter={letter} delay={i * 0.08} size="lg" />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-gradient-to-r from-emerald to-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-light font-semibold">Afrique Francophone</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[var(--font-display)] font-bold leading-[1.1] mb-6"
            >
              Le portail du Scrabble{' '}
              <span className="gradient-text-emerald">francophone</span>{' '}
              en <span className="gradient-text-gold">Afrique</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-lg sm:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed font-light"
            >
              Actualités, compétitions, portraits de champions et ressources. 
              La plateforme qui fédère et valorise la communauté des scrabbleurs africains.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/actualites"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold hover:shadow-xl hover:shadow-emerald/20 transition-all hover:-translate-y-1"
              >
                <Newspaper size={18} />
                Voir l'actualité
              </Link>
              <Link
                to="/competitions"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-bg-card border border-border-subtle text-text-primary font-semibold hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10 transition-all hover:-translate-y-1"
              >
                <Trophy size={18} className="text-gold" />
                Explorer les compétitions
              </Link>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { icon: Globe, label: 'Pays représentés', value: '24', color: 'text-emerald-light' },
              { icon: Users, label: 'Joueurs actifs', value: '4 200+', color: 'text-gold' },
              { icon: Trophy, label: 'Tournois / an', value: '150+', color: 'text-bordeaux-light' },
              { icon: Star, label: 'Clubs affiliés', value: '280+', color: 'text-emerald-light' },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.1 }}
                className="glass rounded-2xl p-6 text-center border-white/5 hover:border-white/10 transition-colors"
              >
                <Icon size={24} className={`${color} mx-auto mb-3`} />
                <div className={`text-3xl font-bold font-mono ${color}`}>{value}</div>
                <div className="text-xs text-text-muted mt-2 uppercase tracking-wider font-semibold">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== ACTUALITÉS ==================== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle
              overline="Actualités"
              title="À la une"
              subtitle="Les dernières nouvelles du Scrabble francophone africain"
            />
            <Link to="/actualites" className="hidden sm:inline-flex items-center gap-2 text-sm text-emerald-light hover:text-gold transition-colors font-semibold group">
              Toutes les actualités <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {featuredArticles[0] && <ArticleCard article={featuredArticles[0]} variant="featured" />}
            </div>
            <div className="space-y-6">
              {otherArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} variant="compact" index={i} />
              ))}
              <Link to="/actualites" className="sm:hidden inline-flex items-center gap-2 text-sm text-emerald-light hover:text-gold transition-colors font-medium mt-4">
                Toutes les actualités <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMPÉTITIONS ==================== */}
      <section className="py-24 lg:py-32 bg-bg-secondary/30 relative">
        <div className="absolute inset-0 scrabble-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle
              overline="Compétitions"
              title="Prochains tournois"
              subtitle="Ne manquez aucun événement du circuit africain"
            />
            <Link to="/competitions" className="hidden sm:inline-flex items-center gap-2 text-sm text-gold hover:text-emerald-light transition-colors font-semibold group">
              Voir tout le calendrier <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingComps.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== JOUEUR À L'HONNEUR ==================== */}
      {featuredPlayer && (
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/10 via-bg-primary to-bg-primary" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              overline="À l'honneur"
              title="Joueur du mois"
              align="center"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto mt-12"
            >
              <div className="glass rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden group">
                    <img 
                      src={featuredPlayer.image} 
                      alt={featuredPlayer.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-primary/40 hidden md:block" />
                    <div className="absolute top-6 left-6">
                      <div className="w-16 h-16 rounded-2xl bg-gold text-bg-primary flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                        <Trophy size={32} />
                      </div>
                    </div>
                  </div>
                  <div className="p-10 lg:p-14 flex flex-col justify-center relative bg-white/[0.02]">
                    <div className="text-4xl mb-4 transform hover:scale-110 transition-transform inline-block w-fit cursor-default">{featuredPlayer.countryFlag}</div>
                    <h3 className="font-[var(--font-display)] text-4xl lg:text-5xl font-bold text-text-primary mb-2">
                      {featuredPlayer.name}
                    </h3>
                    <p className="text-emerald-light font-semibold text-lg mb-6 uppercase tracking-wider">{featuredPlayer.country} · #{featuredPlayer.ranking} mondial</p>
                    <p className="text-text-secondary leading-relaxed mb-8 text-lg font-light italic">"{featuredPlayer.bio}"</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                        <div className="text-3xl font-bold font-mono text-emerald-light">{featuredPlayer.rating}</div>
                        <div className="text-xs text-text-muted mt-2 uppercase tracking-widest font-bold">Rating ELO</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                        <div className="text-3xl font-bold font-mono text-gold">{featuredPlayer.titles.length}</div>
                        <div className="text-xs text-text-muted mt-2 uppercase tracking-widest font-bold">Titres majeurs</div>
                      </div>
                    </div>
                    
                    <Link
                      to={`/joueurs/${featuredPlayer.slug}`}
                      className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-bold text-lg transition-all group w-fit"
                    >
                      Profil complet <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ==================== PAYS ==================== */}
      <section className="py-24 lg:py-32 bg-bg-secondary/50 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle
              overline="Géographie"
              title="Le Scrabble par pays"
              subtitle="Découvrez l'écosystème du Scrabble dans chaque nation"
            />
            <Link to="/pays" className="hidden sm:inline-flex items-center gap-2 text-sm text-emerald-light hover:text-gold transition-colors font-semibold group">
              Toutes les nations <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCountries.map((country, i) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/pays/${country.slug}`}
                  className="group block relative overflow-hidden rounded-[2rem] aspect-[16/11] border border-white/5 hover:border-emerald/30 transition-all shadow-xl"
                >
                  <img 
                    src={country.image} 
                    alt={`Scrabble en ${country.name}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl filter drop-shadow-md">{country.flag}</span>
                      <h3 className="font-[var(--font-display)] font-bold text-2xl text-white group-hover:text-gold transition-colors">
                        {country.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-white/60 font-medium tracking-wide">
                      <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald" /> {country.clubs} clubs</span>
                      <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold" /> {country.players} joueurs</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== APPRENDRE ==================== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-bg-primary via-bg-primary to-emerald-dark/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            overline="Formation"
            title="Apprenez et progressez"
            subtitle="Ressources pour débutants et joueurs confirmés"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { icon: BookOpen, title: 'Règles du jeu', desc: 'Maîtrisez les règles officielles du Scrabble francophone', color: 'emerald' },
              { icon: Zap, title: 'Stratégies avancées', desc: 'Techniques de champions pour maximiser vos scores', color: 'gold' },
              { icon: Users, title: 'Trouver un club', desc: 'Rejoignez un club près de chez vous et jouez régulièrement', color: 'bordeaux' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link to="/apprendre" className="group block glass rounded-3xl p-10 hover:border-emerald/40 transition-all h-full hover:shadow-2xl hover:shadow-emerald/10 relative overflow-hidden">
                  <div className={`absolute -right-8 -top-8 w-24 h-24 blur-3xl opacity-20 transition-opacity group-hover:opacity-40 ${
                    color === 'emerald' ? 'bg-emerald' : color === 'gold' ? 'bg-gold' : 'bg-bordeaux'
                  }`} />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner ${
                    color === 'emerald' ? 'bg-emerald/10 text-emerald-light' :
                    color === 'gold' ? 'bg-gold/10 text-gold' :
                    'bg-bordeaux/10 text-bordeaux-light'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-[var(--font-display)] font-bold text-2xl text-text-primary mb-4 group-hover:text-gold transition-colors">{title}</h3>
                  <p className="text-text-secondary leading-relaxed font-light">{desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="py-24 lg:py-32 bg-bg-secondary/40 relative overflow-hidden">
        <div className="absolute inset-0 scrabble-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center gap-2 mb-10">
              {['N', 'E', 'W', 'S'].map((l, i) => (
                <ScrabbleTile key={i} letter={l} delay={i * 0.1} size="md" />
              ))}
            </div>
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Restez informé
            </h2>
            <p className="text-text-secondary text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Recevez chaque semaine les actualités exclusives, les résultats en direct et le calendrier des événements du Scrabble francophone africain.
            </p>
            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-8 inline-flex items-center gap-4 text-emerald-light border-emerald/30"
              >
                <div className="w-12 h-12 rounded-full bg-emerald/20 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">Bienvenue !</div>
                  <div className="text-sm opacity-80 font-medium">Vous êtes maintenant inscrit à notre newsletter.</div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-5 rounded-2xl bg-bg-card border border-white/5 text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-bold hover:shadow-2xl hover:shadow-emerald/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95"
                >
                  <Mail size={20} />
                  Rejoindre
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
