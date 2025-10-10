import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CheckoutForm from "./Components/CheckoutForm";
import PaymentComponent from "./Components/PaymentComponent";
import StripeCheckout from "./Components/StripeCheckout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PaymentComponent />
      <StripeCheckout />
    </>
  );
}

export default App;
