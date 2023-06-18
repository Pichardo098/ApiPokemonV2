import Pokemon from "./Pokemon";

const PokemonsList = ({pokemons}) => {
  

  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fill,280px)] justify-center ">
      {
        pokemons.map(pokemon => (
          <Pokemon key={pokemon.url} pokemon={pokemon}/>
        ))
      }
    </section>
  )
}

export default PokemonsList