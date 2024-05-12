import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: false,
    userData: null

}


const isAuthSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            console.log(state.userData);
        },
        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})
export const { login, logout } = isAuthSlice.actions

export default isAuthSlice.reducer
