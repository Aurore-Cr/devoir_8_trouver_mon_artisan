import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import StarRating from '../components/StarRating/StarRating';
import { getArtisanById, contactArtisan } from '../services/api';

const CHAMPS_INITIAUX = { nom: '', email: '', objet: '', message: '' };

function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [formData, setFormData] = useState(CHAMPS_INITIAUX);
  const [statut, setStatut] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    getArtisanById(id)
      .then(setArtisan)
      .catch(() => setArtisan(null));
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await contactArtisan(id, formData);
      setStatut('success');
      setFormData(CHAMPS_INITIAUX);
    } catch (error) {
      setStatut('error');
    }
  };

  if (!artisan) return null;

  return (
    <>
      <Helmet>
        <title>{artisan.nom} | Trouve ton artisan</title>
        <meta name="description" content={`Fiche artisan de ${artisan.nom}, ${artisan.specialite?.nom} à ${artisan.ville}`} />
      </Helmet>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            {artisan.image && (
              <img src={artisan.image} alt={artisan.nom} className="img-fluid rounded" />
            )}
          </div>

          <div className="col-12 col-md-7">
            <h1>{artisan.nom}</h1>
            <StarRating note={artisan.note} />
            <p className="mt-2">{artisan.specialite?.nom} — {artisan.ville}</p>

            <h2 className="h5 mt-4">À propos</h2>
            <p>{artisan.a_propos}</p>

            {artisan.site_web && (
              <p>
                <a href={artisan.site_web} target="_blank" rel="noreferrer noopener">
                  Visiter le site web
                </a>
              </p>
            )}
          </div>
        </div>

        <section className="mt-5" aria-labelledby="contact-artisan">
          <h2 id="contact-artisan" className="h4">Contacter {artisan.nom}</h2>

          {statut === 'success' && (
            <p className="text-success" role="status">Votre message a bien été envoyé.</p>
          )}
          {statut === 'error' && (
            <p className="text-danger" role="alert">Une erreur est survenue, veuillez réessayer.</p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom</label>
              <input id="nom" name="nom" type="text" className="form-control" value={formData.nom} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input id="email" name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="objet" className="form-label">Objet</label>
              <input id="objet" name="objet" type="text" className="form-control" value={formData.objet} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" className="form-control" rows="5" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Envoyer</button>
          </form>
        </section>
      </section>
    </>
  );
}

export default ArtisanDetail;
