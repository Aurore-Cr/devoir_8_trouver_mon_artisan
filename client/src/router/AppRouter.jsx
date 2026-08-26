import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ArtisanList from "../pages/ArtisanList";
import ArtisanDetail from "../pages/ArtisanDetail";
import LegalPage from "../pages/LegalPage";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artisans" element={<ArtisanList />} />
      <Route path="/artisan/:id" element={<ArtisanDetail />} />
      <Route
        path="/mentions-legales"
        element={<LegalPage titre="Mentions légales" />}
      />
      <Route
        path="/donnees-personnelles"
        element={<LegalPage titre="Données personnelles" />}
      />
      <Route
        path="/accessibilite"
        element={<LegalPage titre="Accessibilité" />}
      />
      <Route path="/cookies" element={<LegalPage titre="Cookies" />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
