import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import image404 from "../assets/img/404.jpg";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page non trouvée | Trouve ton artisan</title>

        <meta
          name="description"
          content="La page que vous avez demandée n'existe pas."
        />
      </Helmet>

      <section className="container py-5 text-center">
        <img
          src={image404}
          alt="Page non trouvée"
          className="img-fluid mb-4"
          style={{
            maxWidth: "350px",
            width: "100%",
            height: "auto",
          }}
        />

        <p className="mb-4">
          La page que vous avez demandée n'existe pas ou plus.
        </p>

        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </section>
    </>
  );
}

export default NotFound;
