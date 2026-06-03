// Esto es para la conexión a la base de datos usando Sequelize
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  // Guardamos el archivo .sqlite en la raíz para que sea fácil de encontrar
  storage: './mi_base_de_datos.sqlite' 
});

export default sequelize;
