import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    user: null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUser: (state,action) =>{
            state.status = true
            state.user = action.payload
        },
        logoutUser: (state,action) => {
            state.status = false
            state.user = null
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer