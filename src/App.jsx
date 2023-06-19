import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonId from './pages/PokemonId'
import ProtectedRoutes from './components/auth/ProtectedRoutes'
import { useSelector } from 'react-redux'

function App() {

  const darkModeSlice = useSelector((store)=> store.darkModeSlice)

  return (
    <div id='body' className={` min-h-screen font-["Inter] ${darkModeSlice && "dark"} transition-all delay-1000`} >
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
