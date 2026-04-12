import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Trophy, Users, Globe, Calendar, Newspaper, ChevronRight, Mail, Star, Zap, BookOpen } from 'lucide-react';
import ScrabbleTile from '../components/ScrabbleTile';
import SectionTitle from '../components/SectionTitle';
import ArticleCard from '../components/ArticleCard';
import CompetitionCard from '../components/CompetitionCard';
import PlayerCard from '../components/PlayerCard';
import { articles, players, competitions, countries } from '../lib/data';
import { useAppStore } from '../lib/store';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const featuredArticles = articles.filter(a => a.featured);
  const otherArticles = articles.filter(a => !a.featured).slice(0, 3);
  const upcomingComps = competitions.filter(c => c.status !== 'completed').slice(0, 3);
  const featuredPlayer = players.find(p => p.featured);

  const heroLetters = 'SCRABBLE';

  return (
    <div className="relative">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/images/hero-scrabble.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/95 to-bg-primary" />
          <div className="absolute inset-0 scrabble-pattern" />
        </div>

        {/* Floating tiles decoration */}
        <div className="absolute top-32 right-10 lg:right-32 opacity-20 hidden md:block float-animation">
          <div className="flex gap-1">
            {['M', 'O', 'T'].map((l, i) => (
              <div key={i} className="w-10 h-10 rounded bg-emerald/30 flex items-center justify-center text-emerald-light font-bold font-[var(--font-display)]">{l}</div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-40 left-10 lg:left-20 opacity-15 hidden md:block float-animation" style={{ animationDelay: '2s' }}>
          <div className="flex gap-1">
            {['J', 'E', 'U'].map((l, i) => (
              <div key={i} className="w-8 h-8 rounded bg-gold/30 flex items-center justify-center text-gold font-bold font-[var(--font-display)] text-sm">{l}</div>
            ))}
          </div>
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-display)] font-bold leading-[1.1] mb-6"
            >
              Le portail du Scrabble{' '}
              <span className="gradient-text-emerald">francophone</span>{' '}
              en <span className="gradient-text-gold">Afrique</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-lg sm:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed"
            >
              Actualit\u00e9s, comp\u00e9titions, portraits de champions et ressources. 
              La plateforme qui f\u00e9d\u00e8re et valorise la communaut\u00e9 des scrabbleurs africains.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/actualites"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold hover:shadow-lg hover:shadow-emerald/25 transition-all hover:-translate-y-0.5"
              >
                <Newspaper size={18} />
                Voir l'actualit\u00e9
              </Link>
              <Link
                to="/competitions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary font-semibold hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 transition-all hover:-translate-y-0.5"
              >
                <Trophy size={18} className="text-gold" />
                Explorer les comp\u00e9titions
              </Link>
              <Link
                to="/communaute"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bordeaux/20 border border-bordeaux/30 text-bordeaux-light font-semibold hover:bg-bordeaux/30 transition-all hover:-translate-y-0.5"
              >
                <Users size={18} />
                Rejoindre la communaut\u00e9
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
              { icon: Globe, label: 'Pays repr\u00e9sent\u00e9s', value: '24', color: 'text-emerald-light' },
              { icon: Users, label: 'Joueurs actifs', value: '4 200+', color: 'text-gold' },
              { icon: Trophy, label: 'Tournois / an', value: '150+', color: 'text-bordeaux-light' },
              { icon: Star, label: 'Clubs affili\u00e9s', value: '280+', color: 'text-emerald-light' },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.1 }}
                className="glass rounded-xl p-5 text-center"
              >
                <Icon size={22} className={`${color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
                <div className="text-xs text-text-muted mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== ACTUALIT\u00c9S ==================== */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle
              overline="Actualit\u00e9s"
              title="\u00c0 la une"
              subtitle="Les derni\u00e8res nouvelles du Scrabble francophone africain"
            />
            <Link to="/actualites" className="hidden sm:inline-flex items-center gap-2 text-sm text-emerald-light hover:text-gold transition-colors font-medium">
              Toutes les actualit\u00e9s <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {featuredArticles[0] && <ArticleCard article={featuredArticles[0]} variant="featured" />}
            </div>
            <div className="space-y-5">
              {otherArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} variant="compact" index={i} />
              ))}
              <Link to="/actualites" className="sm:hidden inline-flex items-center gap-2 text-sm text-emerald-light hover:text-gold transition-colors font-medium mt-4">
                Toutes les actualit\u00e9s <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMP\u00c9TITIONS ==================== */}
      <section className="py-20 lg:py-28 bg-bg-secondary relative">
        <div className="absolute inset-0 scrabble-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle
              overline="Comp\u00e9titions"
              title="Prochains tournois"
              subtitle="Ne manquez aucun \u00e9v\u00e9nement du circuit africain"
            />
            <Link to="/competitions" className="hidden sm:inline-flex items-center gap-2 text-sm text-gold hover:text-emerald-light transition-colors font-medium">
              Voir tout le calendrier <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingComps.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== JOUEUR \u00c0 L'HONNEUR ==================== */}
      {featuredPlayer && (
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/20 via-bg-primary to-bg-primary" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              overline="\u00c0 l'honneur"
              title="Joueur du mois"
              align="center"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mt-10"
            >
              <div className="glass rounded-3xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto">
                    <img src={featuredPlayer.image} alt={featuredPlayer.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 hidden md:block" />
                    <div className="absolute top-4 left-4">
                      <div className="w-14 h-14 rounded-xl bg-gold/90 flex items-center justify-center">
                        <Trophy size={24} className="text-bg-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="text-3xl mb-2">{featuredPlayer.countryFlag}</div>
                    <h3 className="font-[var(--font-display)] text-3xl font-bold text-text-primary mb-1">
                      {featuredPlayer.name}
                    </h3>
                    <p className="text-emerald-light font-medium mb-4">{featuredPlayer.country} · #{featuredPlayer.ranking} mondial</p>
                    <p className="text-text-secondary leading-relaxed mb-6">{featuredPlayer.bio}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold font-mono text-emerald-light">{featuredPlayer.rating}</div>
                        <div className="text-xs text-text-muted mt-1">Rating</div>
                      </div>
                      <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold font-mono text-gold">{featuredPlayer.titles.length}</div>
                        <div className="text-xs text-text-muted mt-1">Titres majeurs</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {featuredPlayer.titles.slice(0, 3).map((title, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                          <Star size={12} className="text-gold flex-shrink-0" />
                          {title}
                        </div>
                      ))}
                    </div>
                    <Link
                      to={`/joueurs/${featuredPlayer.id}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light font-medium transition-colors"
                    >
                      Voir le profil complet <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ==================== PAYS ==================== */}
      <section className="py-20 lg:py-28 bg-bg-secondary relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle
              overline="G\u00e9ographie"
              title="Le Scrabble par pays"
              subtitle="D\u00e9couvrez l'\u00e9cosyst\u00e8me du Scrabble dans chaque nation"
            />
            <Link to="/pays" className="hidden sm:inline-flex items-center gap-2 text-sm text-emerald-light hover:text-gold transition-colors font-medium">
              Tous les pays <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {countries.slice(0, 6).map((country, i) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/pays/${country.id}`}
                  className="group block relative overflow-hidden rounded-2xl aspect-[16/10] border border-border-subtle hover:border-emerald/30 transition-all"
                >
                  <img src={country.image} alt={country.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{country.flag}</span>
                      <h3 className="font-[var(--font-display)] font-bold text-lg text-white group-hover:text-gold transition-colors">
                        {country.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span>{country.clubs} clubs</span>
                      <span>{country.players} joueurs</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== APPRENDRE ==================== */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/10 via-bg-primary to-bg-primary" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            overline="Formation"
            title="Apprenez et progressez"
            subtitle="Ressources pour d\u00e9butants et joueurs confirm\u00e9s"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { icon: BookOpen, title: 'R\u00e8gles du jeu', desc: 'Ma\u00eetrisez les r\u00e8gles officielles du Scrabble francophone', color: 'emerald' },
              { icon: Zap, title: 'Strat\u00e9gies avanc\u00e9es', desc: 'Techniques de champions pour maximiser vos scores', color: 'gold' },
              { icon: Users, title: 'Trouver un club', desc: 'Rejoignez un club pr\u00e8s de chez vous et jouez r\u00e9guli\u00e8rement', color: 'bordeaux' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/apprendre" className="group block glass rounded-2xl p-7 hover:border-emerald/30 transition-all h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    color === 'emerald' ? 'bg-emerald/15 text-emerald-light' :
                    color === 'gold' ? 'bg-gold/15 text-gold' :
                    'bg-bordeaux/15 text-bordeaux-light'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-[var(--font-display)] font-bold text-lg text-text-primary mb-2 group-hover:text-emerald-light transition-colors">{title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="py-20 lg:py-28 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 scrabble-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1.5 mb-6">
              {['N', 'E', 'W', 'S'].map((l, i) => (
                <ScrabbleTile key={i} letter={l} delay={i * 0.1} size="md" />
              ))}
            </div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Restez inform\u00e9
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              Recevez chaque semaine les actualit\u00e9s, r\u00e9sultats et \u00e9v\u00e9nements du Scrabble francophone africain.
            </p>
            {subscribed ? (
              <div className="glass rounded-2xl p-6 inline-flex items-center gap-3 text-emerald-light">
                <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center">
                  ✓
                </div>
                Merci ! Vous \u00eates inscrit(e) \u00e0 la newsletter.
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold hover:shadow-lg hover:shadow-emerald/25 transition-all flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  S'inscrire
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
