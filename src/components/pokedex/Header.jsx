import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNameTrainer } from '../../store/slices/nameTrainer.slice'
import { setToggleDarkMode } from '../../store/slices/darkMode.slice'

const Header = () => {

  const darkModeSlice = useSelector((store)=> store.darkModeSlice)
  const dispatch = useDispatch()

  const handleCloseSesion = () => {
    dispatch(setNameTrainer(""))
  }
  
  const handleToggleTheme = () => {
    dispatch(setToggleDarkMode())
  }
  
  
  return (
    <header className="mb-6  mx-auto relative w-full">
      <section className='absolute top-0 h-20'>
        <div className="h-[60%] bg-red_header"></div>
        <div className="h-[40%] bg-black_header"></div>
      </section>
      <section className="relative h-20 max-w-[1200px] mx-auto top-0 px-4">
        <button onClick={handleToggleTheme} className='absolute bg-bkg_white dark:bg-dk_bg h-8 aspect-square z-20 right-2 top-1 rounded-full'>
          {
            darkModeSlice ?
            <i className='bx bxs-sun text-white ' ></i>
            :
            <i className='bx bxs-moon text-dk_bg '></i>
          }
        </button>
        <section className=" flex">
          <div className='absolute top-0 w-[200px] sm:w-auto translate-y-1/2 sm:translate-y-0'>
            <img src="/images/pok_title.svg" alt="Titulo pokedex" />
          </div>
          <div className="h-16 aspect-square bg-white border-[7px] border-black rounded-full absolute bottom-0 right-10 translate-y-4 overflow-hidden ">
            <img id='header_pokeball' className='overflow-hidden' src="/images/pokebola.png" alt="Pokebola" />
            <button onClick={handleCloseSesion}>
              <i className='bx bx-exit absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black_header text-bkg_white font-bold rounded-full p-[3px]'></i>
            </button>
          </div>
        </section>

      </section>
    </header>
  )
}

export default Header