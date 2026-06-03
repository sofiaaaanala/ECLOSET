// //Primera tabla de prueba y con explicacion

// // 1. Traemos las herramientas de Sequelize para definir tipos de datos (texto, números, etc.)
// import { DataTypes } from 'sequelize';
// // 2. Traemos la conexión a la base de datos que configuramos en la carpeta de arriba
// import sequelize from '../sequelize.js';

// // 3. Definimos la tabla 'Usuario' con sus columnas
// const Usuario = sequelize.define('Usuario', {
//   id: {
//     type: DataTypes.INTEGER, // Es un número entero
//     primaryKey: true,        // Es la clave única de este usuario (como un DNI)
//     autoIncrement: true      // Sequelize le suma 1 automáticamente a cada usuario nuevo (1, 2, 3...)
//   },
//   nombre: {
//     type: DataTypes.STRING,  // Es un texto corto
//     allowNull: false         // OBLIGATORIO: No puede quedar vacío
//   },
//   email: {
//     type: DataTypes.STRING,  // Es un texto corto
//     allowNull: false,        // OBLIGATORIO
//     unique: true             // REGLA: No pueden existir dos usuarios con el mismo email
//   },
//   contrasena: {
//     type: DataTypes.STRING,  // Es un texto corto (aquí irá la contraseña encriptada)
//     allowNull: false         // OBLIGATORIO
//   }
// });

// // 4. Exportamos el modelo para poder usarlo en los archivos de Login o Registro
// export default Usuario;


// 1. Traemos las herramientas de Sequelize para definir tipos de datos (texto, números, etc.)
import { DataTypes } from 'sequelize';
// 2. Traemos la conexión a la base de datos que configuramos en la carpeta de arriba
import sequelize from '../sequelize.js';

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  mail: { type: DataTypes.STRING, allowNull: false, unique: true },
  contrasena: { type: DataTypes.STRING, allowNull: false },
  foto_perfil: { type: DataTypes.STRING },
  ubicacion: { type: DataTypes.STRING },
  estilo: { type: DataTypes.STRING },
  reputacion: { type: DataTypes.FLOAT, defaultValue: 0 }, // Para reseñas/puntuación
  fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Usuario;
