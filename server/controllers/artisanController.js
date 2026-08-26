const { Op } = require('sequelize');
const { Artisan, Specialite, Categorie } = require('../models');

const includeSpecialite = [
  {
    model: Specialite,
    as: 'specialite',
    attributes: ['id', 'nom'],
    include: [{ model: Categorie, as: 'categorie', attributes: ['id', 'nom'] }],
  },
];

// GET /api/artisans
// Filtre possible par categorie (?categorie=Batiment) et par recherche sur le nom (?recherche=dumont)
exports.getAllArtisans = async (req, res, next) => {
  try {
    const { categorie, recherche } = req.query;
    const where = {};

    if (recherche) {
      where.nom = { [Op.like]: `%${recherche}%` };
    }

    const specialiteInclude = {
      model: Specialite,
      as: 'specialite',
      attributes: ['id', 'nom'],
      include: [{ model: Categorie, as: 'categorie', attributes: ['id', 'nom'] }],
    };

    if (categorie) {
      // On resout d'abord le nom de categorie en id, puis on filtre directement
      // sur specialite.categorie_id : un seul niveau de "where", donc pas besoin
      // de jongler avec "required" sur un include imbrique a deux niveaux.
      const categorieTrouvee = await Categorie.findOne({ where: { nom: categorie } });

      if (!categorieTrouvee) {
        // Categorie inconnue (faute de frappe dans l'URL, etc.) : aucun resultat,
        // sans provoquer d'erreur.
        return res.json([]);
      }

      specialiteInclude.where = { categorie_id: categorieTrouvee.id };
      specialiteInclude.required = true;
    }

    const artisans = await Artisan.findAll({
      where,
      include: [specialiteInclude],
      order: [['nom', 'ASC']],
    });

    res.json(artisans);
  } catch (error) {
    next(error);
  }
};

// GET /api/artisans/top
// Les 3 artisans du mois (flag "top" en base)
exports.getTopArtisans = async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: includeSpecialite,
      limit: 3,
    });
    res.json(artisans);
  } catch (error) {
    next(error);
  }
};

// GET /api/artisans/:id
exports.getArtisanById = async (req, res, next) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, { include: includeSpecialite });
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }
    res.json(artisan);
  } catch (error) {
    next(error);
  }
};
