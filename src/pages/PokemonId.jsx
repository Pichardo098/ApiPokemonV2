import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/pokedex/Header';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import Load from '../components/Load';
import { getDetailPokemon, postAddFavorite } from '../components/pokedex/API';
import { getPokemonEvolution, getPokemonSpecies } from './API';

const types = {
  normal: [
    'bg-gradient-to-t from-[#735259] via-[#BC6B7C] to-[#7C3F4C]',
    'text-[#735259]',
    'bg-[#735259]',
  ],
  fighting: [
    'bg-gradient-to-t from-[#96402A] via-[#F1613C] to-[#CB735D]',
    'text-[#96402A]',
    'bg-[#96402A]',
  ],
  flying: [
    'bg-gradient-to-t from-[#84DBF0] via-[#85EFFF] to-[#7ECBEB]',
    'text-[#84DBF0]',
    'bg-[#84DBF0]',
  ],
  poison: [
    'bg-gradient-to-t from-[#5B3184] via-[#A564E3] to-[#CE9BFF]',
    'text-[#5B3184]',
    'bg-[#5B3184]',
  ],
  ground: [
    'bg-gradient-to-t from-[#654008] via-[#895C1A] to-[#D69638]',
    'text-[#654008]',
    'bg-[#654008]',
  ],
  rock: [
    'bg-gradient-to-t from-[#7E7E7E] via-[#8D8D94] to-[#D3D3D3]',
    'text-[#7E7E7E]',
    'bg-[#7E7E7E]',
  ],
  bug: [
    'bg-gradient-to-t from-[#62DB60] via-[#3BB039] to-[#AAFFA8]',
    'text-[#62DB60]',
    'bg-[#62DB60]',
  ],
  ghost: [
    'bg-gradient-to-t from-[#323569] via-[#454AA8] to-[#787DDA]',
    'text-[#323569]',
    'bg-[#323569]',
  ],
  steel: [
    'bg-gradient-to-t from-[#5E736C] via-[#728881] to-[#A8A8A8]',
    'text-[#5E736C]',
    'bg-[#5E736C]',
  ],
  fire: [
    'bg-gradient-to-t from-[#F96D6F] via-[#E35825] to-[#E8AE1B]',
    'text-[#F96D6F]',
    'bg-[#F96D6F]',
  ],
  water: [
    'bg-gradient-to-t from-[#133258] via-[#1479FB] to-[#82B2F1]',
    'text-[#133258]',
    'bg-[#133258]',
  ],
  grass: [
    'bg-gradient-to-t from-[#7EC6C5] via-[#ABDAC6] to-[#CAE099]',
    'text-[#7EC6C5]',
    'bg-[#7EC6C5]',
  ],
  electric: [
    'bg-gradient-to-t from-[#0C1395] via-[#2B319B] to-[#7075D9]',
    'text-[#0C1395]',
    'bg-[#0C1395]',
  ],
  psychic: [
    'bg-gradient-to-t from-[#4A3CDB] via-[#FF0061] to-[#FEC194]',
    'text-[#4A3CDB]',
    'bg-[#4A3CDB]',
  ],
  ice: [
    'bg-gradient-to-t from-[#6FBEDF] via-[#64CBF5] to-[#BDEBFE]',
    'text-[#6FBEDF]',
    'bg-[#6FBEDF]',
  ],
  dragon: [
    'bg-gradient-to-t from-[#478A93] via-[#56A4AE] to-[#A2BEC1]',
    'text-[#478A93]',
    'bg-[#478A93]',
  ],
  dark: [
    'bg-gradient-to-t from-[#030706] via-[#0D1211] to-[#5A5E5D]',
    'text-[#030706]',
    'bg-[#030706]',
  ],
  fairy: [
    'bg-gradient-to-t from-[#971B45] via-[#C23867] to-[#CD7D98]',
    'text-[#971B45]',
    'bg-[#971B45]',
  ],
  unknown: ['', '', ''],
  shadow: ['', '', ''],
};

const PokemonId = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [pokemonEvolution, setPokemonEvolution] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const idTrainer = useSelector((store) => store.nameTrainer._id);

  const percentProgresStat = (baseStat) => {
    return `${(baseStat * 100) / 255}%`;
  };

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  const handleErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  };

  const pokemonDetails = async () => {
    const response = await getDetailPokemon(name);

    if (!response.status.toString().startsWith('2')) {
      return handleErrorMessage(response.response.message);
    }

    setPokemon(response.response);
  };

  const pokemonEvolutionDetails = async (id) => {
    const response = await getPokemonEvolution(id);

    if (!response.status.toString().startsWith('2')) {
      return handleErrorMessage(response.response.message);
    }

    setPokemonEvolution(response.response);
  };

  const pokemonSpeciesDetails = async () => {
    const response = await getPokemonSpecies(name);

    if (!response.status.toString().startsWith('2')) {
      return handleErrorMessage(response.response.message);
    }

    setPokemonSpecies(response.response);

    const chainId = response.response.evolution_chain_id;

    pokemonEvolutionDetails(chainId);
  };

  const pokemonFavorite = async () => {
    const response = await postAddFavorite({
      pokemon: pokemon.name,
      userId: idTrainer,
    });

    if (!response.status.toString().startsWith('2')) {
      return handleErrorMessage(response.response.message);
    }

    handleSuccessMessage('Pokemon added to favorites!');
  };

  useEffect(() => {
    pokemonDetails();
    pokemonSpeciesDetails();
  }, []);

  const navigate = useNavigate();
  const handleClickReturnPokedex = () => {
    navigate(`/pokedex`);
  };

  const handleAddFavorite = () => {
    pokemonFavorite();
  };

  return (
    <div className="bg-bkg_white dark:bg-dk_bg">
      <Header />
      <main className="bg-bkg_white dark:bg-dk_bg pb-6 relative text-center">
        <button
          onClick={handleClickReturnPokedex}
          className="h-10 bg-btn_red hover:bg-btn_hover hover:text-txt_black text-bkg_white font-bold text-2xl rounded-full left-1/2  z-20 px-4 aspect-square"
        >
          <i className="bx bx-left-arrow-alt"></i>
        </button>

        {/* Información de pokemon */}
        <article className="max-w-[1000px]  bg-white dark:bg-dk_bg_card dark:text-bkg_white rounded-md shadow-lg shadow-gray-500 mx-4 mt-[80px] lg:mx-auto">
          {/* Seccion de Imagen y fondo gradient */}
          <section
            className={`${types[pokemon?.types[0].type.name]?.[0]} relative h-40 rounded-t-lg flex justify-center`}
          >
            <div className="rounded-lg absolute px-8 bottom-0 max-w-[300px] mx-auto ">
              {pokemon?.sprites.other['official-artwork'].front_default ? (
                <img
                  src={pokemon?.sprites.other['official-artwork'].front_default}
                  alt={pokemon?.name}
                />
              ) : (
                <Load />
              )}
            </div>
          </section>
          <section className="max-w-[800px] mx-auto p-4">
            {/* Specs pokemon */}
            <section className="text-center flex flex-col gap-3 justify-center ">
              <span
                className={`font-bold border-2 border-[#D3D3D3] px-2 self-center ${
                  types[pokemon?.types[0].type.name]?.[1]
                }`}
              >
                #{pokemon?.id}
              </span>
              <section className="flex flex-row justify-center items-center gap-4">
                <hr className="w-[100%] h-[2px] bg-[#D3D3D3]" />
                <h1
                  className={`${types[pokemon?.types[0].type.name]?.[1]} font-bold text-2xl`}
                >
                  {pokemon?.name[0]?.toUpperCase() + pokemon?.name.substring(1)}
                </h1>
                <hr className="w-[100%] h-[2px] bg-[#D3D3D3]" />
              </section>
              <section className="flex justify-center gap-5">
                <p className="grid text-center">
                  Weigth{' '}
                  <span className="font-bold">{pokemon?.weight}</span>{' '}
                </p>
                <p className="grid text-center">
                  Height{' '}
                  <span className="font-bold">{pokemon?.height}</span>{' '}
                </p>
                <button
                  id="pokemon_ball"
                  onClick={handleAddFavorite}
                  className="m-x auto z-10 h-10 aspect-square overflow-hidden left-2 top-2 bg-red-600 rounded-full"
                >
                  <i class="bx  bx-heart"></i>
                </button>
              </section>
              <section className="grid grid-cols-2  text-center max-[660px]:grid-cols-1 gap-2 items-center">
                <section className="flex flex-col gap-2 font-semibold">
                  <h2 className="font-semibold text-xl">Type</h2>

                  {types[pokemon?.types[1]?.type.name] ? (
                    <section className="grid grid-cols-2 gap-3 text-center items-center  text-bkg_white">
                      <p
                        className={`px-8 border-2 ${types[pokemon?.types[0].type.name]?.[2]}`}
                      >
                        {pokemon?.types[0].type.name[0].toUpperCase() +
                          pokemon?.types[0].type.name.substring(1)}
                      </p>
                      <p
                        className={`px-8 border-2 ${types[pokemon?.types[1].type.name]?.[2]}`}
                      >
                        {pokemon?.types[1].type.name[0].toUpperCase() +
                          pokemon?.types[1].type.name.substring(1)}
                      </p>
                    </section>
                  ) : (
                    <section className="grid grid-cols-1 gap-3 text-center items-center  text-bkg_white">
                      <p
                        className={`px-8 border-2 ${types[pokemon?.types[0].type.name]?.[2]}`}
                      >
                        {pokemon?.types[0].type.name[0].toUpperCase() +
                          pokemon?.types[0].type.name.substring(1)}
                      </p>
                    </section>
                  )}
                </section>
                <section className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Abilities</h2>
                  {pokemon?.abilities[1] ? (
                    <section className="grid grid-cols-2 gap-3 text-center justify-center items-center max-[365px]:flex max-[365px]:flex-wrap">
                      <p className="border-2 border-[#D3D3D3] px-8">
                        {pokemon?.abilities[0].ability.name[0].toUpperCase() +
                          pokemon?.abilities[0].ability.name.substring(1)}
                      </p>
                      <p className="border-2 border-[#D3D3D3] px-8">
                        {pokemon?.abilities[1].ability.name[0].toUpperCase() +
                          pokemon?.abilities[1].ability.name.substring(1)}
                      </p>
                    </section>
                  ) : (
                    <section className="grid grid-cols-1 gap-3 text-center justify-center items-center max-[365px]:flex max-[365px]:flex-wrap">
                      <p className="border-2 border-[#D3D3D3] px-8">
                        {pokemon?.abilities[0].ability.name[0].toUpperCase() +
                          pokemon?.abilities[0].ability.name.substring(1)}
                      </p>
                    </section>
                  )}
                </section>
              </section>
            </section>

            <section className="pb-4">
              <section className="flex items-center gap-3">
                <h4 className="font-bold text-2xl">Stats</h4>
                <hr className="h-[2px] bg-[#D3D3D3] w-full" />
                <div className="text-[#D3D3D3]">
                  <img src="/images/pokeboll_transparent.svg" alt="" />
                </div>
              </section>
              <section className="flex flex-col gap-4">
                {pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url}>
                    <section className="flex justify-between font-medium">
                      <h5>
                        {stat.stat.name[0].toUpperCase() +
                          stat.stat.name.substring(1)}
                        :
                      </h5>
                      <span>{stat.base_stat}/255</span>
                    </section>
                    {/* Barra de progreso stat */}
                    <div className="bg-[#D3D3D3] h-8 rounded-md overflow-hidden">
                      <div
                        style={{ width: percentProgresStat(stat.base_stat) }}
                        className={
                          'h-full bg-gradient-to-r from-[#FCD676] to-[#E6901E] '
                        }
                      ></div>
                    </div>
                  </article>
                ))}
              </section>
            </section>
          </section>
        </article>

        <article className="max-w-[1000px]  bg-white dark:bg-dk_bg_card dark:text-bkg_white rounded-md shadow-lg shadow-gray-500 mx-4 mt-[50px] lg:mx-auto">
          <section className="p-6">
            <section className="flex items-center gap-3">
              <h4 className="font-bold text-2xl">Specie</h4>
              <hr className="h-[2px] bg-[#D3D3D3] w-full" />
              <div className="text-[#D3D3D3]">
                <img src="/images/pokeboll_transparent.svg" alt="" />
              </div>
            </section>
            <section className="flex flex-wrap gap-4">
              <p className="bg-bkg_white dark:text-dk_bg_card p-[6px] rounded-full text-[15px] md:text-[20px] md:p-4">
                Color: {pokemonSpecies?.color.toUpperCase()}
              </p>
              <p className="bg-bkg_white dark:text-dk_bg_card p-[6px] rounded-full text-[15px] md:text-[20px] md:p-4">
                Habitat: {pokemonSpecies?.habitat.toUpperCase()}
              </p>
              <p className="bg-bkg_white dark:text-dk_bg_card p-[6px] rounded-full text-[15px] md:text-[20px] md:p-4">
                Generation: {pokemonSpecies?.generation.toUpperCase()}
              </p>
            </section>
          </section>
        </article>

        <article className="max-w-[1000px]  bg-white dark:bg-dk_bg_card dark:text-bkg_white rounded-md shadow-lg shadow-gray-500 mx-4 mt-[50px] lg:mx-auto">
          <section className="p-6">
            <section className="flex items-center gap-3">
              <h4 className="font-bold text-2xl">Evolution</h4>
              <hr className="h-[2px] bg-[#D3D3D3] w-full" />
              <div className="text-[#D3D3D3]">
                <img src="/images/pokeboll_transparent.svg" alt="" />
              </div>
            </section>
            <section className="flex flex-wrap gap-4">
              {pokemonEvolution?.chain?.map((evolution) => (
                <p
                  className="bg-bkg_white dark:text-dk_bg_card p-[6px] rounded-full text-[15px] md:text-[20px] md:p-4"
                  key={evolution}
                >
                  {evolution[0].toUpperCase() + evolution.substring(1)}
                </p>
              ))}
            </section>
          </section>
        </article>

        <article className="max-w-[1000px]  bg-white dark:bg-dk_bg_card dark:text-bkg_white rounded-md shadow-lg shadow-gray-500 mx-4 mt-[50px] lg:mx-auto">
          <section className="p-6">
            <section className="flex items-center gap-3">
              <h4 className="font-bold text-2xl">Movements</h4>
              <hr className="h-[2px] bg-[#D3D3D3] w-full" />
              <div className="text-[#D3D3D3]">
                <img src="/images/pokeboll_transparent.svg" alt="" />
              </div>
            </section>
            <section className="flex flex-wrap gap-4">
              {pokemon?.moves.slice(1, 26).map((move) => (
                <p
                  className="bg-bkg_white dark:text-dk_bg_card p-[6px] rounded-full text-[15px] md:text-[20px] md:p-4"
                  key={move.move.name}
                >
                  {move.move.name[0].toUpperCase() +
                    move.move.name.substring(1)}
                </p>
              ))}
            </section>
          </section>
        </article>

        {/* Alert */}
        {errorMessage && (
          <div className="absolute top-4 inset-x-0 flex justify-center z-50">
            <p className="bg-red-100 text-red-700 font-semibold text-xl px-4 py-2 rounded shadow">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Alert */}
        {successMessage && (
          <div className="absolute top-4 inset-x-0 flex justify-center z-50">
            <p className="bg-green-100 text-green-800 font-semibold text-xl px-4 py-2 rounded shadow">
              {successMessage}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PokemonId;
