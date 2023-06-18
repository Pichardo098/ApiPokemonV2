import React from 'react'

const Header = () => {
  return (
    <header className="mb-6  mx-auto relative ">
      <section className='absolute top-0 h-20'>
        <div className="h-[60%] bg-red_header"></div>
        <div className="h-[40%] bg-black_header"></div>
      </section>
      <section className="relative h-20 max-w-[1200px] mx-auto top-0 px-4">
        <section className=" flex">
          <div className='absolute top-0 w-[200px] sm:w-auto translate-y-1/2 sm:translate-y-0'>
            <img src="/images/pok_title.svg" alt="Titulo pokedex" />
          </div>
          <div className="h-16 aspect-square bg-white border-[7px] border-black rounded-full absolute bottom-0 right-10 translate-y-4 overflow-hidden ">
            <img id='header_pokeball' className='overflow-hidden' src="/images/pokebola.png" alt="Pokebola" />
          </div>
        </section>

      </section>
    </header>
  )
}

export default Header