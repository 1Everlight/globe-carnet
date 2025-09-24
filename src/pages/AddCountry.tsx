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
        traditions: [], // {id, title, description}
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

    function updateLifestyle<K extends keyof Country['lifestyle']>(key: K, value: Country['lifestyle'][K]) {
        setCountry(prev => ({ ...prev, lifestyle: { ...prev.lifestyle, [key]: value } }))
    }

    function addMedia() {
        const url = prompt('URL de l\'image/vidéo')
        if (!url) return
        const m: MediaItem = { id: uuid(), type: url.match(/\.(mp4|webm)$/i) ? 'video' : 'image', url }
        setCountry(p => ({ ...p, media: [...p.media, m] }))
    }

    function addHistory() {
        const title = prompt('Titre (ex: Indépendance)')
        if (!title) return
        const year = parseInt(prompt('Année (ex: 1960)') || '') || undefined
        const desc = prompt("Description de l'évenement !") || ''
        const ev: HistoricalEvent = { id: uuid(), year, title, description: desc }
        setCountry(p => ({ ...p, history: [...p.history, ev] }))
    }

    function editHistory(id: string) {
        setCountry(p => ({
            ...p,
            history: p.history.map(h => {
                if (h.id !== id) return h
                const title = prompt('Modifier le titre', h.title) || h.title
                const year = parseInt(prompt('Modifier l\'année', String(h.year)) || '') || h.year
                const description = prompt('Modifier la description', h.description) || h.description
                return { ...h, title, year, description }
            })
        }))
    }

    function addTradition() {
        const title = prompt('Titre de la tradition (ex: danse, fête, coutume)')
        if (!title) return
        const description = prompt('Description de la tradition') || ''
        const newTrad = { id: uuid(), title, description }
        setCountry(p => ({ ...p, traditions: [...p.traditions, newTrad] }))
    }

    function editTradition(id: string) {
        setCountry(p => ({
            ...p,
            traditions: p.traditions.map(t => {
                if (t.id !== id) return t
                const title = prompt('Modifier le titre', t.title) || t.title
                const description = prompt('Modifier la description', t.description) || t.description
                return { ...t, title, description }
            })
        }))
    }

    function addLifestyleVisual() {
        const url = prompt('URL d\'une image/vidéo pour le mode de vie')
        if (!url) return
        setCountry(p => ({ ...p, lifestyle: { ...p.lifestyle, visualIds: [...p.lifestyle.visualIds, url] } }))
    }

    function onSave(e: React.FormEvent) {
        e.preventDefault()
        if (!country.name) { alert('Nom requis'); return }
        saveCountry(country)
        navigate(`/countries/${country.id}`)
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">
                {editId ? 'Modifier' : 'Ajouter'} un pays
            </h1>
            <form onSubmit={onSave} className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-semibold">Nom</label>
                    <input value={country.name} onChange={e => updateField('name', e.target.value)}
                        className="mt-1 p-3 border rounded-lg w-full shadow-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold">Région</label>
                        <input value={country.region} onChange={e => updateField('region', e.target.value)}
                            className="mt-1 p-3 border rounded-lg w-full shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Code ISO</label>
                        <input value={country.isoCode} onChange={e => updateField('isoCode', e.target.value)}
                            className="mt-1 p-3 border rounded-lg w-full shadow-sm" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold">Résumé</label>
                    <textarea value={country.summary} onChange={e => updateField('summary', e.target.value)}
                        className="mt-1 p-3 border rounded-lg w-full shadow-sm" rows={4} />
                </div>

                <div className="flex gap-3 flex-wrap">
                    <button type="button" onClick={addMedia} className="px-4 py-2 bg-sky-600 text-white rounded-lg shadow">+ Média</button>
                    <button type="button" onClick={addHistory} className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow">+ Histoire</button>
                    <button type="button" onClick={addTradition} className="px-4 py-2 bg-amber-600 text-white rounded-lg shadow">+ Tradition</button>
                    <button type="button" onClick={addLifestyleVisual} className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow">+ Visuel Mode de Vie</button>
                </div>

                {/* Médias */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Médias</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {country.media.map(m => (
                            <div key={m.id} className="bg-white rounded-lg shadow p-2">
                                {m.type === 'image'
                                    ? <img src={m.url} alt={m.caption} className="w-full h-32 object-cover rounded" />
                                    : <video src={m.url} controls className="w-full h-32 rounded" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Histoire */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Événements historiques</h3>
                    <div className="space-y-2">
                        {country.history.map(h => (
                            <div key={h.id} className="p-3 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center">
                                <div><span className="font-semibold">{h.year}</span> · {h.title}</div>
                                <button type="button" onClick={() => editHistory(h.id)}
                                    className="px-2 py-1 text-sm bg-emerald-600 text-white rounded">Modifier</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traditions */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Traditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {country.traditions.map(t => (
                            <div key={t.id} className="bg-white rounded-lg shadow p-4 relative">
                                <h4 className="font-semibold text-indigo-700">{t.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                                <button type="button" onClick={() => editTradition(t.id)}
                                    className="absolute top-2 right-2 px-2 py-1 bg-amber-600 text-white rounded text-sm">Modifier</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lifestyle */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Mode de vie</h3>
                    <label className="block text-sm font-semibold">Description</label>
                    <textarea value={country.lifestyle.description}
                        onChange={e => updateLifestyle('description', e.target.value)}
                        className="mt-1 p-3 border rounded-lg w-full shadow-sm" rows={3} />

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {country.lifestyle.visualIds.map((url, i) => (
                            <div key={i} className="bg-white rounded-lg shadow p-2">
                                {url.match(/\.(mp4|webm)$/i)
                                    ? <video src={url} controls className="w-full h-32 rounded" />
                                    : <img src={url} alt="lifestyle" className="w-full h-32 object-cover rounded" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow">💾 Enregistrer</button>
                    <button type="button" onClick={() => navigate('/countries')}
                        className="px-6 py-3 border rounded-lg shadow">Annuler</button>
                </div>
            </form>
        </div>
    )
}
