import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const mediaItems = [
  { id: '1', type: 'photo', title: 'Championnat d\'Afrique 2024', image: '/images/tournament.jpg', category: 'Événement' },
  { id: '2', type: 'photo', title: 'Finale Dames', image: '/images/player2.jpg', category: 'Portrait' },
  { id: '3', type: 'photo', title: 'Plateau de jeu', image: '/images/scrabble-tiles.jpg', category: 'Jeu' },
  { id: '4', type: 'photo', title: 'Communauté Dakar', image: '/images/community.jpg', category: 'Événement' },
  { id: '5', type: 'photo', title: 'Sénégal', image: '/images/country-senegal.jpg', category: 'Pays' },
  { id: '6', type: 'photo', title: 'Côte d\'Ivoire', image: '/images/country-cotedivoire.jpg', category: 'Pays' },
  { id: '7', type: 'photo', title: 'Champion 2024', image: '/images/player1.jpg', category: 'Portrait' },
  { id: '8', type: 'photo', title: 'Cameroun', image: '/images/country-cameroun.jpg', category: 'Pays' },
  { id: '9', type: 'photo', title: 'Scrabble Board', image: '/images/hero-scrabble.jpg', category: 'Jeu' },
];

const categories = ['Tous', 'Événement', 'Portrait', 'Pays', 'Jeu'];

export default function MediatequePage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === 'Tous' ? mediaItems : mediaItems.filter(m => m.category === activeCategory);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Galerie"
          title="Médiathèque"
          subtitle="Photos, vidéos et moments forts du Scrabble africain"
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-emerald/20 text-emerald-light border border-emerald/30'
                  : 'bg-bg-card text-text-secondary border border-border-subtle hover:border-emerald/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-border-subtle hover:border-emerald/30 transition-all"
              onClick={() => setLightbox(item.image)}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Image size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs text-emerald-light font-medium">{item.category}</span>
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
