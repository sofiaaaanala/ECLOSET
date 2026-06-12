'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
     
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Error al registrarse');
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/onboarding');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Crear cuenta</h1>
          <p className="text-gray-500 mt-2">Únete a ECloset</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nombre de usuario *</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({...form, username: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="ej: moda_lover"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Correo electrónico *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Contraseña *</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirmar contraseña *</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Repite tu contraseña"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{' '}
          <link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
            Inicia sesión
          </link>
        </p>
      </div>
    </div>
  );
}