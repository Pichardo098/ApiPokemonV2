import PropTypes from 'prop-types';
import Pokemon from './Pokemon';

const PokemonsList = ({ pokemons }) => {
  const hasPokemons = pokemons.length > 0;
  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fill,280px)] justify-center ">
      {hasPokemons ? (
        pokemons.map((pokemon) => (
          <Pokemon key={pokemon.url} pokemon={pokemon} />
        ))
      ) : (
        <h1 className="text-center text-txt_red font-bold text-2xl mx-auto col-span-full">
          No results, try another name.
        </h1>
      )}
    </section>
  );
};

PokemonsList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PokemonsList;
