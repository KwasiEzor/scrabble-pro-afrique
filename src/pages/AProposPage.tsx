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
            title="À propos de Scrabble Pro"
            subtitle="La plateforme de référence du Scrabble francophone en Afrique"
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
              Créer la plateforme média et communautaire de référence pour le Scrabble francophone en Afrique. 
              Nous voulons informer, fédérer et valoriser l'ensemble des acteurs de cette discipline : 
              joueurs, clubs, fédérations, arbitres et passionnés.
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
              Faire du Scrabble francophone africain une discipline reconnue, respectée et accessible à tous. 
              Nous croyons que le Scrabble est bien plus qu'un jeu : c'est un vecteur d'éducation, 
              de lien social et d'excellence intellectuelle.
            </p>
          </motion.div>
        </div>

        {/* Ligne éditoriale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 lg:p-10 mb-16"
        >
          <div className="w-12 h-12 rounded-xl bg-bordeaux/15 text-bordeaux-light flex items-center justify-center mb-5">
            <BookOpen size={24} />
          </div>
          <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary mb-4">Ligne éditoriale</h3>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Scrabble Pro Afrique couvre l'actualité du Scrabble francophone à travers le continent africain 
              avec un regard professionnel, passionné et bienveillant.
            </p>
            <p>
              Nous publions des articles de fond, des portraits de joueurs, des analyses de compétitions, 
              des guides pédagogiques et des reportages sur la vie des clubs et fédérations.
            </p>
            <p>
              Notre ton est à la fois inspirant, rigoureux et accessible. Nous nous adressons aussi bien 
              aux champions confirmés qu'aux curieux qui découvrent le Scrabble.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <h3 className="font-[var(--font-display)] text-2xl font-bold text-text-primary mb-8 text-center">Nos valeurs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {[
            { icon: Award, title: 'Excellence', desc: 'Promouvoir le meilleur du Scrabble africain', color: 'emerald' },
            { icon: Users, title: 'Communauté', desc: 'Fédérer les scrabbleurs de tout le continent', color: 'gold' },
            { icon: Globe, title: 'Ouverture', desc: 'Connecter l\'Afrique au monde du Scrabble', color: 'bordeaux' },
            { icon: BookOpen, title: 'Éducation', desc: 'Rendre le Scrabble accessible à tous', color: 'emerald' },
            { icon: Target, title: 'Rigueur', desc: 'Un journalisme de qualité et fiable', color: 'gold' },
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
          <h3 className="font-[var(--font-display)] text-2xl font-bold text-text-primary mb-4">L'équipe</h3>
          <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
            Scrabble Pro Afrique est porté par une équipe de passionnés du Scrabble, de journalistes 
            et de développeurs répartis à travers l'Afrique francophone.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Amadou Diallo', role: 'Rédacteur en chef', image: '/images/player1.jpg' },
              { name: 'Fatou Ndiaye', role: 'Journaliste', image: '/images/player2.jpg' },
              { name: 'Kouadio Yao', role: 'Correspondant', image: '/images/player3.jpg' },
              { name: 'Aïcha Bamba', role: 'Community Manager', image: '/images/player4.jpg' },
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
