import { Link, NavLink } from 'react-router-dom'


export default function Navbar() {




    return (
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
            <div className="container flex items-center justify-between py-4">
                <Link to="/" className="font-bold text-xl">GlobeCarnet</Link>

                <nav className="space-x-4">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'underline' : ''}>Accueil</NavLink>
                    <NavLink to="/countries" className={({ isActive }) => isActive ? 'underline' : ''}>Liste des pays</NavLink>
                    <NavLink to="/add" className={({ isActive }) => isActive ? 'underline' : ''}>Ajouter un pays</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'underline' : ''}>À propos</NavLink>
                </nav>

                
            </div>
        </header>
    )
}
