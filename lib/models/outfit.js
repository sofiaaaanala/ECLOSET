import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Outfit = sequelize.define('Outfit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre del outfit es obligatorio' },
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Imagen generada del outfit completo',
  },
  ocasiones: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    comment: 'Array de ocasiones (fiesta, trabajo, deporte, casual)',
  },
  temporada: {
    type: DataTypes.ENUM('primavera', 'verano', 'otono', 'invierno', 'todo'),
    allowNull: true,
    defaultValue: 'todo',
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
  tableName: 'outfits',
  timestamps: true,
});

export default Outfit;