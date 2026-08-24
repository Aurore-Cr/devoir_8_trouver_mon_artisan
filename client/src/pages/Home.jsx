import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ArtisanCard from '../components/ArtisanCard/ArtisanCard';
import { getTopArtisans } from '../services/api';

const ETAPES = [
  { numero: 1, texte: "Choisir la catégorie d'artisanat dans le menu." },
  { numero: 2, texte: 'Choisir un artisan.' },
  { numero: 3, texte: 'Le contacter via le formulaire de contact.' },
  { numero: 4, texte: 'Une réponse sera apportée sous 48h.' },
];

function Home() {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    getTopArtisans()
      .then(setTopArtisans)
      .catch(() => setTopArtisans([]));
  }, []);

  return (
    <>
      <Helmet>
        <title>Accueil | Trouve ton artisan</title>
        <meta
          name="description"
          content="Trouvez facilement un artisan en Auvergne-Rhône-Alpes et contactez-le en quelques clics."
        />
      </Helmet>

      <section className="container py-5">
        <h1>Trouve ton artisan !</h1>
        <p className="lead">Avec la région Auvergne-Rhône-Alpes</p>
      </section>

      <section className="container py-4" aria-labelledby="comment-trouver">
        <h2 id="comment-trouver">Comment trouver mon artisan ?</h2>
        <ol className="row list-unstyled">
          {ETAPES.map((etape) => (
            <li key={etape.numero} className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="p-3 border rounded h-100">
                <span className="fw-bold">{etape.numero}.</span> {etape.texte}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container py-4" aria-labelledby="artisans-du-mois">
        <h2 id="artisans-du-mois">Les artisans du mois</h2>
        <div className="row g-3">
          {topArtisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
