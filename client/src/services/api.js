const API_URL = import.meta.env.VITE_API_URL;

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Une erreur est survenue');
  }
  return response.json();
}

export const getCategories = () => fetch(`${API_URL}/categories`).then(handleResponse);

export const getArtisans = ({ categorie, recherche } = {}) => {
  const params = new URLSearchParams();
  if (categorie) params.set('categorie', categorie);
  if (recherche) params.set('recherche', recherche);
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetch(`${API_URL}/artisans${query}`).then(handleResponse);
};

export const getTopArtisans = () => fetch(`${API_URL}/artisans/top`).then(handleResponse);

export const getArtisanById = (id) => fetch(`${API_URL}/artisans/${id}`).then(handleResponse);

export const contactArtisan = (id, payload) =>
  fetch(`${API_URL}/artisans/${id}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handleResponse);
