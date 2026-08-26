import { Helmet } from 'react-helmet-async';

// Page légale générique : "vide", en attente d'un contenu rédigé par un cabinet spécialisé
function LegalPage({ titre }) {
  return (
    <>
      <Helmet>
        <title>{titre} | Trouve ton artisan</title>
        <meta name="description" content={titre} />
      </Helmet>

      <section className="container py-5">
        <h1>{titre}</h1>
        <p>Page en construction.</p>
      </section>
    </>
  );
}

export default LegalPage;
