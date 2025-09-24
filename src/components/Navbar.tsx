import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        // Applique le thème sur le <html>
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(theme)
    }, [theme])

    function toggleTheme() {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <header className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white">
            <div className="container flex items-center justify-between py-4">
                <Link to="/" className="font-bold text-xl">GlobeCarnet</Link>

                <nav className="space-x-4">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'underline' : ''}>Accueil</NavLink>
                    <NavLink to="/countries" className={({ isActive }) => isActive ? 'underline' : ''}>Liste des pays</NavLink>
                    <NavLink to="/add" className={({ isActive }) => isActive ? 'underline' : ''}>Ajouter un pays</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'underline' : ''}>À propos</NavLink>
                </nav>

                <button
                    onClick={toggleTheme}
                    className="ml-4 px-3 py-2 bg-white text-black rounded"
                >
                    {theme === 'light' ? '🌙 Mode sombre' : '☀️ Mode clair'}
                </button>
            </div>
        </header>
    )
}
