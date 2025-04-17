import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admindata: null, 
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminInfo: (state, action) => {
            state.admindata = action.payload;
        },
        logout:(state)=>{
            localStorage.removeItem("adminToken")
            state.admindata = null;
        },
    },
});

export const { setAdminInfo ,logout} = adminSlice.actions;
export default adminSlice.reducer;