import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, Target, Layers, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ScrabbleTile from '../components/ScrabbleTile';

const sections = [
  {
    id: 'regles',
    icon: BookOpen,
    title: 'R\u00e8gles du jeu',
    color: 'emerald',
    content: [
      {
        q: 'Comment se d\u00e9roule une partie ?',
        a: 'Le Scrabble se joue \u00e0 2, 3 ou 4 joueurs. Chaque joueur dispose de 7 lettres tir\u00e9es au hasard. \u00c0 tour de r\u00f4le, les joueurs forment des mots sur le plateau de 15x15 cases. Le premier mot doit passer par la case centrale. Les mots suivants doivent se raccorder aux mots d\u00e9j\u00e0 pos\u00e9s.'
      },
      {
        q: 'Comment compter les points ?',
        a: 'Chaque lettre a une valeur en points. Les cases sp\u00e9ciales multiplient la valeur d\'une lettre (\u00d72, \u00d73) ou d\'un mot (\u00d72, \u00d73). Un \u00ab Scrabble \u00bb (7 lettres pos\u00e9es d\'un coup) rapporte un bonus de 50 points.'
      },
      {
        q: 'Quand la partie se termine-t-elle ?',
        a: 'La partie se termine quand un joueur pose toutes ses lettres et que le sac est vide, ou quand tous les joueurs passent cons\u00e9cutivement. Les points des lettres restantes sont d\u00e9duits.'
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
        a: 'Le mode classique est le format traditionnel o\u00f9 chaque joueur tire ses propres lettres. Le hasard du tirage joue un r\u00f4le important. C\'est le format le plus jou\u00e9 en famille et entre amis.'
      },
      {
        q: 'Qu\'est-ce que le Scrabble duplicate ?',
        a: 'En duplicate, tous les joueurs jouent avec les m\u00eames lettres simultan\u00e9ment. C\'est le format comp\u00e9titif par excellence car il \u00e9limine le facteur chance. Chaque joueur cherche le meilleur coup possible avec le m\u00eame tirage.'
      },
      {
        q: 'Quel format est utilis\u00e9 en comp\u00e9tition ?',
        a: 'En Afrique francophone, les deux formats sont pratiqu\u00e9s. Le duplicate est privil\u00e9gi\u00e9 dans les grandes comp\u00e9titions internationales. Le classique reste tr\u00e8s populaire dans les tournois locaux et r\u00e9gionaux.'
      }
    ]
  },
  {
    id: 'debutants',
    icon: Lightbulb,
    title: 'Conseils d\u00e9butants',
    color: 'bordeaux',
    content: [
      {
        q: 'Par o\u00f9 commencer ?',
        a: 'Apprenez d\'abord les mots de 2 lettres (il y en a environ 80 en fran\u00e7ais). Ils sont essentiels pour placer des mots en parall\u00e8le et maximiser vos points. Ensuite, familiarisez-vous avec les mots de 3 lettres.'
      },
      {
        q: 'Comment am\u00e9liorer son vocabulaire ?',
        a: 'Lisez r\u00e9guli\u00e8rement, jouez souvent, et utilisez des listes de mots sp\u00e9cifiques au Scrabble. Les \u00ab benjamins \u00bb (mots de 7-8 lettres courants) sont particuli\u00e8rement utiles pour r\u00e9aliser des Scrabbles.'
      },
      {
        q: 'Faut-il rejoindre un club ?',
        a: 'Absolument ! Rejoindre un club est le meilleur moyen de progresser. Vous b\u00e9n\u00e9ficierez de l\'exp\u00e9rience des joueurs confirm\u00e9s, de parties r\u00e9guli\u00e8res et d\'un cadre motivant.'
      }
    ]
  },
  {
    id: 'strategie',
    icon: Target,
    title: 'Strat\u00e9gie avanc\u00e9e',
    color: 'emerald',
    content: [
      {
        q: 'Comment g\u00e9rer son chevalet ?',
        a: '\u00c9quilibrez voyelles et consonnes (id\u00e9alement 3-4 consonnes et 3-4 voyelles). \u00c9vitez les doublons. Gardez des lettres polyvalentes (S, E, R, A, I, N, T) qui facilitent les Scrabbles.'
      },
      {
        q: 'Quand faut-il \u00e9changer des lettres ?',
        a: '\u00c9changez quand votre chevalet est d\u00e9s\u00e9quilibr\u00e9 (trop de voyelles ou consonnes) et que vous ne pouvez pas faire un coup d\u00e9cent. En classique, c\'est parfois la meilleure strat\u00e9gie.'
      },
      {
        q: 'Comment utiliser les cases bonus ?',
        a: 'Planifiez vos coups pour atteindre les cases \u00ab mot compte triple \u00bb. Placez vos lettres de haute valeur (J, K, Q, W, X, Y, Z) sur les cases \u00ab lettre compte double/triple \u00bb pour maximiser les points.'
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
            subtitle="Tout ce qu'il faut savoir pour d\u00e9buter et progresser au Scrabble francophone"
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
