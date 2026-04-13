import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] bg-bg-primary px-6 py-32 text-center">
      <SEO title="Page introuvable" description="La page demandée est introuvable." />
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-light">404</p>
        <h1 className="mt-4 text-4xl font-bold text-white">Page introuvable</h1>
        <p className="mt-4 text-text-secondary">
          Le contenu demandé n&apos;existe pas ou l&apos;adresse est incorrecte.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-black"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
