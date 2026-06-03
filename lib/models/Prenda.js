// 1. Traemos las herramientas de Sequelize para definir tipos de datos (texto, números, etc.)
import { DataTypes } from 'sequelize';
// 2. Traemos la conexión a la base de datos que configuramos en la carpeta de arriba
import sequelize from '../sequelize.js';

const Prenda = sequelize.define('Prenda', {
  id_prenda: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false // Clave Foránea (FK) de quién es la prenda
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  temporada: { type: DataTypes.STRING },
  marca: { type: DataTypes.STRING },
  talle: { type: DataTypes.STRING },
  imagen_url: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.TEXT },
  fecha_venta: { type: DataTypes.DATE },
  precio: { type: DataTypes.FLOAT },
  descuento: { type: DataTypes.FLOAT, defaultValue: 0 }
});

module.exports = Prenda;
