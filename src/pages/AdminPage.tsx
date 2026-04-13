import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Trophy, Users, Globe, Image as ImageIcon, Mail, Settings, 
  Plus, Edit, Trash2, Eye, EyeOff, Search, ChevronRight, BarChart3, TrendingUp, 
  Calendar, LogOut, Shield, ArrowUpRight, Bell, Filter, Download, MoreHorizontal,
  ChevronLeft, Command, Check, AlertCircle, ExternalLink, Menu, Activity,
  MousePointer2, Clock, Share2, MessageSquare, Zap
} from 'lucide-react';
import { articles, players, competitions, countries } from '../lib/data';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

// --- Types & Constants ---

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', key: 'dashboard' },
  { icon: Activity, label: 'Analytics', key: 'analytics' },
  { icon: FileText, label: 'Content', key: 'articles' },
  { icon: Trophy, label: 'Events', key: 'competitions' },
  { icon: Users, label: 'Talents', key: 'players' },
  { icon: Globe, label: 'Federations', key: 'countries' },
  { icon: ImageIcon, label: 'Assets', key: 'media' },
  { icon: Mail, label: 'Inquiries', key: 'messages' },
  { icon: Settings, label: 'Settings', key: 'settings' },
];

// --- Sophisticated SVG Charts ---

function InteractionChart() {
  const points = [10, 40, 30, 70, 50, 90, 80, 110, 100, 140, 130, 170];
  const max = Math.max(...points);
  const width = 400;
  const height = 120;
  
  const pathData = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - (p / max) * height;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaData = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="w-full h-32 relative group">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        <path d={areaData} fill="url(#chartGradient)" />
        <path d={pathData} fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
        {points.map((p, i) => (
          <circle 
            key={i} 
            cx={(i / (points.length - 1)) * width} 
            cy={height - (p / max) * height} 
            r="2" 
            fill="white" 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            style={{ transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-12 w-full">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.5, ease: "circOut" }}
          className="flex-1 bg-white/10 group-hover:bg-white/30 transition-colors rounded-t-[1px]"
        />
      ))}
    </div>
  );
}

// --- Main Admin Component ---

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('admin_session') || sessionStorage.getItem('admin_session');
    if (session === 'active') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
      if (keepLoggedIn) {
        localStorage.setItem('admin_session', 'active');
      } else {
        sessionStorage.setItem('admin_session', 'active');
      }
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_session');
    sessionStorage.removeItem('admin_session');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 selection:bg-white/10 overflow-hidden relative">
        <SEO title="Secure Authentication | Scrabble Pro" />
        
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 mix-blend-overlay" />
          
          {/* Cyber Grid */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} 
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px] relative z-10"
        >
          <div className="relative group">
            {/* Glow Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[32px] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 lg:p-12 shadow-2xl">
              <div className="flex flex-col items-center mb-12">
                <motion.div 
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="relative mb-8"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] rotate-[-6deg] group-hover:rotate-0 transition-all duration-500">
                    <Shield size={32} className="text-black" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[4px] border-[#0A0A0A] shadow-lg" />
                </motion.div>
                
                <h1 className="text-2xl font-black tracking-tighter text-white/95 text-center italic">Control Center</h1>
                <p className="text-zinc-500 text-[10px] mt-3 font-bold uppercase tracking-[0.3em] text-center">Protocol: Scrabble-Alpha-1</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Terminal Identity</label>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-white transition-colors">
                      <Command size={16} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="admin@scrabblepro.afrique"
                      className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/[0.02] border border-white/10 text-white text-sm outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all placeholder:text-zinc-800 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Neural Key</label>
                    <span className="text-[9px] font-black text-zinc-800 hover:text-zinc-500 cursor-pointer transition-colors uppercase tracking-[0.2em]">Recovery</span>
                  </div>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-white transition-colors">
                      <Zap size={16} />
                    </div>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••••••"
                      className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white/[0.02] border border-white/10 text-white text-sm outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all placeholder:text-zinc-800 font-mono tracking-widest"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-1">
                  <button
                    type="button"
                    onClick={() => setKeepLoggedIn(!keepLoggedIn)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${keepLoggedIn ? 'bg-emerald-500 border-emerald-500' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
                      {keepLoggedIn && <Check size={10} className="text-black" />}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">Stay linked for 30 days</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="group relative w-full h-14 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)]"
                  >
                    <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-500">
                      {loading ? (
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full" 
                        />
                      ) : (
                        <>
                          Establish Link
                          <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>

              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Secure Handshake Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center items-center gap-8"
          >
            <div className="flex items-center gap-2 text-zinc-700 text-[9px] font-bold uppercase tracking-widest">
              <Shield size={10} />
              AES-256
            </div>
            <div className="flex items-center gap-2 text-zinc-700 text-[9px] font-bold uppercase tracking-widest">
              <Globe size={10} />
              Global Auth
            </div>
            <div className="flex items-center gap-2 text-zinc-700 text-[9px] font-bold uppercase tracking-widest">
              <Activity size={10} />
              Audit Log
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-white/10 flex overflow-hidden">
      <SEO title={`Admin | ${sidebarItems.find(i => i.key === activeSection)?.label}`} />
      
      {/* Sidebar - Ultra Minimal */}
      <aside className={`fixed lg:sticky top-0 h-screen w-[260px] bg-black border-r border-white/5 z-50 transition-all duration-500 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-20 flex items-center px-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center rotate-[-6deg] group-hover:rotate-0 transition-all duration-500">
                <span className="text-black font-black text-sm">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tighter leading-none">Scrabble Pro</span>
                <span className="text-[10px] font-bold text-zinc-600 tracking-widest uppercase mt-1">Control</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto scrollbar-none">
            {sidebarItems.map(({ icon: Icon, label, key }) => (
              <button
                key={key}
                onClick={() => { setActiveSection(key); setSidebarOpen(false); }}
                className={`w-full group flex items-center gap-3 px-4 py-2.5 rounded-xl text-[12px] font-bold tracking-tight transition-all duration-300 ${
                  activeSection === key
                    ? 'bg-white text-black'
                    : 'text-zinc-500 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={16} className={`transition-transform duration-300 group-hover:scale-110 ${activeSection === key ? 'text-black' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                {label}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3 group cursor-pointer hover:bg-white/[0.05] transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/10">
                <Users size={18} className="text-zinc-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-white truncate">Amadou Diallo</div>
                <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">Principal Admin</div>
              </div>
              <LogOut 
                size={14} 
                className="text-zinc-700 hover:text-red-400 transition-colors" 
                onClick={(e) => { e.stopPropagation(); handleLogout(); }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#080808]">
        {/* Global Header */}
        <header className="h-20 flex items-center justify-between px-8 lg:px-12 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-3">
              <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-black text-zinc-500 uppercase tracking-widest">v1.4.0</div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Workspace <span className="text-white ml-2">/</span> <span className="text-zinc-400 ml-2">{sidebarItems.find(i => i.key === activeSection)?.label}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-bold text-zinc-600 hover:border-white/10 transition-all cursor-pointer">
              <Command size={14} />
              <span>Omnisearch</span>
              <span className="ml-6 opacity-30 font-mono text-[9px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-zinc-600 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </button>
              <div className="w-8 h-8 rounded-full border border-white/10 bg-gradient-to-br from-zinc-800 to-black p-0.5">
                <div className="w-full h-full rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] font-black text-emerald-500 italic">AD</div>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Canvas */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <div className="max-w-[1400px] mx-auto p-8 lg:p-12 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, scale: 0.995, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.995, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeSection === 'dashboard' && <DashboardView />}
                {activeSection === 'analytics' && <AnalyticsView />}
                {activeSection === 'articles' && <ContentView />}
                {activeSection === 'competitions' && <EventsView />}
                {activeSection === 'players' && <TalentsView />}
                {activeSection === 'countries' && <FederationsView />}
                {activeSection === 'media' && <AssetsView />}
                {activeSection === 'messages' && <InquiriesView />}
                {activeSection === 'settings' && <ConfigurationView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Specialized Dash Components ---

function MetricCard({ label, value, trend, sub, icon: Icon, color = "white" }: any) {
  return (
    <div className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={64} />
      </div>
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
            <Icon size={16} className="text-zinc-500" />
          </div>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
        </div>
        <div>
          <div className="text-4xl font-bold tracking-tighter text-white mb-2">{value}</div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
              {trend}
            </span>
            <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">{sub}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-bold text-white tracking-tight italic">Status Report</h2>
          <p className="text-zinc-500 font-medium text-lg">System wide metrics and real-time activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-[11px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all">Download Log</button>
          <button className="h-12 px-6 rounded-2xl bg-white text-black text-[11px] font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-all">Export Summary</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard label="Active Users" value="2.4k" trend="+18.4%" sub="vs last week" icon={Users} />
        <MetricCard label="Interaction" value="14.2k" trend="+5.2%" sub="clicks / 24h" icon={MousePointer2} />
        <MetricCard label="Latency" value="24ms" trend="Stable" sub="average response" icon={Zap} />
        <MetricCard label="Retention" value="64%" trend="-2.1%" sub="churn rate" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-8 space-y-8">
          <div className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-8 group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Traffic Velocity</h3>
                <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Real-time user sessions</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Flow</span>
              </div>
            </div>
            <InteractionChart />
            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-12">
                {[
                  { label: 'Avg Session', val: '4m 32s' },
                  { label: 'Bounce Rate', val: '31.4%' },
                  { label: 'Direct', val: '1.2k' }
                ].map(m => (
                  <div key={m.label}>
                    <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-1">{m.label}</div>
                    <div className="text-sm font-bold text-white">{m.val}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-zinc-500 hover:text-white cursor-pointer transition-colors">
                <span className="text-[10px] font-black uppercase tracking-widest">Full Analytics</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-6">
              <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="text-emerald-500" /> Recent Content
              </h4>
              <div className="space-y-4">
                {articles.slice(0, 3).map((a, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 overflow-hidden border border-white/5">
                      <img src={a.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">{a.title}</div>
                      <div className="text-[9px] font-bold text-zinc-700 uppercase mt-1 tracking-tighter">{a.category} • {a.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-6">
              <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Globe size={14} className="text-emerald-500" /> Active Federations
              </h4>
              <div className="space-y-4">
                {countries.slice(0, 3).map((c, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{c.flag}</span>
                      <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-700">{c.clubs} CLUBS</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-8">
            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Platform Core</h3>
            <div className="space-y-6">
              {[
                { label: 'Database Node', val: 98, sub: 'Paris-1' },
                { label: 'Asset Storage', val: 74, sub: 'Global CDN' },
                { label: 'Security Layer', val: 100, sub: 'Shield Active' },
                { label: 'Edge Runtime', val: 88, sub: 'Deployed' }
              ].map(sys => (
                <div key={sys.label} className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-zinc-400">{sys.label}</span>
                    <span className="text-[10px] font-mono text-zinc-600">{sys.sub}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${sys.val}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`h-full ${sys.val === 100 ? 'bg-emerald-500' : 'bg-white/40'}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-white/5">
              <span className="text-[10px] font-bold text-zinc-700 uppercase">System Integrity</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">Verified</span>
            </div>
          </div>

          <div className="p-8 rounded-[32px] bg-gradient-to-br from-emerald-500 to-emerald-700 text-black space-y-6 shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
            <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center">
              <AlertCircle size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black italic tracking-tighter">Premium Support</h3>
              <p className="text-xs font-bold mt-2 opacity-80 leading-relaxed">Dedicated engineering support is available 24/7 for Enterprise partners.</p>
            </div>
            <button className="w-full h-12 rounded-xl bg-black text-white text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all">Direct Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <h2 className="text-5xl font-bold text-white tracking-tight italic">Deep Analytics</h2>
        <p className="text-zinc-500 font-medium text-lg">Granular data exploration and user behavior.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[
          { label: 'Device Distribution', data: [40, 70, 45, 90, 65, 30] },
          { label: 'Source Referral', data: [80, 50, 95, 40, 60, 85] },
          { label: 'Engagement Rate', data: [30, 45, 70, 55, 90, 100] }
        ].map(card => (
          <div key={card.label} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 group">
            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-8">{card.label}</h3>
            <BarChart data={card.data} />
            <div className="mt-8 flex justify-between items-center">
              <span className="text-2xl font-bold text-white">74.2%</span>
              <span className="text-[10px] font-black text-emerald-500">+12%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-12 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-12">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white tracking-tight italic">World Activity Map</h3>
          <div className="flex gap-4">
            {['Weekly', 'Monthly', 'Quarterly'].map(t => (
              <button key={t} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${t === 'Monthly' ? 'bg-white text-black' : 'text-zinc-600 hover:text-white'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="aspect-[21/9] bg-zinc-900/50 rounded-3xl border border-white/5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 opacity-20">
            <Globe size={48} />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Geospatial Engine Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ... rest of the file (UnifiedTable, ContentView, etc.) exactly as before
function UnifiedTable({ title, count, headers, rows }: any) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl font-bold text-white tracking-tight italic">{title}</h2>
          <p className="text-zinc-500 font-medium text-lg mt-2">Managing <span className="text-white">{count}</span> global entries.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-zinc-500 hover:text-white transition-all"><Filter size={18} /></button>
          <button className="h-12 px-6 flex items-center gap-3 rounded-2xl bg-white text-black text-[11px] font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-all">
            <Plus size={16} /> New Entry
          </button>
        </div>
      </div>

      <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                {headers.map((h: string) => (
                  <th key={h} className="px-10 py-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{h}</th>
                ))}
                <th className="px-10 py-6 text-right text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row: any, i: number) => (
                <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                  {row.map((cell: any, j: number) => (
                    <td key={j} className="px-10 py-8 text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{cell}</td>
                  ))}
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-600 hover:text-white transition-all"><Edit size={16} /></button>
                      <button className="p-2 rounded-xl hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                      <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-600 hover:text-white transition-all"><MoreHorizontal size={16} /></button>
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

function ContentView() {
  return (
    <UnifiedTable
      title="Content Hub"
      count={articles.length}
      headers={['Publication', 'Metrics', 'Author', 'Status']}
      rows={articles.map(a => [
        <div className="flex flex-col gap-1 max-w-xs">
          <span className="text-white font-bold truncate tracking-tight">{a.title}</span>
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{a.category}</span>
        </div>,
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><Eye size={12} className="text-zinc-600" /><span className="text-[10px] font-mono text-zinc-400">1.2k</span></div>
          <div className="flex items-center gap-1.5"><Share2 size={12} className="text-zinc-600" /><span className="text-[10px] font-mono text-zinc-400">452</span></div>
        </div>,
        <span className="text-xs font-bold text-zinc-500">{a.author}</span>,
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">Published</span>
        </div>
      ])}
    />
  );
}

function EventsView() {
  return (
    <UnifiedTable
      title="Global Events"
      count={competitions.length}
      headers={['Event Identity', 'Region', 'Status', 'Participants']}
      rows={competitions.map(c => [
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold tracking-tight">{c.name}</span>
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest font-mono">{new Date(c.startDate).toLocaleDateString('en-GB')}</span>
        </div>,
        <span className="text-xs font-bold text-zinc-500">{c.location}</span>,
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'upcoming' ? 'bg-blue-400' : c.status === 'ongoing' ? 'bg-emerald-500' : 'bg-zinc-700'}`} />
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{c.status}</span>
        </div>,
        <span className="text-xs font-mono text-zinc-600">{c.participants} REG</span>
      ])}
    />
  );
}

function TalentsView() {
  return (
    <UnifiedTable
      title="Athlete Roster"
      count={players.length}
      headers={['Rank', 'Talent', 'Federation', 'Performance']}
      rows={players.map(p => [
        <span className="text-xl font-black italic text-zinc-800">#{p.ranking}</span>,
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden">
            <img src={p.image} className="w-full h-full object-cover opacity-80" />
          </div>
          <span className="text-white font-bold tracking-tight">{p.name}</span>
        </div>,
        <div className="flex items-center gap-2">
          <span className="text-lg">{p.countryFlag}</span>
          <span className="text-xs font-bold text-zinc-500">{p.country}</span>
        </div>,
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono font-bold text-emerald-500">{p.rating}</span>
          <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${(p.rating / 2500) * 100}%` }} />
          </div>
        </div>
      ])}
    />
  );
}

function FederationsView() {
  return (
    <UnifiedTable
      title="Federations"
      count={countries.length}
      headers={['Code', 'Identity', 'Clubs', 'Growth']}
      rows={countries.map(c => [
        <span className="text-xs font-mono font-bold text-zinc-700">{c.code}</span>,
        <div className="flex items-center gap-4">
          <span className="text-3xl">{c.flag}</span>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight">{c.name}</span>
            <span className="text-[9px] text-zinc-600 font-bold uppercase truncate max-w-[140px] tracking-tighter">{c.federation}</span>
          </div>
        </div>,
        <span className="text-xs font-mono text-white">{c.clubs}</span>,
        <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] italic">
          <TrendingUp size={12} />
          +4.2%
        </div>
      ])}
    />
  );
}

function AssetsView() {
  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-bold text-white tracking-tight italic">Static Assets</h2>
          <p className="text-zinc-500 font-medium text-lg">Managing global media delivery and storage.</p>
        </div>
        <button className="h-12 px-8 rounded-2xl bg-white text-black text-[11px] font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-all">Upload Media</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {[
          '/images/hero-scrabble.jpg', '/images/tournament.jpg', '/images/community.jpg', 
          '/images/player1.jpg', '/images/player2.jpg', '/images/player3.jpg', 
          '/images/player4.jpg', '/images/scrabble-tiles.jpg', '/images/country-senegal.jpg',
          '/images/country-cotedivoire.jpg', '/images/country-cameroun.jpg', '/images/hero-scrabble.jpg'
        ].map((img, i) => (
          <div key={i} className="group relative aspect-[4/5] rounded-[24px] overflow-hidden border border-white/5 bg-zinc-950 transition-all duration-700 hover:border-white/20 hover:scale-[1.02]">
            <img src={img} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="text-[10px] font-mono text-white/60 mb-3 truncate">IMG_094{i}.webp</div>
              <div className="flex gap-2">
                <button className="flex-1 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"><Eye size={12} /></button>
                <button className="flex-1 h-8 rounded-lg bg-red-500/20 backdrop-blur-md flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiriesView() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <h2 className="text-5xl font-bold text-white tracking-tight italic">Global Inquiries</h2>
        <p className="text-zinc-500 font-medium text-lg">Community feedback and operational messages.</p>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Moussa Traoré', email: 'moussa@federation.sn', subject: 'Partnership Inquiry', tag: 'High Priority', read: false },
          { name: 'Marie Konan', email: 'marie@abidjan.ci', subject: 'Article Contribution', tag: 'Editorial', read: true },
          { name: 'Félix Nguema', email: 'felix@gabon.ga', subject: 'Event Registration Help', tag: 'Support', read: true }
        ].map((msg, i) => (
          <div key={i} className={`group flex items-center gap-8 p-10 rounded-[32px] border border-white/5 hover:bg-white/[0.02] hover:border-white/10 cursor-pointer transition-all duration-500 ${!msg.read ? 'bg-white/[0.01]' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${!msg.read ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-2">
                <span className={`text-lg font-bold tracking-tight ${!msg.read ? 'text-white' : 'text-zinc-500'}`}>{msg.name}</span>
                <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">{msg.email}</span>
              </div>
              <p className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">"{msg.subject}"</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{msg.tag}</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-zinc-600 group-hover:text-white transition-colors">
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfigurationView() {
  return (
    <div className="space-y-24">
      <div className="space-y-4">
        <h2 className="text-5xl font-bold text-white tracking-tight italic">System Configuration</h2>
        <p className="text-zinc-500 font-medium text-lg">Global identity, SEO and access protocols.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xl font-bold text-white italic">Platform Metadata</h3>
          <p className="text-sm text-zinc-600 leading-relaxed font-medium">Define how the platform appears on search engines and social media networks globally.</p>
        </div>
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">Site Title</label>
              <input type="text" defaultValue="Scrabble Pro Afrique" className="w-full h-14 px-6 rounded-2xl bg-white/[0.02] border border-white/5 text-white font-bold text-sm focus:border-white/20 transition-all outline-none" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">Environment</label>
              <div className="w-full h-14 px-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-bold text-white">Production Cluster</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">Global Meta Description</label>
            <textarea rows={4} className="w-full p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-white font-medium text-sm focus:border-white/20 transition-all outline-none resize-none" defaultValue="The world-class editorial platform for Scrabble in French-speaking Africa." />
          </div>
          <button className="h-14 px-10 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all">Persist Configuration</button>
        </div>

        <div className="lg:col-span-12 border-t border-white/5 pt-24" />

        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xl font-bold text-white italic">Access Control</h3>
          <p className="text-sm text-zinc-600 leading-relaxed font-medium">Managing administrative privileges and identity provider integrations.</p>
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-[40px] bg-white/[0.02] border border-white/5 divide-y divide-white/5">
            {[
              { name: 'Amadou Diallo', role: 'Superuser', status: 'Online' },
              { name: 'Core Engine', role: 'System', status: 'Active' },
              { name: 'External API', role: 'Integrator', status: 'Offline' }
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between p-8 group hover:bg-white/[0.01] transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-white transition-all font-black italic">
                    {node.name[0]}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white tracking-tight">{node.name}</div>
                    <div className="text-[10px] font-mono text-zinc-700 font-bold uppercase tracking-tighter">NODE_ID: 0x2A98_{i}</div>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'Online' || node.status === 'Active' ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{node.status}</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{node.role}</div>
                  <MoreHorizontal size={20} className="text-zinc-800 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
