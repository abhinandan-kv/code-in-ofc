import logo from "./logo.svg";
import "./App.css";
import Enchanced from "./Components/Enchanced";
import MouseEnchanced from "./Components/MouseEnchanced";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./utils/Loading";

export function Home() {
  return (
    <>
      <Link to={"/e"}>
        <div>Enchanced Hoc simple Example</div>
      </Link>
      <Link to={"/m"}>
        <div>Enchanced Hoc Mouse Event Example</div>
      </Link>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, [loading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loading ? <Loading /> : <Home />}></Route>
        <Route path="/e" element={loading ? <Loading /> : <Enchanced />}></Route>
        <Route path="/m" element={loading ? <Loading /> : <MouseEnchanced />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
