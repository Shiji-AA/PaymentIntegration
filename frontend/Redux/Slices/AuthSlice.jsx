import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userdata: null, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userdata = action.payload;
            
        },
        logout:(state)=>{
            localStorage.removeItem("token")
            state.userdata = null;
        },
        updateProfile: (state,action)=>{
            if(state.userdata !==null){
                state.userdata=action.payload;
            }
        },  
               
      

}
});

export const { setUserInfo ,logout,updateProfile} = authSlice.actions;
export default authSlice.reducer;