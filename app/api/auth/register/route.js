import { NextResponse } from 'next/server';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const User = sequelize.define('User', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
}, { timestamps: true });

export async function POST(request) {
  try {
    await sequelize.sync();
    
    const { username, email, password } = await request.json();
    
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }
    
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 400 });
    }
    
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return NextResponse.json({ error: 'El nombre de usuario ya existe' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'mi_secreto_temporal',
      { expiresIn: '7d' }
    );
    
    return NextResponse.json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}