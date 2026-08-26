require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const artisanRoutes = require("./routes/artisanRoutes");
const categorieRoutes = require("./routes/categorieRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());

// Securite : acces a l'API limite a l'application front (whitelist CORS, jamais de "*").
// On accepte l'origine declaree dans CLIENT_URL ainsi que ses variantes locales
// habituelles (localhost/127.0.0.1), car Vite change parfois de port automatiquement
// si le port par defaut (5173) est deja occupe.
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const clientPort = clientUrl.split(":").pop();
const allowedOrigins = [
  clientUrl,
  `http://localhost:${clientPort}`,
  `http://127.0.0.1:${clientPort}`,
];

app.use(
  cors({
    origin(origin, callback) {
      // "origin" est undefined pour les outils comme curl/Postman : on autorise
      // (utile en dev), mais un navigateur enverra toujours une vraie origine.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origine non autorisée par la politique CORS"));
    },
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    message: "API Trouve ton artisan operationnelle",
  });
});

app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categorieRoutes);

// IMPORTANT : le gestionnaire d'erreurs doit toujours etre enregistre en DERNIER,
// apres toutes les routes, sinon les erreurs remontees via next(error) ne sont
// jamais interceptees et Express renvoie une page HTML au lieu de JSON.
app.use(errorHandler);

module.exports = app;
