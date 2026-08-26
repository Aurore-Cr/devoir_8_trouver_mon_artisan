// Affiche une note sur 5 avec des étoiles (accessibilité : texte alternatif pour lecteurs d'écran)
function StarRating({ note }) {
  const fullStars = Math.round(note);

  return (
    <div className="d-flex align-items-center gap-1" role="img" aria-label={`Note : ${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} aria-hidden="true">
          {star <= fullStars ? '★' : '☆'}
        </span>
      ))}
      <span className="ms-1 small">{note}/5</span>
    </div>
  );
}

export default StarRating;
