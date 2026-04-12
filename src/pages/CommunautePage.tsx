import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Calendar, Newspaper, Facebook, Twitter, Instagram, Youtube, Heart, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ScrabbleTile from '../components/ScrabbleTile';

export default function CommunautePage() {
  const [formType, setFormType] = useState<'article' | 'event' | 'contribution'>('article');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1.5 mb-6">
            {['E', 'N', 'S', 'E', 'M', 'B', 'L', 'E'].map((l, i) => (
              <ScrabbleTile key={i} letter={l} delay={i * 0.06} size="sm" />
            ))}
          </div>
          <SectionTitle
            overline="Ensemble"
            title="Communaut\u00e9"
            subtitle="Rejoignez la communaut\u00e9 du Scrabble francophone africain. Partagez, contribuez, connectez-vous."
            align="center"
          />
        </div>

        {/* Social links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600/20 hover:border-blue-500/30 hover:text-blue-400', followers: '12K' },
            { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500/20 hover:border-sky-400/30 hover:text-sky-400', followers: '5.2K' },
            { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-500/20 hover:border-pink-400/30 hover:text-pink-400', followers: '8.7K' },
            { icon: Youtube, label: 'YouTube', color: 'hover:bg-red-500/20 hover:border-red-400/30 hover:text-red-400', followers: '3.1K' },
          ].map(({ icon: Icon, label, color, followers }, i) => (
            <motion.a
              key={label}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 text-center border border-border-subtle transition-all duration-300 ${color}`}
            >
              <Icon size={28} className="mx-auto mb-3" />
              <div className="text-sm font-semibold text-text-primary">{label}</div>
              <div className="text-xs text-text-muted mt-1">{followers} abonn\u00e9s</div>
            </motion.a>
          ))}
        </div>

        {/* Contribution form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 lg:p-10"
        >
          <h2 className="font-[var(--font-display)] text-2xl font-bold text-text-primary mb-2">Contribuer</h2>
          <p className="text-text-secondary mb-8">Vous souhaitez partager une actualit\u00e9, proposer un \u00e9v\u00e9nement ou contribuer au projet ?</p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { key: 'article' as const, icon: Newspaper, label: 'Soumettre un article' },
              { key: 'event' as const, icon: Calendar, label: 'Proposer un \u00e9v\u00e9nement' },
              { key: 'contribution' as const, icon: Heart, label: 'Appel \u00e0 contribution' },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setFormType(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  formType === key
                    ? 'bg-emerald/20 text-emerald-light border border-emerald/30'
                    : 'bg-bg-card text-text-secondary border border-border-subtle hover:border-emerald/20'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-emerald-light" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Merci !</h3>
              <p className="text-text-secondary">Votre contribution a \u00e9t\u00e9 envoy\u00e9e. Nous reviendrons vers vous rapidement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Sujet</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 transition-colors"
                  placeholder={formType === 'article' ? 'Titre de l\'article' : formType === 'event' ? 'Nom de l\'\u00e9v\u00e9nement' : 'Objet de votre contribution'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 transition-colors resize-none"
                  placeholder="D\u00e9crivez votre contribution en d\u00e9tail..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold hover:shadow-lg hover:shadow-emerald/25 transition-all"
              >
                <Send size={18} />
                Envoyer
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
