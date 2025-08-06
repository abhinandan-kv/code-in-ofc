import "./App.css";
import Calculator from "./components/Calculator";
import Counter from "./components/Counter";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <main className="wrapper">
        <Todo />
        {/* <hr /> */}
        <Calculator />
        {/* <hr /> */}
        <Counter />
      </main>
    </>
  );
}

export default App;
