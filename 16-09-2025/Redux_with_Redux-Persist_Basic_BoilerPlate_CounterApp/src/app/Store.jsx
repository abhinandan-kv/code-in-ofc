import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// import { rootReducer } from "../Reducers/rootReducer";
import { persistReducer } from "redux-persist";
import CounterReducer from "../features/counter/CounterSlice";
import persistStore from "redux-persist/es/persistStore";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  storage,
//   whitelist:[],                 // OPTIONAL
//   blacklist:[],                 // OPTIONAL
//   stateReconciler: autoMergeLevel1,                 // OPTIONAL
//   transform:[]                  // OPTIONAL
};

const rootReducer = combineReducers({           // <-- You can either create a file Reducers/rootReducer.jsx ir write it here.
  counter: CounterReducer,
});

// create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//create a redux store with the persisted Reducer
export const Store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(Store);


// //getting this error in console (but the state is getting preserved) -

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

// hook.js:608 A non-serializable value was detected in an action, in the path: `register`. Value: ƒ register2(key) {
//     _pStore.dispatch({
//       type: REGISTER,
//       key
//     });
//   } 
// Take a look at the logic that dispatched this action:  Object 
// (See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants) 
// (To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++