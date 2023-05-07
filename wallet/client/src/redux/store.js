import {configureStore} from '@reduxjs/toolkit';
import usersReducer from "./userSlice";
import loadersRedcuer from "./loaderslice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        loaders: loadersRedcuer

    }
});

export default store;