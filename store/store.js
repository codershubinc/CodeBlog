import { configureStore } from "@reduxjs/toolkit";
import isAuthSlice from "./features/isAuthSlice";

const store = configureStore({
    reducer: {
        auth: isAuthSlice
    },
});

export default store