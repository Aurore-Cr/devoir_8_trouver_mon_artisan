import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Barre de recherche : fait ressortir les artisans en cherchant sur leur nom
function SearchBar() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      navigate(`/artisans?recherche=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form role="search" className="d-flex" onSubmit={handleSubmit}>
      <label htmlFor="search-artisan" className="visually-hidden">
        Rechercher un artisan par son nom
      </label>
      <input
        id="search-artisan"
        type="search"
        className="form-control"
        placeholder="Rechercher un artisan..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className="btn btn-primary ms-2">
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;
