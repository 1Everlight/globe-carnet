import { useEffect, useState } from 'react'
import { loadCountries } from '../storage/localStorage'
import CountryCard from '../components/CountryCard'


export default function CountriesList() {
    const [list, setList] = useState(() => loadCountries())


    useEffect(() => {
        setList(loadCountries())
    }, [])


    return (
        <div className="container">
            <h1 className="text-3xl font-bold mb-4">Liste des pays</h1>
            {list.length === 0 ? (
                <div className="p-8 bg-white rounded shadow text-gray-600">Aucun pays pour le moment. Utilise « Ajouter un pays » pour commencer.</div>
            ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {list.map(c => (
                        <CountryCard key={c.id} c={c} />
                    ))}
                </div>
            )}
        </div>
    )
}