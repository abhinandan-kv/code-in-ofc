import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({ user: userSlice });
//will do later confused between createStore setup and configureStore setup.
export const store = configureStore(rootReducer, applyMiddleware(thunk));
