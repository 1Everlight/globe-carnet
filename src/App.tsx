import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CountriesList from './pages/CountriesList'
import CountryDetail from './pages/CountryDetail'
import AddCountry from './pages/AddCountry'
import About from './pages/About'
import countries from './data/countries.json'
import { useEffect } from 'react'
import { initLocalStorage } from './storage/localStorage'


initLocalStorage();
const LOCAL_STORAGE_KEY = 'countries'

export default function App() {
  // Initialisation du localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(countries))
      console.log('LocalStorage initialisé avec le fichier JSON.')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/countries' element={<CountriesList />} />
          <Route path='/countries/:id' element={<CountryDetail />} />
          <Route path='/add' element={<AddCountry />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
