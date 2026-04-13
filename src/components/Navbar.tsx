import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, User, ChevronDown, 
  Newspaper, Trophy, Users, Globe, BookOpen, 
  Image as ImageIcon, LayoutDashboard, Github, Twitter 
} from 'lucide-react';
import { useAppStore } from '../lib/store';
import SearchOverlay from './SearchOverlay';
import { articles, competitions, players } from '../lib/data';

const navLinks = [
  { label: 'Actualités', path: '/actualites' },
  { label: 'Compétitions', path: '/competitions' },
  { label: 'Joueurs', path: '/joueurs' },
];

const ecosystemLinks = [
  { label: 'Apprendre', path: '/apprendre', icon: BookOpen, desc: 'Règles et stratégies' },
  { label: 'Pays', path: '/pays', icon: Globe, desc: 'Fédérations nationales' },
  { label: 'Médiathèque', path: '/mediatheque', icon: ImageIcon, desc: 'Photos et vidéos' },
  { label: 'Communauté', path: '/communaute', icon: Users, desc: 'Rejoindre le mouvement' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [ecoOpen, setEcosystemOpen] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useAppStore();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setEcosystemOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setEcosystemOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || ecoOpen
            ? 'bg-[#0F1115]/95 backdrop-blur-xl border-b border-white/5 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-10">
            {/* Logo - Laravel Style */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setEcosystemOpen(false)}>
              <div className="relative">
                <div className="w-9 h-9 bg-emerald rounded-lg flex items-center justify-center rotate-[-6deg] group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-emerald/20">
                  <span className="text-white font-black text-xl font-[var(--font-display)]">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-[#0F1115] shadow-sm" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white tracking-tight">Scrabble</span>
                <span className="text-xl font-light text-white/60 tracking-tight ml-1">Pro</span>
              </div>
            </Link>

            {/* Desktop Navigation - Laravel Layout */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-emerald-light' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Ecosystem Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setEcosystemOpen(!ecoOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                    ecoOpen ? 'text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Écosystème
                  <ChevronDown size={14} className={`transition-transform duration-300 ${ecoOpen ? 'rotate-180 text-emerald-light' : ''}`} />
                </button>

                <AnimatePresence>
                  {ecoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-4 w-80 bg-[#1A1D23] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-3"
                    >
                      <div className="grid grid-cols-1 gap-1">
                        {ecosystemLinks.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-[#242830] flex items-center justify-center text-text-muted group-hover:text-gold transition-colors">
                              <item.icon size={20} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-emerald-light transition-colors">{item.label}</div>
                              <div className="text-[11px] text-text-muted mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <Link to="/admin" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald/10 text-emerald-light text-xs font-black uppercase tracking-widest hover:bg-emerald/20 transition-all">
                          <LayoutDashboard size={14} />
                          Administration
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Search Bar & Actions - Integrated Laravel style */}
            <div className="flex-1 flex justify-end items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-3 flex-1 max-w-[240px] px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-text-muted hover:border-emerald/30 hover:bg-white/10 transition-all group"
              >
                <Search size={16} className="group-hover:text-emerald-light transition-colors" />
                <span className="text-sm font-medium">Rechercher...</span>
                <div className="ml-auto flex items-center gap-1 opacity-40">
                  <span className="text-[10px] font-mono border border-white/20 px-1.5 rounded">⌘</span>
                  <span className="text-[10px] font-mono border border-white/20 px-1.5 rounded">K</span>
                </div>
              </button>

              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <a href="#" className="p-2 text-text-secondary hover:text-emerald-light transition-colors hidden sm:block" aria-label="Github">
                  <Github size={20} />
                </a>
                <a href="#" className="p-2 text-text-secondary hover:text-emerald-light transition-colors hidden sm:block" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <Link to="/admin" className="p-2 text-text-secondary hover:text-gold transition-colors" aria-label="Account">
                  <User size={20} />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-text-secondary hover:text-white"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 z-50 bg-[#0F1115] overflow-y-auto"
            >
              <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center font-black text-white text-2xl">S</div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-text-muted">
                    <X size={28} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {navLinks.map(link => (
                      <Link key={link.path} to={link.path} className="text-2xl font-bold text-white">{link.label}</Link>
                    ))}
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 space-y-6">
                    <h4 className="text-[10px] font-black text-emerald-light uppercase tracking-widest">Écosystème</h4>
                    <div className="grid grid-cols-1 gap-6">
                      {ecosystemLinks.map(item => (
                        <Link key={item.path} to={item.path} className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-text-muted">
                            <item.icon size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-white">{item.label}</div>
                            <div className="text-xs text-text-muted">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/5">
                  <Link to="/admin" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold">
                    <LayoutDashboard size={20} />
                    Administration
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay />
    </>
  );
}
