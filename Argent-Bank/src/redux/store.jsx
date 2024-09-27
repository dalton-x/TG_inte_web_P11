import { configureStore, combineReducers } from '@reduxjs/toolkit';


import { authReducer } from './reducers/auth.reducer.jsx';
import { userReducer } from './reducers/user.reducer.jsx';

// Combinaison des réducteurs en un réducteur racine
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
})

// Configuration du magasin Redux
const store = configureStore({
    reducer: rootReducer,
})

export default store;
