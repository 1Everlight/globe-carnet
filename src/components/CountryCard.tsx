
import { Link } from 'react-router-dom'
import type { Country } from '../types'


export default function CountryCard({ c }: { c: Country }) {
    const preview = c.media.find(m => m.type === 'image')?.url || ''
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-40 bg-gray-100">
                {preview ? <img src={preview} alt={c.name} className="w-full h-40 object-cover" /> : <div className="flex items-center justify-center h-40 text-gray-400">No image</div>}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.region}</p>
                <p className="mt-2 text-sm text-gray-600">{c.summary?.slice(0, 120)}</p>
                <div className="mt-3 flex justify-between items-center">
                    <Link to={`/countries/${c.id}`} className="text-sm text-sky-600">Voir</Link>
                    <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}