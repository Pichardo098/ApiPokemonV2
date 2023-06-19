import { useDispatch, useSelector } from "react-redux"
import FooterHome from "../components/home/FooterHome"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"
import { setToggleDarkMode } from "../store/slices/darkMode.slice"

const Home = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const darkModeSlice = useSelector((store)=> store.darkModeSlice)


  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value

    dispatch(setNameTrainer(nameTrainer))
    navigate("/pokedex")
  }

  const handleToggleTheme = () => {
    dispatch(setToggleDarkMode())
  }
  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen bg-bkg_white dark:bg-dk_bg">
      {/* Sección Superior */}
      <section className="flex flex-col justify-center items-center px-4 gap-6 text-center">
        <div>
          <img src="/images/pok_title.svg" alt="Name Pokedex" />
        </div>
        <section>
          <h1 className="text-txt_red font-bold text-3xl">Hi Trainer!</h1>
          <p className="text-txt_black text-xl font-semibold dark:text-bkg_white">
            Before you begin, give a name
          </p>
        </section>
        <form onSubmit={handleSubmit} >
          <input required id="nameTrainer" className="rounded-l-md p-2 border-2 border-white dark:border-dk_txt outline-none font-semibold dark:bg-dk_txt dark:text-dk_bg_card" type="text" />
          <button className="rounded-r-md bg-btn_red p-2 hover:border-white text-bkg_white hover:bg-btn_hover font-semibold dark:bg-dk_bg_card dark:hover:border-dk_txt border-2 dark:border-dk_bg_card">Start</button>
        </form>
        <button onClick={handleToggleTheme} className="bg-dk_bg dark:bg-bkg_white h-10 aspect-square rounded-full">
          {
            darkModeSlice ?
            <i className='bx bxs-sun text-dk_bg ' ></i>
            :
            <i className='bx bxs-moon text-white'></i>
          }
        </button>
      </section>
    

      {/* Sección inferior */}
      <section>
        <FooterHome/>
      </section>
    </main>
  )
}

export default Home