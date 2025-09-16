import {configureStore} from '@reduxjs/toolkit'
import CounterReducer from '../features/counter/CounterSlice'

export const Store = configureStore({
    reducer:{
        //add slice reducers here
        counter : CounterReducer
    }
});
