import Head from 'next/head';

const SEO = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Add other SEO-related meta tags here, such as canonical URLs, robots meta tags, etc. */}
    </Head>
  );
};

export default SEO;
