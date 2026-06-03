import User from './User.js';
import Prenda from './Prenda.js';
import Outfit from './Outfit.js';
import OutfitPrenda from './OutfitPrenda.js';
import { sequelize } from '../sequelize.js';

// ========== ESTABLECER RELACIONES ==========

// Usuario -> Prendas (1 a muchos)
User.hasMany(Prenda, { foreignKey: 'usuario_id', as: 'prendas' });
Prenda.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

// Usuario -> Outfits (1 a muchos)
User.hasMany(Outfit, { foreignKey: 'usuario_id', as: 'outfits' });
Outfit.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

// Outfit <-> Prenda (muchos a muchos a través de OutfitPrenda)
Outfit.belongsToMany(Prenda, {
  through: OutfitPrenda,
  foreignKey: 'outfit_id',
  otherKey: 'prenda_id',
  as: 'prendas',
});

Prenda.belongsToMany(Outfit, {
  through: OutfitPrenda,
  foreignKey: 'prenda_id',
  otherKey: 'outfit_id',
  as: 'outfits',
});

// ========== FUNCIÓN DE SINCRONIZACIÓN ==========

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');
    
    // Sincronizar en orden (primero tablas sin dependencias)
    await sequelize.sync({ alter: true });
    console.log('✅ Tablas sincronizadas: usuarios, prendas, outfits, outfit_prendas');
  } catch (error) {
    console.error('❌ Error al sincronizar:', error);
  }
};

export { User, Prenda, Outfit, OutfitPrenda, syncDatabase };