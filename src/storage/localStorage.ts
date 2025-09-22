import type { Country } from '../types'
const KEY = 'globecarnet_countries_v1'


export function loadCountries(): Country[] {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) as Country[] : []
}


export function saveCountries(list: Country[]) {
    localStorage.setItem(KEY, JSON.stringify(list))
}


export function saveCountry(country: Country) {
    const list = loadCountries()
    const idx = list.findIndex(c => c.id === country.id)
    if (idx >= 0) {
        list[idx] = { ...list[idx], ...country, lastEditedAt: new Date().toISOString() }
    } else {
        list.push({ ...country, createdAt: new Date().toISOString() })
    }
    saveCountries(list)
}


export function getCountryById(id: string) {
    return loadCountries().find(c => c.id === id)
}