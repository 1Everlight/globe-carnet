import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCountryById, saveCountry } from '../storage/localStorage'
import type { Country, MediaItem } from '../types'

export default function CountryDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const country = id ? getCountryById(id) : undefined

    if (!country) return (
        <div className="container">
            <div className="p-8 bg-white rounded shadow">
                Pays non trouvé. 
                <button onClick={() => navigate('/countries')} className="text-sky-600 ml-2">Retour liste</button>
            </div>
        </div>
    )

    // Fonction pour supprimer un média
    function removeMedia(mediaId: string) {
        if (!confirm('Supprimer ce média ?')) return
        country.media = country.media.filter(m => m.id !== mediaId)
        saveCountry(country)
        navigate(0) // rafraîchit la page
    }

    return (
        <div className="container">
            <div className="flex items-start gap-8">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">{country.name}</h1>
                    <p className="text-gray-600">{country.region} · {country.isoCode || ''}</p>
                    <p className="mt-4 text-gray-700">{country.summary}</p>

                    <section className="mt-6">
                        <h2 className="font-semibold text-xl">Lieux touristiques</h2>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                            {country.media.filter(m => m.type === 'image').map(img => (
                                <div key={img.id} className="relative">
                                    <img 
                                        src={img.url} 
                                        alt={img.caption || country.name} 
                                        className="w-full h-40 object-cover rounded" 
                                    />
                                    <button 
                                        onClick={() => removeMedia(img.id)} 
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-6">
                        <h2 className="font-semibold text-xl">Histoire</h2>
                        <div className="mt-3 space-y-4">
                            {country.history.map(ev => (
                                <div key={ev.id} className="p-4 bg-gray-50 rounded">
                                    <div className="text-sm text-gray-400">{ev.year}</div>
                                    <div className="font-semibold">{ev.title}</div>
                                    <div className="text-gray-600">{ev.description}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-6">
                        <h2 className="font-semibold text-xl">Traditions & coutumes</h2>
                        <div className="mt-3 space-y-3">
                            {country.traditions.map(t => (
                                <div key={t.id} className="p-3 bg-white rounded shadow-sm">
                                    <div className="font-semibold">{t.title}</div>
                                    <p className="text-gray-700">{t.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-6">
                        <h2 className="font-semibold text-xl">Mode de vie</h2>
                        <p className="mt-2 text-gray-700">{country.lifestyle.description}</p>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                            {country.lifestyle.visualIds.map((url, i) => (
                                <div key={i} className="relative">
                                    {url.match(/\.(mp4|webm)$/i) 
                                        ? <video src={url} controls className="w-full h-40 rounded" />
                                        : <img src={url} alt="lifestyle" className="w-full h-40 object-cover rounded" />
                                    }
                                    <button
                                        onClick={() => {
                                            if (!confirm('Supprimer ce visuel ?')) return
                                            country.lifestyle.visualIds = country.lifestyle.visualIds.filter(u => u !== url)
                                            saveCountry(country)
                                            navigate(0)
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-6 flex gap-3">
                        <Link to={`/add?id=${country.id}`} className="px-4 py-2 bg-sky-600 text-white rounded">Modifier</Link>
                        <Link to="/countries" className="px-4 py-2 border rounded">Retour</Link>
                    </div>
                </div>

                <aside className="w-80">
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="font-semibold">Infos</h3>
                        <p className="text-sm text-gray-500 mt-2">Créé: {new Date(country.createdAt).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Dernière modif: {country.lastEditedAt ? new Date(country.lastEditedAt).toLocaleString() : '—'}</p>
                    </div>
                </aside>
            </div>
        </div>
    )
}
