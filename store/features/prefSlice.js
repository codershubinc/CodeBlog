import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prefs: null
}

const prefSlice = createSlice({
    name: 'prefs',
    initialState,
    reducers: {
        setPrefs: (state, action) => {
            state.prefs = action.payload
            console.log(state.prefs);
        }
    }
})
export const { setPrefs } = prefSlice.actions
export default prefSlice.reducer