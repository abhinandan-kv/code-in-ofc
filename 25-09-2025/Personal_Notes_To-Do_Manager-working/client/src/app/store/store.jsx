import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import notesReducer from "../features/noteSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  todo: todoReducer,
  note: notesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);
