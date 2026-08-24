import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page non trouvée | Trouve ton artisan</title>
        <meta name="description" content="La page que vous avez demandée n'existe pas." />
      </Helmet>

      <section className="container py-5 text-center">
        <h1>404 — Page non trouvée</h1>
        <p>La page que vous avez demandée n'existe pas ou plus.</p>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </section>
    </>
  );
}

export default NotFound;
