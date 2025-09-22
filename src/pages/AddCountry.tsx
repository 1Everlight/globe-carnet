import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { Country, MediaItem, HistoricalEvent } from '../types'
import { saveCountry, getCountryById } from '../storage/localStorage'
import { useNavigate, useSearchParams } from 'react-router-dom'

function makeEmptyCountry(): Country {
    return {
        id: uuid(),
        name: '',
        isoCode: '',
        region: '',
        summary: '',
        topAttractions: [],
        media: [],
        history: [],
        traditions: [],
        lifestyle: { description: '', visualIds: [] },
        createdAt: new Date().toISOString(),
    }
}

export default function AddCountry() {
    const [search] = useSearchParams()
    const editId = search.get('id') || undefined
    const [country, setCountry] = useState<Country>(() => makeEmptyCountry())
    const navigate = useNavigate()

    useEffect(() => {
        if (editId) {
            const found = getCountryById(editId)
            if (found) setCountry(found)
        }
    }, [editId])

    function updateField<K extends keyof Country>(key: K, value: Country[K]) {
        setCountry(prev => ({ ...prev, [key]: value }))
    }

    function addMedia() {
        const url = prompt('URL de l\'image/vidéo (jour1: coller URL)')
        if (!url) return
        const m: MediaItem = { id: uuid(), type: url.match(/\.(mp4|webm)$/i) ? 'video' : 'image', url }
        setCountry(p => ({ ...p, media: [...p.media, m] }))
    }

    function addHistory() {
        const title = prompt('Titre (ex: Indépendance)')
        if (!title) return
        const year = parseInt(prompt('Année (ex: 1960)') || '') || undefined
        const desc = prompt('Description courte') || ''
        const ev: HistoricalEvent = { id: uuid(), year, title, description: desc }
        setCountry(p => ({ ...p, history: [...p.history, ev] }))
    }

    function onSave(e: React.FormEvent) {
        e.preventDefault()
        if (!country.name) { alert('Nom requis'); return }
        saveCountry(country)
        navigate(`/countries/${country.id}`)
    }

    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">{editId ? 'Modifier' : 'Ajouter'} un pays</h1>
            <form onSubmit={onSave} className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm">Nom</label>
                    <input value={country.name} onChange={e => updateField('name', e.target.value)} className="mt-1 p-2 border rounded w-full" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm">Région</label>
                        <input value={country.region} onChange={e => updateField('region', e.target.value)} className="mt-1 p-2 border rounded w-full" />
                    </div>
                    <div>
                        <label className="block text-sm">Code ISO</label>
                        <input value={country.isoCode} onChange={e => updateField('isoCode', e.target.value)} className="mt-1 p-2 border rounded w-full" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm">Résumé</label>
                    <textarea value={country.summary} onChange={e => updateField('summary', e.target.value)} className="mt-1 p-2 border rounded w-full" rows={4} />
                </div>

                <div className="flex gap-2">
                    <button type="button" onClick={addMedia} className="px-4 py-2 bg-sky-600 text-white rounded">Ajouter média (URL)</button>
                    <button type="button" onClick={addHistory} className="px-4 py-2 bg-emerald-600 text-white rounded">Ajouter événement historique</button>
                </div>

                <div>
                    <h3 className="font-semibold">Médias</h3>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {country.media.map(m => (
                            <div key={m.id} className="bg-white rounded shadow p-2">
                                {m.type === 'image' ? <img src={m.url} alt={m.caption} className="w-full h-32 object-cover rounded" /> : <video src={m.url} controls className="w-full h-32 rounded" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">Événements historiques</h3>
                    <div className="mt-2 space-y-2">
                        {country.history.map(h => (
                            <div key={h.id} className="p-2 bg-gray-50 rounded">{h.year} · {h.title}</div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded">Enregistrer</button>
                    <button type="button" onClick={() => navigate('/countries')} className="px-4 py-2 border rounded">Annuler</button>
                </div>
            </form>
        </div>
    )
}

