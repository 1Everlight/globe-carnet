import { useEffect, useState } from 'react'
import { loadCountries } from '../storage/localStorage'
import CountryCard from '../components/CountryCard'

export default function CountriesList() {
    const [list, setList] = useState(() => loadCountries())

    useEffect(() => {
        setList(loadCountries())
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Image de fond */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: "url('image.jpg')",
                    filter: "brightness(0.6) blur(2px)",
                }}
            ></div>

            {/* Overlay léger en plus */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Contenu principal */}
            <div className="relative z-10 container py-8">
                <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
                    Liste des pays
                </h1>

                {list.length === 0 ? (
                    <div className="p-8 bg-white/20 backdrop-blur-md rounded-xl shadow-lg text-gray-100">
                        Aucun pays pour le moment. Utilise « Ajouter un pays » pour commencer.
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {list.map(c => (
                            <div
                                key={c.id}
                                className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                            >
                                <CountryCard c={c} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
