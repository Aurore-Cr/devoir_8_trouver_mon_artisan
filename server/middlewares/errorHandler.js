// Middleware centralisé de gestion des erreurs et exceptions
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? 'Erreur interne du serveur' : err.message,
  });
};
