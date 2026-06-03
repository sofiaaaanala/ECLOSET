import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Prenda = sequelize.define('Prenda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre de la prenda es obligatorio' },
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La imagen es obligatoria' },
    },
  },
  categoria: {
    type: DataTypes.ENUM('remera', 'pantalon', 'calzado', 'accesorio', 'abrigo', 'vestido', 'falda', 'otro'),
    allowNull: false,
    defaultValue: 'otro',
  },
  talle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  etiquetas: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    comment: 'Array de etiquetas personalizables (ej: casual, elegante, invierno)',
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'prendas',
  timestamps: true,
});

export default Prenda;