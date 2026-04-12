import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { articles, players, competitions } from '../lib/data';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen]);

  const q = searchQuery.toLowerCase();
  const filteredArticles = articles.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)).slice(0, 3);
  const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)).slice(0, 3);
  const filteredComps = competitions.filter(c => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)).slice(0, 2);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl mx-4 bg-bg-secondary rounded-2xl border border-border-subtle shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border-subtle">
              <Search size={20} className="text-text-muted" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher articles, joueurs, comp\u00e9titions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-text-primary text-lg outline-none placeholder:text-text-muted"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted">
                <X size={18} />
              </button>
            </div>

            {searchQuery.length > 0 && (
              <div className="max-h-[50vh] overflow-y-auto p-4 space-y-4">
                {filteredArticles.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-muted mb-2 px-2">Articles</h4>
                    {filteredArticles.map(a => (
                      <button
                        key={a.id}
                        onClick={() => { setSearchOpen(false); setSearchQuery(''); navigate(`/actualites/${a.id}`); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3"
                      >
                        <img src={a.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-sm font-medium text-text-primary line-clamp-1">{a.title}</div>
                          <div className="text-xs text-text-muted">{a.category} · {a.country}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {filteredPlayers.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-muted mb-2 px-2">Joueurs</h4>
                    {filteredPlayers.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setSearchOpen(false); setSearchQuery(''); navigate(`/joueurs/${p.id}`); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3"
                      >
                        <img src={p.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="text-sm font-medium text-text-primary">{p.name}</div>
                          <div className="text-xs text-text-muted">{p.countryFlag} {p.country} · #{p.ranking}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {filteredComps.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-muted mb-2 px-2">Compétitions</h4>
                    {filteredComps.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setSearchOpen(false); setSearchQuery(''); navigate(`/competitions/${c.id}`); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3"
                      >
                        <img src={c.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-sm font-medium text-text-primary">{c.name}</div>
                          <div className="text-xs text-text-muted">{c.location}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {filteredArticles.length === 0 && filteredPlayers.length === 0 && filteredComps.length === 0 && (
                  <div className="text-center py-8 text-text-muted">Aucun r\u00e9sultat pour « {searchQuery} »</div>
                )}
              </div>
            )}

            <div className="px-5 py-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
              <span>Naviguer avec ↑↓ · Ouvrir avec ↵</span>
              <span className="hidden sm:inline">Ctrl+K pour ouvrir/fermer</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
