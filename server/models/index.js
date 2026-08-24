const sequelize = require('../config/database');
const Categorie = require('./categorie');
const Specialite = require('./specialite');
const Artisan = require('./artisan');

// Une catégorie a plusieurs spécialités / une spécialité appartient à une catégorie
Categorie.hasMany(Specialite, { foreignKey: 'categorie_id', as: 'specialites' });
Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });

// Une spécialité a plusieurs artisans / un artisan appartient à une spécialité
Specialite.hasMany(Artisan, { foreignKey: 'specialite_id', as: 'artisans' });
Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id', as: 'specialite' });

module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan,
};
