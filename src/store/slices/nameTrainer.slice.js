import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('trainerData')) || {
    _id: '',
    username: ''
};

const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {
        setTrainerData: (state, action) => {
            localStorage.setItem('trainerData', JSON.stringify(action.payload));
            return action.payload;
        },
        clearTrainerData: () => {
            localStorage.removeItem('trainerData');
            return { _id: '', username: '' };
        }
    }
});

export const { setTrainerData, clearTrainerData } = trainerSlice.actions;
export default trainerSlice.reducer;
