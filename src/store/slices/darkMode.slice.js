import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  initialState: true ,
  name: "darkMode",
  reducers: {
    setToggleDarkMode: (state) => {
      return !state
    }
  }
})

export const {setToggleDarkMode} = darkModeSlice.actions
export default darkModeSlice.reducer