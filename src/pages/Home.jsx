import { useDispatch } from "react-redux"
import FooterHome from "../components/home/FooterHome"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value

    dispatch(setNameTrainer(nameTrainer))
    navigate("/pokedex")
  }
  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen">
      {/* Sección Superior */}
      <section className="flex flex-col justify-center items-center px-4 gap-6 text-center">
        <div>
          <img src="/images/pok_title.svg" alt="Name Pokedex" />
        </div>
        <section>
          <h1 className="text-txt_red font-bold text-3xl">Hi Trainer!</h1>
          <p className="text-txt_black text-xl font-semibold">
            Before you begin, give a name
          </p>
        </section>
        <form onSubmit={handleSubmit} >
          <input required id="nameTrainer" className="rounded-l-md p-2 border-none outline-none font-semibold" type="text" />
          <button className="rounded-r-md bg-btn_red p-2 text-bkg_white hover:bg-btn_hover font-semibold ">Start</button>
        </form>
      </section>
    

      {/* Sección inferior */}
      <section>
        <FooterHome/>
      </section>
    </main>
  )
}

export default Home