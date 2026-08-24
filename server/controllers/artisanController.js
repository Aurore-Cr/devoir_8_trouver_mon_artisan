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
// Filtre possible par catégorie (?categorie=Batiment) et par recherche sur le nom (?recherche=dumont)
exports.getAllArtisans = async (req, res, next) => {
  try {
    const { categorie, recherche } = req.query;
    const where = {};
    const specialiteWhere = {};
    const categorieWhere = {};

    if (recherche) {
      where.nom = { [Op.like]: `%${recherche}%` };
    }
    if (categorie) {
      categorieWhere.nom = categorie;
    }

    const artisans = await Artisan.findAll({
      where,
      include: [
        {
          model: Specialite,
          as: 'specialite',
          attributes: ['id', 'nom'],
          where: Object.keys(specialiteWhere).length ? specialiteWhere : undefined,
          include: [
            {
              model: Categorie,
              as: 'categorie',
              attributes: ['id', 'nom'],
              where: Object.keys(categorieWhere).length ? categorieWhere : undefined,
            },
          ],
        },
      ],
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
