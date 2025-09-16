# Steps to create a basic redux enabled counter app / boilerPlate

## Step - 1

Create a file named store.jsx in src/app

```js
import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../features/counter/CounterSlice";

export const Store = configureStore({
  reducer: {
    //add slice reducers here
    counter: CounterReducer,
    //      ^^^^^^
    // counter name : counterReducerFunctionName
  },
});
```

## Step - 2

Create State slices now, make a counterSlice.jsx file in features/counter folder

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

Wrap your root component with provider component.

```js
<Provider store={Store}>
  <App />
</Provider>
```

## Step - 4

Interact witht the Store in component you need to use, here we are using in counter.jsx
Use useSelector and useDispatch from react-redux.

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
