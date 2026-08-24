const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Categorie extends Model {}

Categorie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Categorie',
    tableName: 'categorie',
    timestamps: false,
  }
);

module.exports = Categorie;
