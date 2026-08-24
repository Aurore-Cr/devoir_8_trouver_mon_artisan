import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { getCategories } from '../../services/api';
import logo from '../../assets/img/Logo.png';

// Header commun à toutes les pages : logo, menu (catégories issues de la BDD), barre de recherche
function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <header className="border-bottom bg-white">
      <div className="container d-flex flex-wrap align-items-center justify-content-between py-3 gap-3">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src={logo} alt="Trouve ton artisan - retour à l'accueil" height="40" />
        </Link>

        <nav aria-label="Navigation principale">
          <ul className="nav">
            {categories.map((categorie) => (
              <li className="nav-item" key={categorie.id}>
                <NavLink to={`/artisans?categorie=${encodeURIComponent(categorie.nom)}`} className="nav-link">
                  {categorie.nom}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ minWidth: '250px' }}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
