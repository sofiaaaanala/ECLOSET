import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const OutfitPrenda = sequelize.define('OutfitPrenda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  outfit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'outfits',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  prenda_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'prendas',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'outfit_prendas',
  timestamps: true,
});

export default OutfitPrenda;