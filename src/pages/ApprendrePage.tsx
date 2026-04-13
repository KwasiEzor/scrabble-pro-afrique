import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, Target, Layers, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ScrabbleTile from '../components/ScrabbleTile';

const sections = [
  {
    id: 'regles',
    icon: BookOpen,
    title: 'Règles du jeu',
    color: 'emerald',
    content: [
      {
        q: 'Comment se déroule une partie ?',
        a: 'Le Scrabble se joue à 2, 3 ou 4 joueurs. Chaque joueur dispose de 7 lettres tirées au hasard. À tour de rôle, les joueurs forment des mots sur le plateau de 15x15 cases. Le premier mot doit passer par la case centrale. Les mots suivants doivent se raccorder aux mots déjà posés.'
      },
      {
        q: 'Comment compter les points ?',
        a: 'Chaque lettre a une valeur en points. Les cases spéciales multiplient la valeur d\'une lettre (×2, ×3) ou d\'un mot (×2, ×3). Un « Scrabble » (7 lettres posées d\'un coup) rapporte un bonus de 50 points.'
      },
      {
        q: 'Quand la partie se termine-t-elle ?',
        a: 'La partie se termine quand un joueur pose toutes ses lettres et que le sac est vide, ou quand tous les joueurs passent consécutivement. Les points des lettres restantes sont déduits.'
      }
    ]
  },
  {
    id: 'modes',
    icon: Layers,
    title: 'Duplicate vs Classique',
    color: 'gold',
    content: [
      {
        q: 'Qu\'est-ce que le Scrabble classique ?',
        a: 'Le mode classique est le format traditionnel où chaque joueur tire ses propres lettres. Le hasard du tirage joue un rôle important. C\'est le format le plus joué en famille et entre amis.'
      },
      {
        q: 'Qu\'est-ce que le Scrabble duplicate ?',
        a: 'En duplicate, tous les joueurs jouent avec les mêmes lettres simultanément. C\'est le format compétitif par excellence car il élimine le facteur chance. Chaque joueur cherche le meilleur coup possible avec le même tirage.'
      },
      {
        q: 'Quel format est utilisé en compétition ?',
        a: 'En Afrique francophone, les deux formats sont pratiqués. Le duplicate est privilégié dans les grandes compétitions internationales. Le classique reste très populaire dans les tournois locaux et régionaux.'
      }
    ]
  },
  {
    id: 'debutants',
    icon: Lightbulb,
    title: 'Conseils débutants',
    color: 'bordeaux',
    content: [
      {
        q: 'Par où commencer ?',
        a: 'Apprenez d\'abord les mots de 2 lettres (il y en a environ 80 en français). Ils sont essentiels pour placer des mots en parallèle et maximiser vos points. Ensuite, familiarisez-vous avec les mots de 3 lettres.'
      },
      {
        q: 'Comment améliorer son vocabulaire ?',
        a: 'Lisez régulièrement, jouez souvent, et utilisez des listes de mots spécifiques au Scrabble. Les « benjamins » (mots de 7-8 lettres courants) sont particulièrement utiles pour réaliser des Scrabbles.'
      },
      {
        q: 'Faut-il rejoindre un club ?',
        a: 'Absolument ! Rejoindre un club est le meilleur moyen de progresser. Vous bénéficierez de l\'expérience des joueurs confirmés, de parties régulières et d\'un cadre motivant.'
      }
    ]
  },
  {
    id: 'strategie',
    icon: Target,
    title: 'Stratégie avancée',
    color: 'emerald',
    content: [
      {
        q: 'Comment gérer son chevalet ?',
        a: 'Équilibrez voyelles et consonnes (idéalement 3-4 consonnes et 3-4 voyelles). Évitez les doublons. Gardez des lettres polyvalentes (S, E, R, A, I, N, T) qui facilitent les Scrabbles.'
      },
      {
        q: 'Quand faut-il échanger des lettres ?',
        a: 'Échangez quand votre chevalet est déséquilibré (trop de voyelles ou consonnes) et que vous ne pouvez pas faire un coup décent. En classique, c\'est parfois la meilleure stratégie.'
      },
      {
        q: 'Comment utiliser les cases bonus ?',
        a: 'Planifiez vos coups pour atteindre les cases « mot compte triple ». Placez vos lettres de haute valeur (J, K, Q, W, X, Y, Z) sur les cases « lettre compte double/triple » pour maximiser les points.'
      }
    ]
  }
];

export default function ApprendrePage() {
  const [openSection, setOpenSection] = useState<string>('regles');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1.5 mb-6">
            {['A', 'P', 'P', 'R', 'E', 'N', 'D', 'R', 'E'].map((l, i) => (
              <ScrabbleTile key={i} letter={l} delay={i * 0.06} size="sm" />
            ))}
          </div>
          <SectionTitle
            overline="Formation"
            title="Apprendre le Scrabble"
            subtitle="Tout ce qu'il faut savoir pour débuter et progresser au Scrabble francophone"
            align="center"
          />
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSection === section.id;
            const colorClasses = {
              emerald: 'bg-emerald/15 text-emerald-light border-emerald/30',
              gold: 'bg-gold/15 text-gold border-gold/30',
              bordeaux: 'bg-bordeaux/15 text-bordeaux-light border-bordeaux/30',
            }[section.color] || '';

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenSection(isOpen ? '' : section.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorClasses}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary">{section.title}</h3>
                  </div>
                  {isOpen ? <ChevronUp size={20} className="text-text-muted" /> : <ChevronDown size={20} className="text-text-muted" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {section.content.map((item, i) => (
                          <div key={i} className="bg-bg-tertiary rounded-xl overflow-hidden">
                            <button
                              onClick={() => setOpenQuestion(openQuestion === `${section.id}-${i}` ? null : `${section.id}-${i}`)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                            >
                              <span className="text-sm font-medium text-text-primary pr-4">{item.q}</span>
                              <ChevronDown size={16} className={`text-text-muted flex-shrink-0 transition-transform ${
                                openQuestion === `${section.id}-${i}` ? 'rotate-180' : ''
                              }`} />
                            </button>
                            <AnimatePresence>
                              {openQuestion === `${section.id}-${i}` && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">{item.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
