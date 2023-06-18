import React from 'react'

const Footer = () => {
  return (
    <section className="relative h-20  ">
      <div className="h-[60%] bg-red_header"></div>
      <div className="h-[40%] bg-black_header"></div>

      <div className="h-16 aspect-square bg-white border-[6px] border-black rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 ">
        <img id="home_pokeball" className="fixed w-full" src="/images/pokebola.png" alt="Pokebola" />
      </div>
    </section>
  )
}

export default Footer