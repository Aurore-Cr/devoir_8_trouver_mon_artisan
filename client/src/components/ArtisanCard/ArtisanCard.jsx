import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import StarRating from '../StarRating/StarRating';

// Petite fiche cliquable pour un artisan : nom, note, spécialité, localisation
function ArtisanCard({ artisan }) {
  return (
    <Card
      as={Link}
      to={`/artisan/${artisan.id}`}
      className="card-artisan h-100 text-decoration-none text-dark"
    >
      <Card.Body>
        <Card.Title as="h3" className="h5">
          {artisan.nom}
        </Card.Title>
        <StarRating note={artisan.note} />
        <Card.Text className="mb-1 mt-2">{artisan.specialite?.nom}</Card.Text>
        <Card.Text className="text-muted small">{artisan.ville}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ArtisanCard;
