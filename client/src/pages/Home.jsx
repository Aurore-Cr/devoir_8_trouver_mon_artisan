import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
        <Row as="ol" className="list-unstyled g-3">
          {ETAPES.map((etape) => (
            <Col as="li" key={etape.numero} xs={12} md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <span className="fw-bold">{etape.numero}.</span> {etape.texte}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="container py-4" aria-labelledby="artisans-du-mois">
        <h2 id="artisans-du-mois">Les artisans du mois</h2>
        <Row className="g-3">
          {topArtisans.map((artisan) => (
            <Col xs={12} md={4} key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}

export default Home;
