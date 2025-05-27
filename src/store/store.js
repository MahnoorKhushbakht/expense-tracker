import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dataSlice from "./dataSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  auth: authSlice,
  expenses: dataSlice,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "expenses"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
