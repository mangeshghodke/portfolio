import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({ title, description, path, schema }) {
  const site = 'Mangesh Ghodke';
  const url = `https://mangeshghodke.github.io/portfolio${path}`;
  const desc =
    description || 'Full-stack web developer crafting modern, fast, and scalable websites.';

  return (
    <Helmet>
      <title>{title ? `${title} | ${site}` : site}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content="web developer, frontend, backend, react, nodejs, portfolio" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title ? `${title} | ${site}` : site} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | ${site}` : site} />
      <meta name="twitter:description" content={desc} />

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  schema: PropTypes.object,
};
