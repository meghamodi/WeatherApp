import { useState } from 'react';
export function Header(){
    const [nav,setNav] = useState(false);

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg">
            <a href="#" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Weather Monitor
                </span>
            </a>
            </div>
            </nav>
        </header>
    )
}

