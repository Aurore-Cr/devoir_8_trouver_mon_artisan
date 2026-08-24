const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Impossible de se connecter à la base de données :", error);
    process.exit(1);
  });
