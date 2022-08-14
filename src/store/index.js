import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import reducer from './reducers';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    // reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })]
});

const persistor = persistStore(store);

export { store, persistor };
