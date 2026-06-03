// 1. Traemos las herramientas de Sequelize para definir tipos de datos (texto, números, etc.)
import { DataTypes } from 'sequelize';
// 2. Traemos la conexión a la base de datos que configuramos en la carpeta de arriba
import sequelize from '../sequelize.js';

const Outfit = sequelize.define('Outfit', {
  id_output: { // Respeto el nombre de tu cuaderno
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false // FK de quién creó el outfit
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  clima: { type: DataTypes.STRING }, // Clave para tu algoritmo de clima
  ocasion: { type: DataTypes.STRING },
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Outfit;
