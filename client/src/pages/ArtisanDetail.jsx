import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logoArtisan from "../assets/img/logo_artisan.jpg";

import StarRating from "../components/StarRating/StarRating";
import { getArtisanById, contactArtisan } from "../services/api";

const CHAMPS_INITIAUX = {
  nom: "",
  email: "",
  objet: "",
  message: "",
};

function ArtisanDetail() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState(CHAMPS_INITIAUX);
  const [statut, setStatut] = useState(null);

  useEffect(() => {
    const chargerArtisan = async () => {
      setLoading(true);
      setNotFound(false);
      setArtisan(null);

      try {
        if (!id) {
          setNotFound(true);
          return;
        }

        const data = await getArtisanById(id);

        console.log("Artisan reçu par l'API :", data);

        setArtisan(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'artisan :", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    chargerArtisan();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((ancienFormulaire) => ({
      ...ancienFormulaire,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatut(null);

    try {
      await contactArtisan(id, formData);

      setStatut("success");
      setFormData(CHAMPS_INITIAUX);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setStatut("error");
    }
  };

  /*
   * =========================
   * CHARGEMENT
   * =========================
   */

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Chargement | Trouve ton artisan</title>
        </Helmet>

        <main className="container py-5">
          <div className="text-center">
            <p>Chargement de la fiche artisan...</p>
          </div>
        </main>
      </>
    );
  }

  /*
   * =========================
   * ARTISAN INTROUVABLE
   * =========================
   */

  if (notFound || !artisan) {
    return (
      <>
        <Helmet>
          <title>Artisan introuvable | Trouve ton artisan</title>
        </Helmet>

        <main className="container py-5 text-center">
          <img
            src="/src/assets/img/404.jpg"
            alt="Page introuvable"
            className="img-fluid mb-4"
            style={{ maxWidth: "400px" }}
          />

          <h1>Artisan introuvable</h1>

          <p className="mb-4">
            Cet artisan n'existe pas ou n'est plus disponible.
          </p>

          <Link to="/artisans" className="btn btn-primary">
            Voir tous les artisans
          </Link>
        </main>
      </>
    );
  }

  /*
   * =========================
   * DONNÉES SÉCURISÉES
   * =========================
   */

  const nom = artisan.nom || "Artisan";
  const ville = artisan.ville || "Ville non renseignée";

  const specialite =
    artisan.specialite?.nom ||
    artisan.specialite ||
    "Spécialité non renseignée";

  const aPropos =
    artisan.a_propos ||
    artisan.apropos ||
    "Aucune information disponible pour cet artisan.";

  const note = artisan.note || 0;

  /*
   * =========================
   * PAGE
   * =========================
   */

  return (
    <>
      <Helmet>
        <title>{nom} | Trouve ton artisan</title>

        <meta
          name="description"
          content={`Fiche artisan de ${nom}, ${specialite} à ${ville}`}
        />
      </Helmet>

      <main className="container py-5">
        {/* =========================
            INFORMATIONS ARTISAN
        ========================= */}

        <div className="row g-4 align-items-start">
          {/* IMAGE */}

          <div className="col-12 col-md-5">
            <img
              src={logoArtisan}
              alt={`Illustration de ${nom}`}
              className="img-fluid rounded"
            />
          </div>

          {/* INFORMATIONS */}

          <div className="col-12 col-md-7">
            <h1>{nom}</h1>

            <div className="mb-3">
              <StarRating note={note} />
            </div>

            <p className="mt-2">
              <strong>{specialite}</strong> — {ville}
            </p>

            <h2 className="h5 mt-4">À propos</h2>

            <p>{aPropos}</p>

            {/* SITE INTERNET */}

            {artisan.site_web && (
              <p className="mt-4">
                <a
                  href={"../pages/NotFound.jsx"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary"
                >
                  Visiter le site web
                </a>
              </p>
            )}
          </div>
        </div>

        {/* =========================
            FORMULAIRE CONTACT
        ========================= */}

        <section className="mt-5" aria-labelledby="contact-artisan">
          <h2 id="contact-artisan" className="h4">
            Contacter {nom}
          </h2>

          {/* MESSAGE SUCCÈS */}

          {statut === "success" && (
            <div className="alert alert-success" role="status">
              Votre message a bien été envoyé.
            </div>
          )}

          {/* MESSAGE ERREUR */}

          {statut === "error" && (
            <div className="alert alert-danger" role="alert">
              Une erreur est survenue, veuillez réessayer.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* NOM */}

            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>

              <input
                id="nom"
                name="nom"
                type="text"
                className="form-control"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* OBJET */}

            <div className="mb-3">
              <label htmlFor="objet" className="form-label">
                Objet
              </label>

              <input
                id="objet"
                name="objet"
                type="text"
                className="form-control"
                value={formData.objet}
                onChange={handleChange}
                required
              />
            </div>

            {/* MESSAGE */}

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* BOUTON */}

            <button type="submit" className="btn btn-primary">
              Envoyer
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default ArtisanDetail;
