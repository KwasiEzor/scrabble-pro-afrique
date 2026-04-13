import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, MessageCircle, Loader2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { messageService } from '../lib/services';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', type: 'general', subject: '', message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await messageService.send({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        content: formData.message,
        tag: formData.type
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <SEO 
        title="Contactez-nous" 
        description="Une question, un partenariat, une demande de publication ? L'équipe de Scrabble Pro Afrique est à votre écoute." 
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          overline="Contactez-nous"
          title="Prendre Contact"
          subtitle="Une question, un partenariat, une demande de publication ? Écrivez-nous."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email Officiel', value: 'contact@scrabblepro.africa', color: 'emerald' },
              { icon: MapPin, label: 'Siège Social', value: 'Dakar, Sénégal', color: 'gold' },
              { icon: Phone, label: 'Ligne Directe', value: '+221 33 800 00 00', color: 'bordeaux' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-[#121212] border border-white/5 rounded-[2rem] p-6 flex items-center gap-5 hover:border-white/10 transition-colors group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${
                  color === 'emerald' ? 'bg-emerald/10 text-emerald-light' :
                  color === 'gold' ? 'bg-gold/10 text-gold' :
                  'bg-bordeaux/10 text-bordeaux-light'
                }`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-text-muted font-black uppercase tracking-widest mb-1">{label}</div>
                  <div className="text-sm font-bold text-white tracking-tight">{value}</div>
                </div>
              </div>
            ))}

            <div className="bg-[#121212] border border-white/5 rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-light mb-6 pb-2 border-b border-white/5">Départements</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Relations Presse', color: 'text-emerald-light' },
                  { label: 'Partenariats Publics', color: 'text-gold' },
                  { label: 'Support Technique', color: 'text-bordeaux-light' },
                  { label: 'Service Publication', color: 'text-emerald-light' },
                ].map(item => (
                  <li key={item.label} className="flex items-center gap-3 text-xs font-bold text-text-secondary hover:text-white transition-colors cursor-default">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')}`} /> 
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121212] border border-white/5 rounded-[3rem] p-8 lg:p-12 shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald/5 blur-[100px] rounded-full pointer-events-none" />
              
              {submitted ? (
                <div className="text-center py-16 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-emerald/10 border border-emerald/20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Send size={32} className="text-emerald-light" />
                  </div>
                  <h3 className="font-[var(--font-display)] text-3xl font-bold text-white mb-4">Message Transmis</h3>
                  <p className="text-text-secondary text-lg font-light italic">"Votre demande a été enregistrée avec succès. Notre équipe reviendra vers vous sous 48h."</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', type: 'general', subject: '', message: '' }); }}
                    className="mt-10 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all active:scale-95"
                  >
                    Nouveau message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold mb-6">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Identité Complète</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder:text-text-muted outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all"
                        placeholder="Amadou Diallo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Adresse Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder:text-text-muted outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all"
                        placeholder="amadou@exemple.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Type de Requête</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all appearance-none cursor-pointer"
                    >
                      <option value="general">Demande générale</option>
                      <option value="partenariat">Partenariat Corporate</option>
                      <option value="publication">Soumission d'article</option>
                      <option value="signalement">Assistance Technique</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Sujet de Discussion</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder:text-text-muted outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all"
                      placeholder="L'objet de votre message"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Message Détaillé</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder:text-text-muted outline-none focus:border-emerald/50 focus:ring-4 focus:ring-emerald/5 transition-all resize-none"
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-2xl hover:shadow-emerald/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Transmettre le message
                      </>
                    )}
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
