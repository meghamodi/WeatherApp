import { useState } from 'react';
export function Header(){
    const [nav,setNav] = useState(false);

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
            <div className="flex justify-between items-center max-w-screen-lg mx-auto">
            
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Weather Monitor
            </span>
            <button onClick={() => setNav(!nav)}>
            ☰
          </button>
        </div>
        {nav && (
          <div className="mt-2 flex flex-col gap-2">
            <a href="#">Home</a>
            <a href="#">Forecast</a>
          </div>
        )}
      </nav>
            
        </header>
    )
}

