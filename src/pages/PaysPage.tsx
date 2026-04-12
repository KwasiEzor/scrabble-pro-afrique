import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Building2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { countries } from '../lib/data';

export default function PaysPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="G\u00e9ographie"
          title="Pays & F\u00e9d\u00e9rations"
          subtitle="L'\u00e9cosyst\u00e8me du Scrabble francophone \u00e0 travers le continent africain"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, i) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/pays/${country.id}`}
                className="group block bg-bg-card rounded-2xl overflow-hidden border border-border-subtle hover:border-emerald/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={country.image} alt={country.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <h3 className="font-[var(--font-display)] font-bold text-xl text-white group-hover:text-gold transition-colors">
                        {country.name}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-text-secondary mb-4">{country.description}</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Building2 size={14} className="text-emerald-light" />
                      {country.clubs} clubs
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Users size={14} className="text-gold" />
                      {country.players} joueurs
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border-subtle">
                    <p className="text-xs text-emerald-light font-medium">{country.federation}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
