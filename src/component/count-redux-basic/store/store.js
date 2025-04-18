import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counderSlice";

const store = configureStore({
    reducer:{
        counter:counterReducer,
    }
})

export default store;
    