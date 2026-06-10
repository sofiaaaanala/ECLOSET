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
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 });
    }
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'mi_secreto_temporal',
      { expiresIn: '7d' }
    );
    
    return NextResponse.json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}