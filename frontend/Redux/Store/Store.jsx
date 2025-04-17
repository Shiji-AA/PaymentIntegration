import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import adminReducer from '../Slices/AdminSlice'
import { persistReducer, persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage";



const persistConfig={
    storage,
    key:"auth"
}



const persistConfigAdmin = {
    storage,
    key:"admin"
}

const persistedAuthreducer=persistReducer(persistConfig,authReducer)
const persistedAdminreducer=persistReducer(persistConfigAdmin,adminReducer)

export const store= configureStore({
    reducer:{
        auth :persistedAuthreducer,     
        admin:persistedAdminreducer,
    }
})

export const persistor=persistStore(store)