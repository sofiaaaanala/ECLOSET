import User from './User.js';
import { sequelize } from '../sequelize.js';

// Aquí iremos agregando más modelos a medida que avance el proyecto
// Por ejemplo: Prenda, Outfit, Publicacion, etc.

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');
    
    // Sincroniza los modelos con la base de datos
    // force: false evita eliminar datos existentes
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados correctamente.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  }
};

export { User, syncDatabase };