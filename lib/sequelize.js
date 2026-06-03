import { Sequelize } from 'sequelize';

// Configuración para SQLite (sin servidor externo)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // archivo de base de datos
  logging: false, // cambia a true si quieres ver las consultas SQL en consola
  define: {
    timestamps: true,
    underscored: true,
  },
});

export { sequelize };