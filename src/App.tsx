
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CountriesList from './pages/CountriesList'
import CountryDetail from './pages/CountryDetail'
import AddCountry from './pages/AddCountry'
import About from './pages/About'


export default function App() {
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