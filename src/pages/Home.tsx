import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
    return (
        <div className="relative min-h-screen">
            {/* Vidéo en arrière-plan */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/video.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo HTML5.
            </video>

            {/* Overlay sombre pour lisibilité */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Contenu au-dessus */}
            <div className="relative z-20 container mx-auto p-6">
                <section className="rounded-xl p-12 text-white shadow-md">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold"
                    >
                        GlobeCarnet
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9 }}
                        className="mt-4 max-w-2xl"
                    >
                        Explore, enrichis et célèbre la mémoire des peuples — un carnet vivant où chaque pays devient une histoire à inscrire dans ton voyage.
                        Lance-toi dans ton propre voyage et crée ton carnet des pays du monde, un espace unique où chaque découverte devient une page de ton histoire.
                    </motion.p>


                    <div className="mt-6">
                        <Link to="/countries" className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-md font-semibold">
                            Explorer les pays
                        </Link>
                        <Link to="/add" className="ml-4 inline-block bg-transparent border border-white px-5 py-3 rounded-md">
                            Ajouter un pays
                        </Link>
                    </div>
                </section>

                <section className="mt-8 text-white">
                    <h2 className="text-2xl font-semibold">Découvrir rapidement</h2>
                    <p className="text-sm mt-2">
                        Globe Carnet – Un Monde Sans Frontières 🌍✨
                        Plongez dans un voyage interactif où chaque pays raconte son histoire, dévoile ses lieux emblématiques, ses traditions vibrantes et son quotidien fascinant. Ici, les cartes prennent vie, les images et vidéos vous transportent, et chaque section devient un carnet numérique unique.
                        Mais le monde est vaste, et je ne peux pas tout explorer seule! 🌟
                        Aidez-moi à enrichir ce Globe Carnet: ajoutez vos pays, partagez leurs trésors cachés et contribuez à cette aventure collective, où chaque clic fait grandir notre monde sans frontières.
                    </p>
                </section>
            </div>
        </div>
    )
}
