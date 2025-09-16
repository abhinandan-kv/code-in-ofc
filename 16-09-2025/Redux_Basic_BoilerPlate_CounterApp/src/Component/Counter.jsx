import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../features/counter/CounterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <h2>Counter:{count}</h2>
        <button onClick={()=> dispatch(increment())}>Increment</button>
        <button onClick={()=> dispatch(decrement())} >Decrement</button>
        <button onClick={()=> dispatch(incrementByAmount(5))} >Increment by 5</button>
      </div>
    </>
  );
}
