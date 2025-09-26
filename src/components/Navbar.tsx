import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">

                <Link
                    to="/"
                    className="font-bold text-lg sm:text-xl md:text-2xl"
                >

                    <span className="hidden sm:inline">GlobeCarnet</span>
                </Link>

                {/* Menu de navigation */}
                <nav className="space-x-3 sm:space-x-4 text-sm sm:text-base">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? 'underline' : ''}`
                        }
                    >
                        Accueil
                    </NavLink>
                    <NavLink
                        to="/countries"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? 'underline' : ''}`
                        }
                    >
                        Liste des pays
                    </NavLink>
                    <NavLink
                        to="/add"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? 'underline' : ''}`
                        }
                    >
                        Ajouter un pays
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? 'underline' : ''}`
                        }
                    >
                        À propos
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
