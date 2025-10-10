import axios from "axios";
import React from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StripeCheckout = () => {
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/payembed`);
    console.log(res);
  }

  const clientSecret = axios
    .post(`${BASE_URL}/payembed`)
    .then((response) => response.json())
    .then((json) => json.client_secret);
  return (
    <CheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </CheckoutProvider>
  );
};

export default StripeCheckout;
