import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const ActualitesPage = lazy(() => import('./pages/ActualitesPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const CompetitionsPage = lazy(() => import('./pages/CompetitionsPage'));
const CompetitionDetailPage = lazy(() => import('./pages/CompetitionDetailPage'));
const JoueursPage = lazy(() => import('./pages/JoueursPage'));
const PlayerDetailPage = lazy(() => import('./pages/PlayerDetailPage'));
const PaysPage = lazy(() => import('./pages/PaysPage'));
const CountryDetailPage = lazy(() => import('./pages/CountryDetailPage'));
const MediatequePage = lazy(() => import('./pages/MediatequePage'));
const ApprendrePage = lazy(() => import('./pages/ApprendrePage'));
const CommunautePage = lazy(() => import('./pages/CommunautePage'));
const AProposPage = lazy(() => import('./pages/AProposPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'));
const PolitiqueConfidentialitePage = lazy(() => import('./pages/PolitiqueConfidentialitePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:slug" element={<ArticlePage />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/competitions/:slug" element={<CompetitionDetailPage />} />
            <Route path="/joueurs" element={<JoueursPage />} />
            <Route path="/joueurs/:slug" element={<PlayerDetailPage />} />
            <Route path="/pays" element={<PaysPage />} />
            <Route path="/pays/:slug" element={<CountryDetailPage />} />
            <Route path="/mediatheque" element={<MediatequePage />} />
            <Route path="/apprendre" element={<ApprendrePage />} />
            <Route path="/communaute" element={<CommunautePage />} />
            <Route path="/a-propos" element={<AProposPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-bg-primary text-text-secondary">
      <div className="text-[11px] font-black uppercase tracking-[0.3em]">Chargement...</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
