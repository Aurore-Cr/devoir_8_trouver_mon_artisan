import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';

// Petite fiche cliquable pour un artisan : nom, note, spécialité, localisation
function ArtisanCard({ artisan }) {
  return (
    <Link
      to={`/artisan/${artisan.id}`}
      className="card card-artisan text-decoration-none text-dark h-100"
    >
      <div className="card-body">
        <h3 className="h5 card-title">{artisan.nom}</h3>
        <StarRating note={artisan.note} />
        <p className="card-text mb-1 mt-2">{artisan.specialite?.nom}</p>
        <p className="card-text text-muted small">{artisan.ville}</p>
      </div>
    </Link>
  );
}

export default ArtisanCard;
