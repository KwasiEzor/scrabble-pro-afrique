import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { useAppStore } from '../lib/store';
import SearchOverlay from './SearchOverlay';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Actualit\u00e9s', path: '/actualites' },
  { label: 'Comp\u00e9titions', path: '/competitions' },
  { label: 'Joueurs', path: '/joueurs' },
  { label: 'Pays', path: '/pays' },
  { label: 'M\u00e9diath\u00e8que', path: '/mediatheque' },
  { label: 'Apprendre', path: '/apprendre' },
  { label: 'Communaut\u00e9', path: '/communaute' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, searchOpen, setSearchOpen } = useAppStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-2xl shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex gap-0.5">
                {['S', 'P'].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded bg-gradient-to-br from-emerald to-emerald-dark text-white font-bold font-[var(--font-display)] text-sm shadow-md group-hover:scale-105 transition-transform"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold font-[var(--font-display)] text-text-primary">Scrabble</span>
                <span className="text-lg font-bold font-[var(--font-display)] text-gold"> Pro</span>
                <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted -mt-1">Afrique Francophone</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-emerald-light bg-emerald/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl text-text-secondary hover:text-emerald-light hover:bg-emerald/10 transition-all"
              >
                <Search size={20} />
              </button>
              <Link
                to="/admin"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white text-sm font-semibold hover:shadow-lg hover:shadow-emerald/20 transition-all"
              >
                Admin
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden glass border-t border-border-subtle"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        location.pathname === link.path
                          ? 'text-emerald-light bg-emerald/10'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <Link
                    to="/admin"
                    className="block mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white text-center font-semibold"
                  >
                    Administration
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <SearchOverlay />
    </>
  );
}
