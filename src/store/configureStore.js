import { configureStore } from '@reduxjs/toolkit';
import rootReducers from '../reducers';

export default function createStore() {
    return configureStore({
        reducer: rootReducers,
    });
}

