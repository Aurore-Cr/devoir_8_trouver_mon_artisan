const { Categorie, Specialite } = require('../models');

// GET /api/categories
// Sert notamment à alimenter les liens du menu du header depuis la BDD
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categorie.findAll({
      include: [{ model: Specialite, as: 'specialites', attributes: ['id', 'nom'] }],
      order: [['nom', 'ASC']],
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
