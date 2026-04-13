import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Building2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { countries as staticCountries } from '../lib/data';
import type { Country } from '../lib/data';
import { loadCountries as fetchCountries } from '../lib/siteContent';
import SEO from '../components/SEO';

export default function PaysPage() {
  const [countries, setCountries] = useState<Country[]>(staticCountries);

  useEffect(() => {
    async function loadCountries() {
      setCountries(await fetchCountries());
    }
    loadCountries();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title="Pays & Fédérations" 
        description="L'écosystème du Scrabble francophone à travers le continent africain. Découvrez les clubs et fédérations nationales de 24 nations." 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Géographie"
          title="Fédérations Nationales"
          subtitle="L'écosystème du Scrabble francophone à travers le continent africain"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, i) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/pays/${country.slug}`}
                className="group block bg-[#121212] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-emerald/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={country.image} alt={country.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl filter drop-shadow-2xl transform group-hover:scale-110 transition-transform">{country.flag}</span>
                      <h3 className="font-[var(--font-display)] font-bold text-2xl text-white group-hover:text-gold transition-colors">
                        {country.name}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-sm text-text-secondary mb-6 font-light italic line-clamp-2">"{country.description}"</p>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-white font-black font-mono text-lg">
                        <Building2 size={16} className="text-emerald-light" />
                        {country.clubs}
                      </div>
                      <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Clubs</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-white font-black font-mono text-lg">
                        <Users size={16} className="text-gold" />
                        {country.players}
                      </div>
                      <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Joueurs</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-[10px] text-emerald-light font-black uppercase tracking-[0.2em]">{country.federation}</p>
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
