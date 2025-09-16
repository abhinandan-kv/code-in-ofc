import { useSelector } from "react-redux";

export default function CounterDisplay() {
  const count = useSelector((state) => state.counter.value);

  return (
    <>
      <h1>{count}</h1>
    </>
  );
}
