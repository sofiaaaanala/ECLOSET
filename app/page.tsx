// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
//_________________________________
//export default function Home() { return <h1>Hola Mundo</h1> }


// 1. Importamos el componente Link para poder viajar entre pantallas
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f9f5ff', // Un fondo lila clarito hermoso para ECloset
      padding: '20px',
      textAlign: 'center'
    }}>
      
      {/* Título y Logo de bienvenida */}
      <h1 style={{ fontSize: '3rem', color: '#6b21a8', marginBottom: '10px' }}>
        ECloset 👗
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '30px', maxWidth: '400px' }}>
        Tu guardarropa inteligente y marketplace de moda circular en un solo lugar.
      </p>

      {/* Contenedor de los botones */}
      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* BOTÓN 1: Nos enruta a la carpeta /login */}
        <Link href="/login" style={{
          padding: '12px 24px',
          backgroundColor: '#7c3aed', // Violeta principal
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          Iniciar Sesión
        </Link>

        {/* BOTÓN 2: Nos enruta a la carpeta /register */}
        <Link href="/register" style={{
          padding: '12px 24px',
          backgroundColor: 'white',
          color: '#7c3aed',
          border: '2px solid #7c3aed',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          Crear Cuenta
        </Link>

      </div>

    </div>
  );
}
