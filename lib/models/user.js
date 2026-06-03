import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Debe ser un correo electrónico válido' },
      notEmpty: { msg: 'El email es obligatorio' },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 30],
        msg: 'El nombre de usuario debe tener entre 3 y 30 caracteres',
      },
      notEmpty: { msg: 'El nombre de usuario es obligatorio' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La contraseña es obligatoria' },
      len: {
        args: [6, 100],
        msg: 'La contraseña debe tener al menos 6 caracteres',
      },
    },
  },
  zona: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Ubicación aproximada del usuario (ciudad/zona)',
  },
  // Estos campos serán para el formulario de preferencias (HU-005)
  estilo_ropa: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array de estilos de ropa preferidos',
  },
  preferencias_colores: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array de colores preferidos',
  },
  talle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/default-avatar.png',
  },
  reputacion: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
    comment: 'Promedio de calificaciones (0-5)',
  },
  // Para saber si ya completó el formulario de preferencias (HU-005)
  preferencias_completadas: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'users',
  timestamps: true, // agrega createdAt y updatedAt
  hooks: {
    // Hash de la contraseña antes de crear el usuario
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    // Hash de la contraseña antes de actualizar si cambió
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

// Método de instancia para comparar contraseñas
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para excluir datos sensibles al enviar al cliente
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

export default User;