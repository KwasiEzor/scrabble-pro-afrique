import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export default function SEO({ 
  title = 'Scrabble Pro Afrique - Le portail du Scrabble francophone', 
  description = 'Actualités, compétitions, portraits de champions et ressources du Scrabble francophone en Afrique.',
  image = '/images/hero-scrabble.jpg',
  url = 'https://scrabblepro.africa',
  type = 'website'
}: SEOProps) {
  const siteTitle = title.includes('Scrabble Pro Afrique') ? title : `${title} | Scrabble Pro Afrique`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
