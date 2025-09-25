import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { Country, MediaItem, HistoricalEvent, Tradition } from '../types'
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

    // États temporaires
    const [newMediaUrl, setNewMediaUrl] = useState('')
    const [newMediaCaption, setNewMediaCaption] = useState('')
    const [newHistoryTitle, setNewHistoryTitle] = useState('')
    const [newHistoryYear, setNewHistoryYear] = useState<number | undefined>()
    const [newHistoryDescription, setNewHistoryDescription] = useState('')
    const [newTraditionTitle, setNewTraditionTitle] = useState('')
    const [newTraditionDescription, setNewTraditionDescription] = useState('')
    const [editingTraditionId, setEditingTraditionId] = useState<string | null>(null) // pour édition
    const [newLifestyleUrl, setNewLifestyleUrl] = useState('')

    useEffect(() => {
        if (editId) {
            const found = getCountryById(editId)
            if (found) setCountry(found)
        }
    }, [editId])

    function updateField<K extends keyof Country>(key: K, value: Country[K]) {
        setCountry(prev => ({ ...prev, [key]: value }))
    }

    function updateLifestyle<K extends keyof Country['lifestyle']>(key: K, value: Country['lifestyle'][K]) {
        setCountry(prev => ({ ...prev, lifestyle: { ...prev.lifestyle, [key]: value } }))
    }

    // Ajouter Média
    function addMedia() {
        if (!newMediaUrl) return
        const m: MediaItem = {
            id: uuid(),
            type: newMediaUrl.match(/\.(mp4|webm)$/i) ? 'video' : 'image',
            url: newMediaUrl,
            caption: newMediaCaption,
        }
        setCountry(p => ({ ...p, media: [...p.media, m] }))
        setNewMediaUrl('')
        setNewMediaCaption('')
    }

    // Ajouter Histoire
    function addHistory() {
        if (!newHistoryTitle) return
        const ev: HistoricalEvent = {
            id: uuid(),
            year: newHistoryYear,
            title: newHistoryTitle,
            description: newHistoryDescription,
        }
        setCountry(p => ({ ...p, history: [...p.history, ev] }))
        setNewHistoryTitle('')
        setNewHistoryYear(undefined)
        setNewHistoryDescription('')
    }

    // Ajouter ou modifier Tradition
    function addOrUpdateTradition() {
        if (!newTraditionTitle) return

        if (editingTraditionId) {
            // Modifier
            setCountry(p => ({
                ...p,
                traditions: p.traditions.map(t =>
                    t.id === editingTraditionId
                        ? { ...t, title: newTraditionTitle, description: newTraditionDescription }
                        : t
                )
            }))
            setEditingTraditionId(null)
        } else {
            // Ajouter nouvelle
            const newTrad: Tradition = {
                id: uuid(),
                title: newTraditionTitle,
                description: newTraditionDescription,
            }
            setCountry(p => ({ ...p, traditions: [...p.traditions, newTrad] }))
        }

        setNewTraditionTitle('')
        setNewTraditionDescription('')
    }

    function editTradition(t: Tradition) {
        setEditingTraditionId(t.id)
        setNewTraditionTitle(t.title)
        setNewTraditionDescription(t.description)
    }

    // Ajouter Visuel Lifestyle
    function addLifestyleVisual() {
        if (!newLifestyleUrl) return
        setCountry(p => ({
            ...p,
            lifestyle: {
                ...p.lifestyle,
                visualIds: [...p.lifestyle.visualIds, newLifestyleUrl],
            }
        }))
        setNewLifestyleUrl('')
    }

    function onSave(e: React.FormEvent) {
        e.preventDefault()
        if (!country.name) { alert('Nom requis'); return }
        saveCountry(country)
        navigate(`/countries/${country.id}`)
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Image de fond */}
            <img
                src="image.jpg"
                alt="fond"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Contenu */}
            <div className="relative z-10 container mx-auto p-6">
                <h1 className="text-3xl font-extrabold mb-6 text-white drop-shadow">
                    {editId ? 'Modifier' : 'Ajouter'} un pays
                </h1>
                <form 
                    onSubmit={onSave} 
                    className="grid grid-cols-1 gap-6 bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/40"
                >
                    {/* Nom / Région / ISO */}
                    <div>
                        <label className="block text-sm font-semibold text-white">Nom</label>
                        <input value={country.name} onChange={e => updateField('name', e.target.value)}
                            className="mt-1 p-3 border rounded-lg w-full shadow-sm bg-white/60" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-white">Région</label>
                            <input value={country.region} onChange={e => updateField('region', e.target.value)}
                                className="mt-1 p-3 border rounded-lg w-full shadow-sm bg-white/60" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white">Code ISO</label>
                            <input value={country.isoCode} onChange={e => updateField('isoCode', e.target.value)}
                                className="mt-1 p-3 border rounded-lg w-full shadow-sm bg-white/60" />
                        </div>
                    </div>

                    {/* Résumé */}
                    <div>
                        <label className="block text-sm font-semibold text-white">Résumé</label>
                        <textarea value={country.summary} onChange={e => updateField('summary', e.target.value)}
                            className="mt-1 p-3 border rounded-lg w-full shadow-sm bg-white/60" rows={4} />
                    </div>

                    {/* Médias */}
                    <div>
                        <h3 className="text-lg font-bold mb-2 text-white">Site touristique</h3>
                        <div className="flex gap-2 mb-3 flex-wrap">
                            <input type="text" placeholder="URL du média"
                                value={newMediaUrl} onChange={e => setNewMediaUrl(e.target.value)}
                                className="p-2 border rounded flex-1 bg-white/60" />
                            <input type="text" placeholder="Description"
                                value={newMediaCaption} onChange={e => setNewMediaCaption(e.target.value)}
                                className="p-2 border rounded flex-1 bg-white/60" />
                            <button type="button" onClick={addMedia}
                                className="px-4 py-2 bg-sky-600 text-white rounded-lg shadow">+ Ajouter</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {country.media.map(m => (
                                <div key={m.id} className="bg-white/70 rounded-lg shadow p-2">
                                    {m.type === 'image'
                                        ? <img src={m.url} alt={m.caption} className="w-full h-32 object-cover rounded" />
                                        : <video src={m.url} controls className="w-full h-32 rounded" />}
                                    {m.caption && <p className="text-sm mt-1">{m.caption}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Histoire */}
                    <div>
                        <h3 className="text-lg font-bold mb-2 text-white">Événements historiques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
                            <input type="text" placeholder="Titre"
                                value={newHistoryTitle} onChange={e => setNewHistoryTitle(e.target.value)}
                                className="p-2 border rounded bg-white/60" />
                            <input type="number" placeholder="Année"
                                value={newHistoryYear ?? ''}
                                onChange={e => setNewHistoryYear(e.target.value ? parseInt(e.target.value) : undefined)}
                                className="p-2 border rounded bg-white/60" />
                            <input type="text" placeholder="Description"
                                value={newHistoryDescription} onChange={e => setNewHistoryDescription(e.target.value)}
                                className="p-2 border rounded bg-white/60" />
                            <button type="button" onClick={addHistory}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow">+ Ajouter</button>
                        </div>
                        <div className="space-y-2">
                            {country.history.map(h => (
                                <div key={h.id} className="p-3 bg-white/70 rounded-lg shadow-sm">
                                    <span className="font-semibold">{h.year}</span> · {h.title} – {h.description}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Traditions */}
                    <div>
                        <h3 className="text-lg font-bold mb-2 text-white">Traditions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                            <input type="text" placeholder="Titre"
                                value={newTraditionTitle} onChange={e => setNewTraditionTitle(e.target.value)}
                                className="p-2 border rounded bg-white/60" />
                            <input type="text" placeholder="Description"
                                value={newTraditionDescription} onChange={e => setNewTraditionDescription(e.target.value)}
                                className="p-2 border rounded bg-white/60" />
                            <button type="button" onClick={addOrUpdateTradition}
                                className="px-4 py-2 bg-amber-600 text-white rounded-lg shadow">
                                {editingTraditionId ? 'Modifier' : '+ Ajouter'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {country.traditions.map(t => (
                                <div key={t.id} className="bg-white/70 rounded-lg shadow p-4 flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-indigo-700">{t.title}</h4>
                                        <p className="text-sm text-gray-700 mt-1">{t.description}</p>
                                    </div>
                                    <button type='button' onClick={() => editTradition(t)}
                                        className="px-2 py-1 bg-sky-600 text-white rounded text-sm">Modifier</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lifestyle */}
                    <div>
                        <h3 className="text-lg font-bold mb-2 text-white">Mode de vie</h3>
                        <label className="block text-sm font-semibold text-white">Description</label>
                        <textarea value={country.lifestyle.description}
                            onChange={e => updateLifestyle('description', e.target.value)}
                            className="mt-1 p-3 border rounded-lg w-full shadow-sm bg-white/60" rows={3} />

                        <div className="flex gap-2 mt-3">
                            <input type="text" placeholder="URL image/vidéo"
                                value={newLifestyleUrl} onChange={e => setNewLifestyleUrl(e.target.value)}
                                className="p-2 border rounded flex-1 bg-white/60" />
                            <button type="button" onClick={addLifestyleVisual}
                                className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow">+ Ajouter</button>
                        </div>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {country.lifestyle.visualIds.map((url, i) => (
                                <div key={i} className="bg-white/70 rounded-lg shadow p-2">
                                    {url.match(/\.(mp4|webm)$/i)
                                        ? <video src={url} controls className="w-full h-32 rounded" />
                                        : <img src={url} alt="lifestyle" className="w-full h-32 object-cover rounded" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow">
                            💾 Enregistrer
                        </button>
                        <button type="button" onClick={() => navigate('/countries')}
                            className="px-6 py-3 border rounded-lg shadow text-white border-white/60">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
