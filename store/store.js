import { configureStore } from "@reduxjs/toolkit";
import isAuthSlice from "./features/isAuthSlice";
import prefSlice from "./features/prefSlice";

const store = configureStore({
    reducer: {
        auth: isAuthSlice,
        pref: prefSlice,
    },
});

export default store