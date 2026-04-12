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
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/actualites/:id" element={<ArticlePage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/competitions/:id" element={<CompetitionDetailPage />} />
          <Route path="/joueurs" element={<JoueursPage />} />
          <Route path="/joueurs/:id" element={<PlayerDetailPage />} />
          <Route path="/pays" element={<PaysPage />} />
          <Route path="/pays/:id" element={<CountryDetailPage />} />
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

function MentionsLegalesPage() {
  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-[var(--font-display)] text-3xl font-bold text-text-primary mb-8">Mentions légales</h1>
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <p>Scrabble Pro Afrique est une plateforme média et communautaire dédiée au Scrabble francophone en Afrique.</p>
        <h2 className="text-xl font-bold text-text-primary">Éditeur</h2>
        <p>Scrabble Pro Afrique<br />Dakar, Sénégal<br />contact@scrabblepro.africa</p>
        <h2 className="text-xl font-bold text-text-primary">Hébergement</h2>
        <p>Ce site est hébergé par Vercel Inc., San Francisco, CA, États-Unis.</p>
        <h2 className="text-xl font-bold text-text-primary">Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d'auteur. Toute reproduction est interdite sans autorisation préalable.</p>
        <h2 className="text-xl font-bold text-text-primary">Crédits photos</h2>
        <p>Les photographies utilisées sur ce site proviennent de Pexels (licence libre) et de contributeurs de la communauté.</p>
      </div>
    </div>
  );
}

function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-[var(--font-display)] text-3xl font-bold text-text-primary mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <p>Scrabble Pro Afrique s'engage à protéger la vie privée de ses utilisateurs.</p>
        <h2 className="text-xl font-bold text-text-primary">Données collectées</h2>
        <p>Nous collectons uniquement les données nécessaires au fonctionnement du site : adresse email (newsletter), nom et message (formulaire de contact).</p>
        <h2 className="text-xl font-bold text-text-primary">Utilisation des données</h2>
        <p>Vos données sont utilisées exclusivement pour répondre à vos demandes et vous envoyer notre newsletter si vous y êtes inscrit(e).</p>
        <h2 className="text-xl font-bold text-text-primary">Cookies</h2>
        <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n'est utilisé.</p>
        <h2 className="text-xl font-bold text-text-primary">Vos droits</h2>
        <p>Vous disposez d'un droit d'accès, de modification et de suppression de vos données. Contactez-nous à contact@scrabblepro.africa.</p>
      </div>
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
