import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCountryById, saveCountry } from '../storage/localStorage'
import { useState } from 'react'
import type { Country, MediaItem } from '../types'

export default function CountryDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const country = id ? getCountryById(id) : undefined

    const [selectedMedia, setSelectedMedia] = useState<MediaItem | { url: string; type: 'image' | 'video'; caption: string } | null>(null)

    if (!country) return (
        <div className="relative min-h-screen overflow-hidden">
            <img src="/image.jpg" alt="fond" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative z-10 container mx-auto p-8">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
                    Pays non trouvé. 
                    <button onClick={() => navigate('/countries')} className="text-sky-200 ml-2 underline">Retour liste</button>
                </div>
            </div>
        </div>
    )

    // --- Assertion que country n'est pas undefined ---
    const c: Country = country

    function removeMedia(mediaId: string) {
        if (!confirm('Supprimer ce média ?')) return
        c.media = c.media.filter(m => m.id !== mediaId)
        saveCountry(c)
        navigate(0)
    }

    function removeVisual(url: string) {
        if (!confirm('Supprimer ce visuel ?')) return
        c.lifestyle.visualIds = c.lifestyle.visualIds.filter(u => u !== url)
        saveCountry(c)
        navigate(0)
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            <img src="/image.jpg" alt="fond" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative z-10 container mx-auto py-10 space-y-8">
                <div className="flex items-start gap-8 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 text-white">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl font-bold text-sky-200">{c.name}</h1>
                        <p className="text-gray-200">{c.region} · {c.isoCode || ''}</p>
                        <p className="leading-relaxed">{c.summary}</p>

                        {/* 🌍 Lieux touristiques */}
                        {c.topAttractions && c.topAttractions.length > 0 && (
                            <section>
                                <h2 className="font-semibold text-xl text-sky-300">Lieux touristiques</h2>
                                <ul className="mt-3 list-disc list-inside space-y-1">
                                    {c.topAttractions.map((place, i) => (
                                        <li key={i} className="text-gray-200">{place}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* 📸 Médias */}
                        <section>
                            <h2 className="font-semibold text-xl text-sky-300">Galerie</h2>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                                {c.media.filter(m => m.type === 'image').map(img => (
                                    <div key={img.id} className="relative group cursor-pointer">
                                        <img 
                                            src={img.url} 
                                            alt={img.caption || c.name} 
                                            className="w-full h-40 object-cover rounded-lg shadow group-hover:scale-105 transition"
                                            onClick={() => setSelectedMedia(img)}
                                        />
                                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                            {img.caption || 'Sans description'}
                                        </div>
                                        <button 
                                            onClick={() => removeMedia(img.id)} 
                                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-80 hover:opacity-100"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 📜 Histoire */}
                        <section>
                            <h2 className="font-semibold text-xl text-sky-300">Histoire</h2>
                            <div className="mt-3 space-y-4">
                                {c.history.map(ev => (
                                    <div key={ev.id} className="p-4 bg-white/20 backdrop-blur-md rounded-lg shadow text-white">
                                        <div className="text-sm text-gray-200">{ev.year}</div>
                                        <div className="font-semibold">{ev.title}</div>
                                        <div>{ev.description}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 🎭 Traditions */}
                        <section>
                            <h2 className="font-semibold text-xl text-sky-300">Traditions & coutumes</h2>
                            <div className="mt-3 space-y-3">
                                {c.traditions.map(t => (
                                    <div key={t.id} className="p-3 bg-white/20 backdrop-blur-md rounded-lg shadow">
                                        <div className="font-semibold">{t.title}</div>
                                        <p>{t.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 👥 Mode de vie */}
                        <section>
                            <h2 className="font-semibold text-xl text-sky-300">Mode de vie</h2>
                            <p className="mt-2">{c.lifestyle.description}</p>

                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                                {c.lifestyle.visualIds.map((url, i) => (
                                    <div key={i} className="relative group cursor-pointer">
                                        {url.match(/\.(mp4|webm)$/i) 
                                            ? <video 
                                                src={url} 
                                                controls 
                                                className="w-full h-40 rounded-lg shadow"
                                                onClick={() => setSelectedMedia({ url, type: 'video', caption: `Visuel ${i + 1}` })}
                                            />
                                            : <img 
                                                src={url} 
                                                alt="lifestyle" 
                                                className="w-full h-40 object-cover rounded-lg shadow"
                                                onClick={() => setSelectedMedia({ url, type: 'image', caption: `Visuel ${i + 1}` })}
                                            />
                                        }
                                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                            {`Visuel ${i + 1}`}
                                        </div>
                                        <button
                                            onClick={() => removeVisual(url)}
                                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-80 hover:opacity-100"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex gap-3">
                            <Link to={`/add?id=${c.id}`} className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Modifier</Link>
                            <Link to="/countries" className="px-4 py-2 border rounded hover:bg-gray-100 text-white">Retour</Link>
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* Modal agrandi pour image/video */}
            {selectedMedia && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedMedia(null)}
                >
                    <div className="relative max-w-3xl w-full">
                        {selectedMedia.type === 'image' ? (
                            <img src={selectedMedia.url} alt={selectedMedia.caption} className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg" />
                        ) : (
                            <video src={selectedMedia.url} controls autoPlay className="w-full max-h-[80vh] rounded-lg shadow-lg" />
                        )}
                        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded">{selectedMedia.caption}</div>
                    </div>
                </div>
            )}
        </div>
    )
}
