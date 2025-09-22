
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


export default function Home() {
    return (
        <div className="container">
            <section className="bg-[url('/hero-globe.jpg')] bg-center bg-cover rounded-xl overflow-hidden p-12 text-white shadow-md" style={{ backgroundColor: 'rgba(2,6,23,0.4)' }}>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold">GlobeCarnet</motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9 }} className="mt-4 max-w-2xl">Explore, enrichis, et célèbre la mémoire des peuples — une carte, des histoires, une expérience client-side.</motion.p>
                <div className="mt-6">
                    <Link to="/countries" className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-md font-semibold">Explorer les pays</Link>
                    <Link to="/add" className="ml-4 inline-block bg-transparent border border-white px-5 py-3 rounded-md">Ajouter un pays</Link>
                </div>
            </section>


            <section className="mt-8">
                <h2 className="text-2xl font-semibold">Découvrir rapidement</h2>
                <p className="text-sm text-gray-600">Des exemples prêts pour la démo — ajoute tes propres pays ensuite.</p>
            </section>
        </div>
    )
}