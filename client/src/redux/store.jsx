import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user_reducer";
import { chartReducer } from "./reducer/chartReducer";

export const store = configureStore({
    reducer:{
        user: userReducer,
        chart: chartReducer
    }
})