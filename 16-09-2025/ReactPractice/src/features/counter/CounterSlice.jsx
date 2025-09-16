// a slice encapsulates a piece of application state, its reducers and actions. Create a file for each slice.

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
