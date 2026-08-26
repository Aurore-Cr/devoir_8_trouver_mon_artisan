import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtisanCard from '../components/ArtisanCard/ArtisanCard';
import { getArtisans } from '../services/api';

function ArtisanList() {
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get('categorie');
  const recherche = searchParams.get('recherche');
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArtisans({ categorie, recherche })
      .then(setArtisans)
      .catch(() => setArtisans([]))
      .finally(() => setLoading(false));
  }, [categorie, recherche]);

  const titre = categorie || (recherche ? `Résultats pour "${recherche}"` : 'Tous les artisans');

  return (
    <>
      <Helmet>
        <title>{titre} | Trouve ton artisan</title>
        <meta name="description" content={`Liste des artisans - ${titre}`} />
      </Helmet>

      <section className="container py-5">
        <h1>{titre}</h1>

        {loading && <p>Chargement...</p>}
        {!loading && artisans.length === 0 && <p>Aucun artisan trouvé.</p>}

        <Row className="g-3">
          {artisans.map((artisan) => (
            <Col xs={12} sm={6} lg={4} key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}

export default ArtisanList;
