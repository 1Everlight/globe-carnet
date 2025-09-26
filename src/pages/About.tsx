export default function About() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Image de fond */}
            <img
                src="image.jpg"
                alt="fond"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Contenu */}
            <div className="relative z-10 container mx-auto p-6 space-y-8">
                {/* Titre */}
                <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">
                    🌍 À propos de GlobeCarnet
                </h1>

                {/* Présentation de l'application */}
                <section className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-3 text-indigo-200">L’application</h2>
                    <p>
                        <strong>GlobeCarnet</strong> est un projet que j’ai imaginé comme un carnet numérique.
                        L’idée est simple : permettre à chacun d’explorer, documenter et partager des informations
                        sur les pays du monde entier. Pas besoin de serveur : tout est stocké localement,
                        directement dans ton navigateur.
                    </p>
                    <p className="mt-2">
                        Tu peux ajouter des pays, raconter leur histoire, partager des traditions, des modes de vie
                        et même des images ou vidéos. C’est une mémoire collective qui grandit avec chaque contribution.
                    </p>
                </section>

                {/* À propos de moi */}
                <section className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-3 text-indigo-200">Qui suis-je ?</h2>
                    <p>
                        Je m’appelle <strong>TCHAGAFOU Fadèle</strong>, étudiant à l’<em>IAI Togo</em>.
                        Passionné par la tech, le design et l’exploration des cultures,
                        j’ai voulu créer une application qui mélange code, créativité et ouverture au monde.
                    </p>
                    <p className="mt-2">
                        Ce projet est né dans le cadre du <em>IAI WebJam 2025</em>,
                        mais il reflète aussi mon envie personnelle de bâtir des outils
                        qui relient les gens à travers leurs histoires et traditions.
                    </p>
                </section>

                {/* Contact */}
                <section className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg text-white text-center">
                    <h2 className="text-2xl font-bold mb-3 text-indigo-200">💬 Me contacter</h2>
                    <p>
                        Tu veux contribuer, discuter ou simplement partager une idée ? 
                        N’hésite pas à m’écrire !
                    </p>
                    <p className="mt-4">
                        📧 <a href="mailto:tonemail@example.com" className="underline hover:text-indigo-300">fadeletchagafou7@gmail.com</a>
                    </p>
                    <p className="mt-2">
                        📱 WhatsApp : <a href="https://wa.me/22871391266" className="underline hover:text-indigo-300">+228 71391266</a>
                    </p>
                </section>
            </div>
        </div>
    )
}
