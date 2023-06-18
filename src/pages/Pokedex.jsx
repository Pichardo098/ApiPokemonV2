import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import PokemonsList from "../components/pokedex/PokemonsList"

const Pokedex = () => {

  const nameTrainer = useSelector((store)=> store.nameTrainer)

  const [pokemons, setPokemons] = useState([])
  const [namePokemon, setNamePokemon] = useState("")
  const [typesPokemon, setTypesPokemon] = useState([])
  const [currentType, setCurrentType] = useState("")

  const pokemonsByName = pokemons.filter((pokemon)=> pokemon.name.includes(namePokemon) )


  useEffect(() => {
    if(!currentType){
      const url = "https://pokeapi.co/api/v2/pokemon?limit=40"
  
      axios.get(url)
        .then(({data})=> setPokemons(data.results))
        .catch(err => console.log(err))
    }
  }, [currentType])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setNamePokemon(e.target.namePokemon.value.toLowerCase().trim() )
    e.target.reset()
  }
  
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type/"

    axios.get(url)
      .then(({data}) => setTypesPokemon(data.results))
      .catch(err => console.log(err))
  }, [])

  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

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

  
  return (
    <div>
      <Header/>
      <main className="max-w-[1200px] mx-auto px-4 grid gap-4">
        <p className="text-txt_black font-medium"><span className="text-txt_red font-bold">Welcome {nameTrainer},</span> here you can find your favorite pokemon</p>
        
        <form onSubmit={handleSubmit} className="flex justify-between flex-wrap gap-4" >
          <div className="flex font-semibold">
            <input className="rounded-l-md  border-none outline-none font-semibold p-2" id="namePokemon" placeholder="Type a name pokemon..." type="text" />
            <button className="rounded-r-md bg-btn_red hover:bg-btn_hover text-bkg_white px-2 font-semibold ">Search</button>
          </div>

          <select onChange={handleChangeType} className="overflow-scroll border-none outline-none">
            <option value="">All Types</option>
            {
              typesPokemon.map((type)=> (
                <option key={type.url} value={type.name}>{type.name}</option>
              ))
            }
          </select>
        </form>

        <PokemonsList pokemons={pokemonsByName}/>

      </main>
    </div>
  )
}

export default Pokedex