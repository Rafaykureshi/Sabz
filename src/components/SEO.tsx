import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const SEO = ({ title, description, image, url }: Props) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://sabzkhushali.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = `${siteUrl}/social-share.jpg`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{title} | Sabz Khushali</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* PWA */}
      <meta name="theme-color" content="#253D18" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    </Helmet>
  );
};

export default SEO;