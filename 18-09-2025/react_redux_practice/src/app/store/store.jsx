import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";

// normal redux
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// redux persist
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ counter: counterReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);
