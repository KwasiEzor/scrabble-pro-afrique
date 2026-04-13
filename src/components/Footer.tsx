import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  'Navigation': [
    { label: 'Accueil', path: '/' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'Compétitions', path: '/competitions' },
    { label: 'Joueurs', path: '/joueurs' },
  ],
  'Explorer': [
    { label: 'Pays & Fédérations', path: '/pays' },
    { label: 'Médiathèque', path: '/mediatheque' },
    { label: 'Apprendre', path: '/apprendre' },
    { label: 'Communauté', path: '/communaute' },
  ],
  'Informations': [
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
    { label: 'Mentions légales', path: '/mentions-legales' },
    { label: 'Politique de confidentialité', path: '/politique-confidentialite' },
  ]
};

export default function Footer() {
  return (
    <footer className="relative bg-bg-secondary border-t border-border-subtle">
      {/* Decorative top bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-9 h-9 bg-emerald rounded-lg flex items-center justify-center rotate-[-6deg] group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-emerald/20">
                  <span className="text-white font-black text-xl font-[var(--font-display)]">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-bg-secondary shadow-sm" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">Scrabble</span>
                <span className="text-xl font-light text-white/60 tracking-tight ml-1">Pro</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
              La plateforme de référence du Scrabble francophone en Afrique. Actualités, compétitions, joueurs et communauté.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center text-text-muted hover:text-emerald-light hover:bg-emerald/10 transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-secondary hover:text-emerald-light transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2025 Scrabble Pro Afrique. Tous droits réservés.
          </p>
          <p className="text-xs text-text-muted">
            Fait avec ❤️ pour la communauté francophone africaine
          </p>
        </div>
      </div>
    </footer>
  );
}
