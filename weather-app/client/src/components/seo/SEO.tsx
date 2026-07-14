import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  noIndex?: boolean;
  geoRegion?: string;
  geoPlacename?: string;
}

export function SEO({
  title,
  description,
  canonicalPath,
  ogImage = '/og-image.jpg', // Default OG image placeholder
  noIndex = false,
  geoRegion,
  geoPlacename,
}: SEOProps) {
  const siteName = 'Nimbus Weather';
  const fullTitle = `${title} | ${siteName}`;
  // Assuming a standard domain for absolute canonical/OG URLs
  const canonicalUrl = `https://nimbusweather.example${canonicalPath}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo Tags */}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPlacename && <meta name="geo.placename" content={geoPlacename} />}
    </Helmet>
  );
}
