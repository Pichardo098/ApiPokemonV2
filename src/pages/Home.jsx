// React
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Components
import FooterHome from '../components/home/FooterHome';

// Slices
import { setTrainerData } from '../store/slices/nameTrainer.slice';
import { setToggleDarkMode } from '../store/slices/darkMode.slice';

// Actions
import { login, register } from './API';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const darkModeSlice = useSelector((store) => store.darkModeSlice);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 2000);
    };

    const handleSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            return handleErrorMessage('Por favor, rellena todos los campos.');
        }

        const response = await login(username, password);

        if (!response.status.toString().startsWith('2')) {
            return handleErrorMessage(response.response.message);
        }

        handleSuccessMessage('Login exitoso!');

        setTimeout(() => {
            const data = response.response.user;
            dispatch(setTrainerData(data));
            navigate('/pokedex');
        }, 2000);
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            return handleErrorMessage('Por favor, rellena todos los campos.');
        }

        const response = await register(username, password);

        if (!response.status.toString().startsWith('2')) {
            return handleErrorMessage(response.response.message);
        }

        handleSuccessMessage('Registro exitoso!');
        setTimeout(() => {
            const data = response.response.user;
            dispatch(setTrainerData(data));
            navigate('/pokedex');
        }, 2000);
    };

    const handleToggleTheme = () => {
        dispatch(setToggleDarkMode());
    };
    return (
        <main className="grid grid-rows-[1fr_auto] min-h-screen bg-bkg_white dark:bg-dk_bg">
            {/* Sección Superior */}
            <section className="flex flex-col justify-center items-center px-4 gap-6 text-center">
                <div>
                    <img src="/images/pok_title.svg" alt="Name Pokedex" />
                </div>
                <section>
                    <h1 className="text-txt_red font-bold text-3xl">Hi Trainer!</h1>
                    <p className="text-txt_black text-xl font-semibold dark:text-bkg_white">Login now!</p>
                </section>
                <form className="flex flex-col gap-2 items-center">
                    <input
                        required
                        id="username"
                        className="rounded-md p-2 border-2 border-white dark:border-dk_txt outline-none font-semibold dark:bg-dk_txt dark:text-dk_bg_card"
                        type="text"
                        placeholder="Nombre de usuario *"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <input
                        required
                        id="password"
                        className="rounded-md p-2 border-2 border-white dark:border-dk_txt outline-none font-semibold dark:bg-dk_txt dark:text-dk_bg_card"
                        type="password"
                        placeholder="Contraseña *"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="flex flex-row justify-center text-center gap-2 w-full">
                        <button
                            onClick={handleSubmitLogin}
                            className="rounded-md bg-btn_red p-2 hover:border-white text-bkg_white hover:bg-btn_hover font-semibold dark:bg-dk_bg_card dark:hover:border-dk_txt border-2 dark:border-dk_bg_card "
                        >
                            Start
                        </button>
                        <button
                            onClick={handleSubmitRegister}
                            className="rounded-md bg-btn_red p-2 hover:border-white text-bkg_white hover:bg-btn_hover font-semibold dark:bg-dk_bg_card dark:hover:border-dk_txt border-2 dark:border-dk_bg_card "
                        >
                            Register Now!
                        </button>
                    </div>
                </form>

                <button onClick={handleToggleTheme} className="bg-dk_bg dark:bg-bkg_white h-10 aspect-square rounded-full">
                    {darkModeSlice ? <i className="bx bxs-sun text-dk_bg "></i> : <i className="bx bxs-moon text-white"></i>}
                </button>
            </section>

            {/* Alert */}
            {errorMessage && (
                <div className="absolute top-4 inset-x-0 flex justify-center z-50">
                    <p className="bg-red-100 text-red-700 font-semibold text-xl px-4 py-2 rounded shadow">{errorMessage}</p>
                </div>
            )}

            {/* Alert */}
            {successMessage && (
                <div className="absolute top-4 inset-x-0 flex justify-center z-50">
                    <p className="bg-green-100 text-green-800 font-semibold text-xl px-4 py-2 rounded shadow">{successMessage}</p>
                </div>
            )}

            {/* Sección inferior */}
            <section>
                <FooterHome />
            </section>
        </main>
    );
};

export default Home;
