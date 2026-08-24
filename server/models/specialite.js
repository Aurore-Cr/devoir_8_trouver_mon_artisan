const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Specialite extends Model {}

// Une spécialité est rattachée à une seule catégorie (voir models/index.js pour l'association)
Specialite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    categorie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Specialite',
    tableName: 'specialite',
    timestamps: false,
  }
);

module.exports = Specialite;
