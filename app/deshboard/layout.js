// app/deshboard/layout.js
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  // 1. Leemos la cookie donde tu "api/auth/login" guardó el token de la sesión
  const cookieStore = await cookies();
  const token = cookieStore.get('session-token'); 
  const userRole = cookieStore.get('user-role')?.value; // Ej: 'user' o 'admin'

  // 2. Si el token no existe, significa que la usuaria no se logueó.
  // La rebotamos automáticamente a la pantalla de login antes de que vea nada.
  if (!token) {
    redirect('/login');
  }

  // 3. Control de Roles para ECloset (Simple y directo)
  // Si en un futuro tienen una sección /deshboard/admin y entra alguien común, lo sacamos.
  if (userRole === 'baneado') {
    redirect('/login?error=cuenta_suspendida');
  }

  // 4. Si pasó el control con éxito, se muestra el contenido del dashboard.
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 💡 TIP: Acá adentro pueden armar una barra lateral común (Sidebar) 
          que tengan todas las pantallas privadas de ECloset */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="font-bold text-lg text-purple-600 mb-6">ECloset 👗</h2>
        <nav className="flex flex-col gap-2">
          <a href="/deshboard" className="p-2 hover:bg-gray-100 rounded">Inicio</a>
          <a href="/deshboard/closet" className="p-2 hover:bg-gray-100 rounded">Mi Closet</a>
          <a href="/deshboard/outfits" className="p-2 hover:bg-gray-100 rounded">Mis Outfits</a>
        </nav>
      </aside>

      {/* 'children' es la página actual que se va a renderizar al lado del menú */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
