import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ActualitesPage from './pages/ActualitesPage';
import ArticlePage from './pages/ArticlePage';
import CompetitionsPage from './pages/CompetitionsPage';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import JoueursPage from './pages/JoueursPage';
import PlayerDetailPage from './pages/PlayerDetailPage';
import PaysPage from './pages/PaysPage';
import CountryDetailPage from './pages/CountryDetailPage';
import MediatequePage from './pages/MediatequePage';
import ApprendrePage from './pages/ApprendrePage';
import CommunautePage from './pages/CommunautePage';
import AProposPage from './pages/AProposPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import MentionsLegalesPage from './pages/MentionsLegalesPage';
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage';

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
          {/* Catch-all routes for legal pages */}
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
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
