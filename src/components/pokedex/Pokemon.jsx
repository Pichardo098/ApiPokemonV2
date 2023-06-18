import axios from "axios"
import { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom"
import Load from "../Load"

const types = {
  normal: [
   "bg-gradient-to-t from-[#735259] via-[#BC6B7C] to-[#7C3F4C]",
   "text-[#735259]"
  ],
  fighting: [
    "bg-gradient-to-t from-[#96402A] via-[#F1613C] to-[#CB735D]",
    "text-[#96402A]"
  ],
  flying:[
    "bg-gradient-to-t from-[#84DBF0] via-[#85EFFF] to-[#7ECBEB]",
    "text-[#84DBF0]"
  ],
  poison:[
    "bg-gradient-to-t from-[#5B3184] via-[#A564E3] to-[#CE9BFF]",
    "text-[#5B3184]"
  ],
  ground:[
    "bg-gradient-to-t from-[#654008] via-[#895C1A] to-[#D69638]",
    "text-[#654008]"
  ],
  rock:[
    "bg-gradient-to-t from-[#7E7E7E] via-[#8D8D94] to-[#D3D3D3]",
    "text-[#654008]",
  ],
  bug: [
    "bg-gradient-to-t from-[#62DB60] via-[#3BB039] to-[#AAFFA8]",
    "text-[#62DB60]",
  ],
  ghost:[
    "bg-gradient-to-t from-[#323569] via-[#454AA8] to-[#787DDA]",
    "text-[#323569]",
  ],
  steel:[
    "bg-gradient-to-t from-[#5E736C] via-[#728881] to-[#A8A8A8]",
    "text-[#5E736C]",
  ],
  fire:[
    "bg-gradient-to-t from-[#F96D6F] via-[#E35825] to-[#E8AE1B]",
    "text-[#F96D6F]",
  ],
  water:[
    "bg-gradient-to-t from-[#133258] via-[#1479FB] to-[#82B2F1]",
    "text-[#133258]",
  ],
  grass: [
    "bg-gradient-to-t from-[#7EC6C5] via-[#ABDAC6] to-[#CAE099]",
    "text-[#7EC6C5]",
  ],
  electric: [
    "bg-gradient-to-t from-[#0C1395] via-[#2B319B] to-[#7075D9]",
    "text-[#0C1395]",
  ],
  psychic: [
    "bg-gradient-to-t from-[#4A3CDB] via-[#FF0061] to-[#FEC194]",
    "text-[#4A3CDB]",
  ],
  ice:[
    "bg-gradient-to-t from-[#6FBEDF] via-[#64CBF5] to-[#BDEBFE]",
    "text-[#6FBEDF]",
  ],
  dragon:[
    "bg-gradient-to-t from-[#478A93] via-[#56A4AE] to-[#A2BEC1]",
    "text-[#478A93]",
  ],
  dark:[
    "bg-gradient-to-t from-[#030706] via-[#0D1211] to-[#5A5E5D]",
    "text-[#030706]",
  ],
  fairy: [
    "bg-gradient-to-t from-[#971B45] via-[#C23867] to-[#CD7D98]",
    "text-[#971B45]",
  ],
  unknown:[
    "",
    "",
  ],
  shadow:[
    "",
    "",
  ]
  
}

const Pokemon = ({pokemon}) => {
  const [pokemonData, setPokemonData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(pokemon.url)
      .then(({data})=> setPokemonData(data))
      .catch(err => console.log(err))
  }, [])

  
  const formatTypePokemons = (types) => {
    if(types){
      const nameTypes = types.map((type) =>  type.type.name[0].toUpperCase() + type.type.name.substring(1))
      const titleTypes = nameTypes.join(" / ")
      return titleTypes
    }

  }
  

  const handleMoreInfo = () => {
    navigate(`/pokedex/${pokemon?.name}`)
  }
  return (
    <article className={`${types[pokemonData?.types[0].type.name]?.[0]} rounded-lg text-white text-center relative`}>
      <button id="pokemon_ball" onClick={handleMoreInfo} className="absolute z-10 h-10 aspect-square overflow-hidden right-2 top-2">
        <img  className="overflow-hidden" src="/images/pokebola.png" alt="" />
      </button>
      <section className="p-2">

      <section className={`${types[pokemonData?.types[0].type.name]?.[0]} relative h-40 rounded-t-lg` }>
        
        <div className="rounded-lg absolute px-8 top-0 ">
          {
            pokemonData?.sprites.other["official-artwork"].front_default ?
            <img  src={pokemonData?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
            :
            <Load/>
          }
        </div>
      </section>


      <section className="bg-white rounded-b-lg pt-10 text-txt_black">
        <h3 className={`font-bold text-xl ${types[pokemonData?.types[0].type.name]?.[1]}`}>{pokemon?.name[0].toUpperCase() + pokemon?.name.substring(1) }</h3>
        <h5 className="font-medium">{formatTypePokemons(pokemonData?.types)}</h5>
        <h2>Type</h2>

        <hr className={`${types[pokemonData?.types[0].type.name]?.[0]} h-[3px] w-[80%] mx-auto m-0 p-0`}/>

        <section className="grid grid-cols-3 justify-center items-end mx-auto text-center p-2 text-[15px]">
          {/* Generar la lista de stats */}
          {
            pokemonData?.stats.map(stat => (
              <div key={stat?.stat.name} >
                <h6>{stat?.stat.name[0].toUpperCase()+ stat?.stat.name.substring(1)}</h6>
                <span className={`font-bold text-xl ${types[pokemonData?.types[0].type.name]?.[1]}`}>{stat?.base_stat}</span>
              </div>
            ))
          }
        </section>


      </section>
      </section>

      {/* Sección superior */}
    </article>
  )
}

export default Pokemon