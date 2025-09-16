# Steps to create a basic redux enabled WITH Redux Persist counter app / boilerPlate

## Step - 1

Create a file named store.jsx in src/app, where the persistConfig is the configuration object that defines how and what parts of the state should be persists(saved) and hydrated(restored) across application sessions.

- Create persistConfig and define configurations
- Then Create rootReducer make a call combineReducers from '@reduxjs/toolkit' and pass an object of your reducer name and reducer function (basically the stuff which you were passing directly in configureStore)
- Then Create persistedReducer and call persistReducer from 'redux-persist' and pass the argument (persistConfig, rootReducer)
- Then Create and export Store and call configureStore from '@reduxjs/toolkit' and pass an object {reducer: persistedReducer}
- At last Create and export persistor and call persistStore from 'redux-persist/es/persistStore' and pass the Store in it as argument.

```js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// import { rootReducer } from "../Reducers/rootReducer";
import { persistReducer } from "redux-persist";
import CounterReducer from "../features/counter/CounterSlice";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  //   whitelist:[],                                     // OPTIONAL
  //   blacklist:[],                                     // OPTIONAL
  //   stateReconciler: autoMergeLevel1,                 // OPTIONAL
  //   transform:[]                                      // OPTIONAL
};

const rootReducer = combineReducers({
  // <-- You can either create a file Reducers/rootReducer.jsx ir write it here.
  counter: CounterReducer,
});

// create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//create a redux store with the persisted Reducer
export const Store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(Store);
```

## Step - 2

Create State slices now, make a counterSlice.jsx file in features/counter folder,

- This(slices) will remain same as how we used to do in redux.

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // the reason you are able to do this is because of the immer(lib) is working underthehood (otherwise you cant set the state value/cant change the state value directly)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;

export default CounterSlice.reducer;
```

## Step - 3

Wrap your root component with provider component, and also with PersistGate component.

- Wrap the App component with PersistGate imported form 'redux-persist/integration/react' component and pass the persistor which we exported from step 1 (store.jsx)

```js
<Provider store={Store}>
  {/* //can add loading component for ui */}
  <PersistGate persistor={persistor} loading={null}>
    <App />
  </PersistGate>
</Provider>
```

## Step - 4

Interact witht the Store in component you need to use, here we are using in counter.jsx
Use useSelector and useDispatch from react-redux. No difference with redux-persist.

```js
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../features/counter/CounterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <h2>Counter:{count}</h2>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      </div>
    </>
  );
}
```
