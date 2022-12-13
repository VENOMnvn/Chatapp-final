import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedin: false,
    UserName: ""
};

const loginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        login(state, action) {
            return state = {
                loggedin: true,
                UserName: action.payload
            }
        },
        logout(state, action) {
            state.loggedin = false
        }
    }
})


export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;


