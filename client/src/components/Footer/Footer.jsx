import { Link } from 'react-router-dom';

// Footer commun à toutes les pages : liens légaux + coordonnées de l'antenne de Lyon
function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <div className="container d-flex flex-wrap justify-content-between gap-4">
        <nav aria-label="Pages légales">
          <ul className="list-unstyled">
            <li><Link to="/mentions-legales" className="text-light">Mentions légales</Link></li>
            <li><Link to="/donnees-personnelles" className="text-light">Données personnelles</Link></li>
            <li><Link to="/accessibilite" className="text-light">Accessibilité</Link></li>
            <li><Link to="/cookies" className="text-light">Cookies</Link></li>
          </ul>
        </nav>

        <address className="mb-0">
          Région Auvergne-Rhône-Alpes<br />
          101 cours Charlemagne<br />
          CS 20033<br />
          69269 Lyon Cedex 02, France<br />
          <a href="tel:+33426734000" className="text-light">+33 (0)4 26 73 40 00</a>
        </address>
      </div>
    </footer>
  );
}

export default Footer;
