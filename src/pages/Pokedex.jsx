import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import PokemonsList from "../components/pokedex/PokemonsList"
import Footer from "../components/Footer"

const Pokedex = () => {

  const nameTrainer = useSelector((store)=> store.nameTrainer)

  const [pokemons, setPokemons] = useState([])
  const [namePokemon, setNamePokemon] = useState("")
  const [typesPokemon, setTypesPokemon] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const pokemonsByName = pokemons.filter((pokemon)=> pokemon.name.includes(namePokemon) )

  const paginationLogic = () => {
    const POKEMONS_PER_PAGE = 12

    //Pokemons que se van a mostrar en la pagina actual

    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonsInPage = pokemonsByName.slice(sliceStart, sliceEnd )

    //Ultima Página
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE ) || 1

    //Bloque actual
    const PAGES_PER_BLOCK = 5
    const actualBlockk =  Math.ceil(currentPage/PAGES_PER_BLOCK) 
    
    //Paginas que se vana  mostrar en el bloque actual
    const  pagesInBlock = []
    const minPage = (actualBlockk - 1 ) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlockk * PAGES_PER_BLOCK
    for(let i = minPage ; i <= maxPage; i++){
      if(i <= lastPage)
      pagesInBlock.push(i)
    }

    return {
      pokemonsInPage,
      lastPage,
      pagesInBlock
    }
  }

  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1){
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }

  const {pokemonsInPage, lastPage, pagesInBlock} = paginationLogic()

  const handleSubmit = (e) => {
    e.preventDefault()
    setNamePokemon(e.target.namePokemon.value.toLowerCase().trim() )
  }
  
  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  useEffect(() => {
    if(!currentType){
      const url = "https://pokeapi.co/api/v2/pokemon?limit=1281"
  
      axios.get(url)
        .then(({data})=> setPokemons(data.results))
        .catch(err => console.log(err))
    }
  }, [currentType])
  
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type/"

    axios.get(url)
      .then(({data}) => setTypesPokemon(data.results))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(currentType){
      const url = `https://pokeapi.co/api/v2/type/${currentType}/`

      axios.get(url)
      .then(({data})=> {
        let pokemonsByType = data.pokemon.map((pokemon)=> (
          pokemon.pokemon
        ))
        setPokemons(pokemonsByType)
        })
      .catch(err => console.log(err))
    }
  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [namePokemon,currentType])
  
  const hasPokemons  = pokemonsInPage.length > 0
  

  //Timing 47:31
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Header/>
      <main className="max-w-[1200px] mx-auto px-4 grid gap-4 m-5 w-full ">
        <p className="text-txt_black font-medium"><span className="text-txt_red font-bold">Welcome {nameTrainer},</span> here you can find your favorite pokemon</p>
        
        <form onSubmit={handleSubmit} className="flex justify-between flex-wrap gap-4 " >
          <div className="flex font-semibold">
            <input className="rounded-l-md  border-none outline-none font-semibold p-2" id="namePokemon" placeholder="Type a name pokemon..." type="text" />
            <button className="rounded-r-md bg-btn_red hover:bg-btn_hover text-bkg_white px-2 font-semibold ">Search</button>
          </div>

          <select onChange={handleChangeType} className="overflow-scroll border-none outline-none">
            <option value="">All Types</option>
            {
              typesPokemon.map((type)=> (
                <option key={type.url} value={type.name}>{type.name[0].toUpperCase() + type.name.substring(1)}</option>
              ))
            }
          </select>
        </form>

        <PokemonsList pokemons={pokemonsInPage}/>
        {/* Paginación */}
        {
          hasPokemons &&
        <ul className="flex justify-around ">
          
          <li onClick={()=>setCurrentPage(1)} className={`bg-btn_red ${currentPage == 1 ? "hidden":"visible"} py-2 px-4 text-bkg_white rounded-md font-bold shadow-lg shadow-gray-500 cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{"<<"}</li>
          <li onClick={handleClickPreviousPage} className={`bg-btn_red ${currentPage == 1 ? "hidden":"visible"} py-2 px-4 text-bkg_white rounded-md font-bold shadow-lg shadow-gray-500 cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{"<"}</li>
          {
            pagesInBlock.map(numberPage => (
              <li onClick={()=> setCurrentPage(numberPage)} className={`bg-btn_red py-2 px-4 blur-sm ${numberPage == currentPage && "blur-none"} hover:blur-none text-bkg_white rounded-md font-bold shadow-lg shadow-gray-500 cursor-pointer  hover:bg-btn_hover hover:scale-125  ` }key={numberPage}>{numberPage}</li>
            ))
          }
          <li onClick={handleClickNextPage} className={`bg-btn_red ${currentPage == lastPage ? "hidden":"visible"} py-2 px-4 text-bkg_white rounded-md font-bold shadow-lg shadow-gray-500 cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{">"}</li>
          <li onClick={()=>setCurrentPage(lastPage)} className={`bg-btn_red ${currentPage == lastPage ? "hidden":"visible"} py-2 px-4 text-bkg_white rounded-md font-bold shadow-lg shadow-gray-500 cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{">>"}</li>

        </ul>
        }

      </main>
      <Footer/>
    </div>
  )
}

export default Pokedex