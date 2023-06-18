import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonId from './pages/PokemonId'
import ProtectedRoutes from './components/auth/ProtectedRoutes'

function App() {

  return (
    <div id='body' className=' min-h-screen bg-bkg_white font-["Inter]'>
      <Routes>
        <Route path='/' element={<Home/> }></Route>
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes/>}>
        <Route path='/pokedex' element={ <Pokedex/> }></Route>
        <Route path='/pokedex/:name' element={<PokemonId/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
