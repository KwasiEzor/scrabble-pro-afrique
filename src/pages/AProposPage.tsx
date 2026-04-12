import { motion } from 'framer-motion';
import { Target, Eye, BookOpen, Users, Award, Globe } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ScrabbleTile from '../components/ScrabbleTile';

export default function AProposPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1.5 mb-6">
            {['M', 'I', 'S', 'S', 'I', 'O', 'N'].map((l, i) => (
              <ScrabbleTile key={i} letter={l} delay={i * 0.06} size="sm" />
            ))}
          </div>
          <SectionTitle
            overline="Qui sommes-nous"
            title="\u00c0 propos de Scrabble Pro"
            subtitle="La plateforme de r\u00e9f\u00e9rence du Scrabble francophone en Afrique"
            align="center"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald/15 text-emerald-light flex items-center justify-center mb-5">
              <Target size={24} />
            </div>
            <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary mb-3">Notre mission</h3>
            <p className="text-text-secondary leading-relaxed">
              Cr\u00e9er la plateforme m\u00e9dia et communautaire de r\u00e9f\u00e9rence pour le Scrabble francophone en Afrique. 
              Nous voulons informer, f\u00e9d\u00e9rer et valoriser l'ensemble des acteurs de cette discipline : 
              joueurs, clubs, f\u00e9d\u00e9rations, arbitres et passionn\u00e9s.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-5">
              <Eye size={24} />
            </div>
            <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary mb-3">Notre vision</h3>
            <p className="text-text-secondary leading-relaxed">
              Faire du Scrabble francophone africain une discipline reconnue, respect\u00e9e et accessible \u00e0 tous. 
              Nous croyons que le Scrabble est bien plus qu'un jeu : c'est un vecteur d'\u00e9ducation, 
              de lien social et d'excellence intellectuelle.
            </p>
          </motion.div>
        </div>

        {/* Ligne \u00e9ditoriale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 lg:p-10 mb-16"
        >
          <div className="w-12 h-12 rounded-xl bg-bordeaux/15 text-bordeaux-light flex items-center justify-center mb-5">
            <BookOpen size={24} />
          </div>
          <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary mb-4">Ligne \u00e9ditoriale</h3>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Scrabble Pro Afrique couvre l'actualit\u00e9 du Scrabble francophone \u00e0 travers le continent africain 
              avec un regard professionnel, passionn\u00e9 et bienveillant.
            </p>
            <p>
              Nous publions des articles de fond, des portraits de joueurs, des analyses de comp\u00e9titions, 
              des guides p\u00e9dagogiques et des reportages sur la vie des clubs et f\u00e9d\u00e9rations.
            </p>
            <p>
              Notre ton est \u00e0 la fois inspirant, rigoureux et accessible. Nous nous adressons aussi bien 
              aux champions confirm\u00e9s qu'aux curieux qui d\u00e9couvrent le Scrabble.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <h3 className="font-[var(--font-display)] text-2xl font-bold text-text-primary mb-8 text-center">Nos valeurs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {[
            { icon: Award, title: 'Excellence', desc: 'Promouvoir le meilleur du Scrabble africain', color: 'emerald' },
            { icon: Users, title: 'Communaut\u00e9', desc: 'F\u00e9d\u00e9rer les scrabbleurs de tout le continent', color: 'gold' },
            { icon: Globe, title: 'Ouverture', desc: 'Connecter l\'Afrique au monde du Scrabble', color: 'bordeaux' },
            { icon: BookOpen, title: '\u00c9ducation', desc: 'Rendre le Scrabble accessible \u00e0 tous', color: 'emerald' },
            { icon: Target, title: 'Rigueur', desc: 'Un journalisme de qualit\u00e9 et fiable', color: 'gold' },
            { icon: Eye, title: 'Innovation', desc: 'Moderniser l\'image du Scrabble', color: 'bordeaux' },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-bg-card rounded-xl p-6 border border-border-subtle"
            >
              <Icon size={20} className={`mb-3 ${
                color === 'emerald' ? 'text-emerald-light' : color === 'gold' ? 'text-gold' : 'text-bordeaux-light'
              }`} />
              <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
              <p className="text-sm text-text-secondary">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 lg:p-10 text-center"
        >
          <h3 className="font-[var(--font-display)] text-2xl font-bold text-text-primary mb-4">L'\u00e9quipe</h3>
          <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
            Scrabble Pro Afrique est port\u00e9 par une \u00e9quipe de passionn\u00e9s du Scrabble, de journalistes 
            et de d\u00e9veloppeurs r\u00e9partis \u00e0 travers l'Afrique francophone.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Amadou Diallo', role: 'R\u00e9dacteur en chef', image: '/images/player1.jpg' },
              { name: 'Fatou Ndiaye', role: 'Journaliste', image: '/images/player2.jpg' },
              { name: 'Kouadio Yao', role: 'Correspondant', image: '/images/player3.jpg' },
              { name: 'A\u00efcha Bamba', role: 'Community Manager', image: '/images/player4.jpg' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border-subtle" />
                <h4 className="text-sm font-semibold text-text-primary">{member.name}</h4>
                <p className="text-xs text-text-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
