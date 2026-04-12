import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', type: 'general', subject: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          overline="Contactez-nous"
          title="Contact"
          subtitle="Une question, un partenariat, une demande de publication ? \u00c9crivez-nous."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: Mail, label: 'Email', value: 'contact@scrabblepro.africa', color: 'emerald' },
              { icon: MapPin, label: 'Si\u00e8ge', value: 'Dakar, S\u00e9n\u00e9gal', color: 'gold' },
              { icon: Phone, label: 'T\u00e9l\u00e9phone', value: '+221 XX XXX XX XX', color: 'bordeaux' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="glass rounded-xl p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  color === 'emerald' ? 'bg-emerald/15 text-emerald-light' :
                  color === 'gold' ? 'bg-gold/15 text-gold' :
                  'bg-bordeaux/15 text-bordeaux-light'
                }`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs text-text-muted">{label}</div>
                  <div className="text-sm font-medium text-text-primary">{value}</div>
                </div>
              </div>
            ))}

            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-semibold text-text-primary mb-3">Types de demandes</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2"><MessageCircle size={12} className="text-emerald-light" /> Demande g\u00e9n\u00e9rale</li>
                <li className="flex items-center gap-2"><MessageCircle size={12} className="text-gold" /> Partenariat</li>
                <li className="flex items-center gap-2"><MessageCircle size={12} className="text-bordeaux-light" /> Demande de publication</li>
                <li className="flex items-center gap-2"><MessageCircle size={12} className="text-emerald-light" /> Signalement</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8"
            >
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-emerald-light" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Message envoy\u00e9 !</h3>
                  <p className="text-text-secondary">Nous vous r\u00e9pondrons dans les plus brefs d\u00e9lais.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', type: 'general', subject: '', message: '' }); }}
                    className="mt-6 text-sm text-emerald-light hover:text-gold transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Nom complet *</label>
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
                      <label className="block text-sm font-medium text-text-secondary mb-2">Email *</label>
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
                    <label className="block text-sm font-medium text-text-secondary mb-2">Type de demande</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary outline-none focus:border-emerald/50 transition-colors"
                    >
                      <option value="general">Demande g\u00e9n\u00e9rale</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="publication">Demande de publication</option>
                      <option value="signalement">Signalement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Sujet *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 transition-colors"
                      placeholder="Objet de votre message"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary placeholder:text-text-muted outline-none focus:border-emerald/50 transition-colors resize-none"
                      placeholder="Votre message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold hover:shadow-lg hover:shadow-emerald/25 transition-all"
                  >
                    <Send size={18} />
                    Envoyer le message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
