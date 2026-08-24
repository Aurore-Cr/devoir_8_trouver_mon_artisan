const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const artisanRoutes = require("./routes/artisanRoutes");
const categorieRoutes = require("./routes/categorieRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    message: "API Trouve ton artisan opérationnelle",
  });
});

app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categorieRoutes);

module.exports = app;
