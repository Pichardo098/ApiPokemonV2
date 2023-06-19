import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/nameTrainer.slice";
import pokemonsPerPage from "./slices/pokemonsPerPage.slice";
import darkModeSlice from "./slices/darkMode.slice";

export default configureStore({
  reducer:{
    // Aqui estan los estados globales/slices
    nameTrainer,
    pokemonsPerPage,
    darkModeSlice
  }
})