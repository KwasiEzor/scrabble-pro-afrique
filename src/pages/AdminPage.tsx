import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Trophy, Users, Globe, Image, Mail, Settings, Plus, Edit, Trash2, Eye, Search, ChevronRight, BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { articles, players, competitions, countries } from '../lib/data';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', key: 'dashboard' },
  { icon: FileText, label: 'Articles', key: 'articles' },
  { icon: Trophy, label: 'Comp\u00e9titions', key: 'competitions' },
  { icon: Users, label: 'Joueurs', key: 'players' },
  { icon: Globe, label: 'Pays & Clubs', key: 'countries' },
  { icon: Image, label: 'M\u00e9dias', key: 'media' },
  { icon: Mail, label: 'Messages', key: 'messages' },
  { icon: Settings, label: 'Param\u00e8tres', key: 'settings' },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pt-20 min-h-screen bg-bg-primary">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-bg-secondary border-r border-border-subtle z-40 transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-4">
            <h2 className="text-lg font-bold text-text-primary font-[var(--font-display)] mb-1">Administration</h2>
            <p className="text-xs text-text-muted">Panneau de gestion CMS</p>
          </div>
          <nav className="px-2 space-y-1">
            {sidebarItems.map(({ icon: Icon, label, key }) => (
              <button
                key={key}
                onClick={() => { setActiveSection(key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === key
                    ? 'bg-emerald/15 text-emerald-light'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-5rem)]">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mb-4 px-4 py-2 rounded-xl bg-bg-card border border-border-subtle text-text-secondary text-sm"
          >
            Menu Admin
          </button>

          {activeSection === 'dashboard' && <DashboardView />}
          {activeSection === 'articles' && <ArticlesView />}
          {activeSection === 'competitions' && <CompetitionsView />}
          {activeSection === 'players' && <PlayersView />}
          {activeSection === 'countries' && <CountriesView />}
          {activeSection === 'media' && <MediaView />}
          {activeSection === 'messages' && <MessagesView />}
          {activeSection === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

function DashboardView() {
  const stats = [
    { label: 'Articles publi\u00e9s', value: articles.length, icon: FileText, color: 'emerald', trend: '+3' },
    { label: 'Comp\u00e9titions', value: competitions.length, icon: Trophy, color: 'gold', trend: '+1' },
    { label: 'Joueurs inscrits', value: players.length, icon: Users, color: 'bordeaux', trend: '+12' },
    { label: 'Pays couverts', value: countries.length, icon: Globe, color: 'emerald', trend: '+2' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary font-[var(--font-display)] mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, trend }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-bg-card rounded-xl p-5 border border-border-subtle"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className={color === 'emerald' ? 'text-emerald-light' : color === 'gold' ? 'text-gold' : 'text-bordeaux-light'} />
              <span className="text-xs text-emerald-light bg-emerald/10 px-2 py-0.5 rounded-full font-medium">{trend}</span>
            </div>
            <div className="text-2xl font-bold font-mono text-text-primary">{value}</div>
            <div className="text-xs text-text-muted mt-1">{label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-emerald-light" />
            Activit\u00e9 r\u00e9cente
          </h3>
          <div className="space-y-3">
            {articles.slice(0, 4).map(a => (
              <div key={a.id} className="flex items-center gap-3 py-2 border-b border-border-subtle last:border-0">
                <img src={a.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-primary truncate">{a.title}</div>
                  <div className="text-xs text-text-muted">{a.date}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald/10 text-emerald-light">Publi\u00e9</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-gold" />
            Prochains \u00e9v\u00e9nements
          </h3>
          <div className="space-y-3">
            {competitions.filter(c => c.status !== 'completed').map(c => (
              <div key={c.id} className="flex items-center gap-3 py-2 border-b border-border-subtle last:border-0">
                <div className={`w-2 h-2 rounded-full ${c.status === 'ongoing' ? 'bg-gold animate-pulse' : 'bg-emerald-light'}`} />
                <div className="flex-1">
                  <div className="text-sm text-text-primary">{c.name}</div>
                  <div className="text-xs text-text-muted">{c.location}</div>
                </div>
                <span className="text-xs text-text-muted">{new Date(c.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminTable({ title, headers, rows, onAdd }: { title: string; headers: string[]; rows: React.ReactNode[][]; onAdd?: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary font-[var(--font-display)]">{title}</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald/20 text-emerald-light text-sm font-medium hover:bg-emerald/30 transition-colors">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="bg-bg-card rounded-xl border border-border-subtle overflow-hidden">
        <div className="p-4 border-b border-border-subtle">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-bg-tertiary border border-border-subtle text-text-primary text-sm outline-none focus:border-emerald/50 transition-colors"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                {headers.map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">{h}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border-subtle last:border-0 hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-text-primary">{cell}</td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-emerald/10 text-text-muted hover:text-emerald-light transition-colors"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gold/10 text-text-muted hover:text-gold transition-colors"><Edit size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ArticlesView() {
  return (
    <AdminTable
      title="Articles"
      headers={['', 'Titre', 'Cat\u00e9gorie', 'Pays', 'Date', 'Statut']}
      rows={articles.map(a => [
        <img src={a.image} alt="" className="w-10 h-10 rounded-lg object-cover" />,
        <span className="font-medium max-w-xs truncate block">{a.title}</span>,
        <span className="px-2 py-0.5 rounded-full bg-emerald/10 text-emerald-light text-xs">{a.category}</span>,
        a.country,
        new Date(a.date).toLocaleDateString('fr-FR'),
        <span className="px-2 py-0.5 rounded-full bg-emerald/10 text-emerald-light text-xs">Publi\u00e9</span>
      ])}
    />
  );
}

function CompetitionsView() {
  return (
    <AdminTable
      title="Comp\u00e9titions"
      headers={['Nom', 'Lieu', 'Dates', 'Type', 'Statut']}
      rows={competitions.map(c => [
        <span className="font-medium">{c.name}</span>,
        c.location,
        `${new Date(c.startDate).toLocaleDateString('fr-FR')}`,
        c.type,
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          c.status === 'upcoming' ? 'bg-emerald/10 text-emerald-light' :
          c.status === 'ongoing' ? 'bg-gold/10 text-gold' :
          'bg-text-muted/10 text-text-muted'
        }`}>{c.status === 'upcoming' ? '\u00c0 venir' : c.status === 'ongoing' ? 'En cours' : 'Termin\u00e9'}</span>
      ])}
    />
  );
}

function PlayersView() {
  return (
    <AdminTable
      title="Joueurs"
      headers={['', 'Nom', 'Pays', 'Ranking', 'Rating', 'Club']}
      rows={players.map(p => [
        <img src={p.image} alt="" className="w-8 h-8 rounded-full object-cover" />,
        <span className="font-medium">{p.name}</span>,
        <span>{p.countryFlag} {p.country}</span>,
        <span className="font-mono">#{p.ranking}</span>,
        <span className="font-mono text-emerald-light">{p.rating}</span>,
        <span className="text-xs text-text-muted">{p.club}</span>
      ])}
    />
  );
}

function CountriesView() {
  return (
    <AdminTable
      title="Pays & F\u00e9d\u00e9rations"
      headers={['', 'Pays', 'F\u00e9d\u00e9ration', 'Clubs', 'Joueurs']}
      rows={countries.map(c => [
        <span className="text-2xl">{c.flag}</span>,
        <span className="font-medium">{c.name}</span>,
        <span className="text-xs text-text-muted">{c.federation}</span>,
        <span className="font-mono">{c.clubs}</span>,
        <span className="font-mono">{c.players}</span>
      ])}
    />
  );
}

function MediaView() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary font-[var(--font-display)]">M\u00e9dias</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald/20 text-emerald-light text-sm font-medium">
          <Plus size={16} /> Upload
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {['/images/hero-scrabble.jpg', '/images/tournament.jpg', '/images/community.jpg', '/images/player1.jpg', '/images/player2.jpg', '/images/player3.jpg', '/images/player4.jpg', '/images/scrabble-tiles.jpg'].map((img, i) => (
          <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-border-subtle">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button className="p-2 rounded-lg bg-white/20 text-white"><Eye size={14} /></button>
              <button className="p-2 rounded-lg bg-white/20 text-white"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesView() {
  const messages = [
    { name: 'Moussa Traor\u00e9', email: 'moussa@email.com', subject: 'Partenariat', date: '2025-01-15', read: false },
    { name: 'Aissatou Ba', email: 'aissatou@email.com', subject: 'Proposition d\'article', date: '2025-01-14', read: true },
    { name: 'Club Scrabble Lom\u00e9', email: 'club@email.com', subject: 'Inscription tournoi', date: '2025-01-13', read: true },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary font-[var(--font-display)] mb-6">Messages</h1>
      <div className="bg-bg-card rounded-xl border border-border-subtle overflow-hidden">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-center gap-4 p-4 border-b border-border-subtle last:border-0 hover:bg-white/[0.02] cursor-pointer transition-colors ${!msg.read ? 'bg-emerald/[0.03]' : ''}`}>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${!msg.read ? 'bg-emerald-light' : 'bg-transparent'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${!msg.read ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>{msg.name}</span>
                <span className="text-xs text-text-muted">{msg.email}</span>
              </div>
              <div className="text-sm text-text-muted truncate">{msg.subject}</div>
            </div>
            <span className="text-xs text-text-muted flex-shrink-0">{new Date(msg.date).toLocaleDateString('fr-FR')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary font-[var(--font-display)] mb-6">Param\u00e8tres</h1>
      <div className="space-y-6">
        <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
          <h3 className="font-semibold text-text-primary mb-4">G\u00e9n\u00e9ral</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Nom du site</label>
              <input type="text" defaultValue="Scrabble Pro Afrique" className="w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary text-sm outline-none focus:border-emerald/50" />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Description SEO</label>
              <textarea rows={3} defaultValue="La plateforme de r\u00e9f\u00e9rence du Scrabble francophone en Afrique" className="w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border-subtle text-text-primary text-sm outline-none focus:border-emerald/50 resize-none" />
            </div>
          </div>
        </div>
        <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
          <h3 className="font-semibold text-text-primary mb-4">Utilisateurs & R\u00f4les</h3>
          <div className="space-y-3">
            {[
              { name: 'Admin Principal', role: 'Super Admin', email: 'admin@scrabblepro.africa' },
              { name: 'R\u00e9dacteur', role: '\u00c9diteur', email: 'redacteur@scrabblepro.africa' },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                <div>
                  <div className="text-sm font-medium text-text-primary">{user.name}</div>
                  <div className="text-xs text-text-muted">{user.email}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
