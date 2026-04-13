import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Newspaper, User, Trophy, Globe, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { articles, players, competitions } from '../lib/data';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [searchOpen]);

  const q = searchQuery.toLowerCase();
  const results = [
    ...articles.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
      .map(a => ({ ...a, type: 'article' as const, icon: Newspaper })),
    ...players.filter(p => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q))
      .map(p => ({ ...p, type: 'player' as const, icon: User })),
    ...competitions.filter(c => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
      .map(c => ({ ...c, type: 'competition' as const, icon: Trophy }))
  ].slice(0, 8);

  const handleSelect = (item: any) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (item.type === 'article') navigate(`/actualites/${item.slug}`);
    if (item.type === 'player') navigate(`/joueurs/${item.slug}`);
    if (item.type === 'competition') navigate(`/competitions/${item.slug}`);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (!searchOpen) return;

      if (e.key === 'Escape') setSearchOpen(false);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, results, selectedIndex, setSearchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-bg-primary/40 backdrop-blur-md flex items-start justify-center pt-[10vh] sm:pt-[15vh]"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mx-4 bg-[#121212] rounded-[2rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input Area */}
            <div className="relative flex items-center px-8 py-7 border-b border-white/5 bg-white/[0.02]">
              <Search size={24} className="text-emerald-light absolute left-8 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher articles, joueurs, compétitions..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSelectedIndex(0); }}
                className="w-full bg-transparent text-text-primary text-xl pl-10 outline-none placeholder:text-text-muted font-light"
              />
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-text-muted font-mono uppercase">
                  ESC
                </div>
                <button 
                  onClick={() => setSearchOpen(false)} 
                  className="p-2 rounded-full hover:bg-white/5 text-text-muted transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Results Area */}
            <div 
              ref={scrollContainerRef}
              className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar"
            >
              {searchQuery.length === 0 ? (
                <div className="py-12 px-8">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-emerald-light font-bold mb-8">Suggestions rapides</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: Newspaper, label: 'Dernières actualités', path: '/actualites' },
                      { icon: Trophy, label: 'Calendrier tournois', path: '/competitions' },
                      { icon: User, label: 'Classement joueurs', path: '/joueurs' },
                      { icon: Globe, label: 'Fédérations nationales', path: '/pays' },
                    ].map((s) => (
                      <button
                        key={s.label}
                        onClick={() => { setSearchOpen(false); navigate(s.path); }}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald/30 hover:bg-emerald/5 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center text-emerald-light group-hover:scale-110 transition-transform">
                          <s.icon size={20} />
                        </div>
                        <span className="font-bold text-text-primary group-hover:text-emerald-light transition-colors">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-4 py-2">
                    <h4 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold">Résultats ({results.length})</h4>
                  </div>
                  {results.map((item, i) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      onMouseEnter={() => setSelectedIndex(i)}
                      onClick={() => handleSelect(item)}
                      className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center gap-4 group relative ${
                        i === selectedIndex 
                          ? 'bg-emerald/10 border border-emerald/20 shadow-lg shadow-emerald/5' 
                          : 'bg-transparent border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative ${
                        i === selectedIndex ? 'ring-2 ring-emerald-light' : 'ring-1 ring-white/10'
                      }`}>
                        {'image' in item ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-bg-tertiary flex items-center justify-center text-emerald-light">
                            <item.icon size={24} />
                          </div>
                        )}
                        <div className="absolute top-0 right-0 p-1">
                          <div className={`w-2 h-2 rounded-full ${
                            item.type === 'article' ? 'bg-emerald' : 
                            item.type === 'player' ? 'bg-gold' : 'bg-bordeaux'
                          }`} />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${
                            item.type === 'article' ? 'bg-emerald/20 text-emerald-light' : 
                            item.type === 'player' ? 'bg-gold/20 text-gold' : 'bg-bordeaux/20 text-bordeaux-light'
                          }`}>
                            {item.type}
                          </span>
                          {'country' in item && <span className="text-xs text-text-muted">{item.country}</span>}
                        </div>
                        <div className={`text-lg font-bold mt-1 transition-colors ${
                          i === selectedIndex ? 'text-white' : 'text-text-primary'
                        }`}>
                          {'title' in item ? item.title : item.name}
                        </div>
                        {'excerpt' in item && <div className="text-sm text-text-muted line-clamp-1 mt-0.5">{item.excerpt}</div>}
                      </div>

                      {i === selectedIndex && (
                        <motion.div 
                          layoutId="active-arrow"
                          className="flex items-center gap-2 text-emerald-light pr-2"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Entrée</span>
                          <CornerDownLeft size={16} />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-text-muted">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Aucun résultat</h3>
                  <p className="text-text-secondary max-w-xs mx-auto">
                    Nous n'avons rien trouvé pour « <span className="text-emerald-light font-bold">{searchQuery}</span> ». Essayez un autre mot-clé.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase">
              <div className="flex gap-6">
                <span className="flex items-center gap-2"><ArrowRight size={12} className="rotate-90" /> Naviguer</span>
                <span className="flex items-center gap-2"><CornerDownLeft size={12} /> Sélectionner</span>
              </div>
              <div className="flex items-center gap-2">
                Scrabble Pro Afrique <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
