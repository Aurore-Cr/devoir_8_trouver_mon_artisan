const { body } = require('express-validator');

// Validation + nettoyage des entrées du formulaire de contact (sécurité : anti-injection / XSS)
exports.contactValidationRules = [
  body('nom').trim().notEmpty().withMessage('Le nom est requis').escape(),
  body('email').trim().isEmail().withMessage('E-mail invalide').normalizeEmail(),
  body('objet').trim().notEmpty().withMessage("L'objet est requis").escape(),
  body('message').trim().notEmpty().withMessage('Le message est requis').escape(),
];
