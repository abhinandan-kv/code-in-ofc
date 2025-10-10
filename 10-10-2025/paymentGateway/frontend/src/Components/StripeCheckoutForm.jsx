import { useCheckout, ExpressCheckoutElement } from "@stripe/react-stripe-js/checkout";

const StripeCheckoutForm = () => {
  const checkoutState = useCheckout();

  if (checkoutState.type === "loading") {
    return <div>Loading...</div>;
  } else if (checkoutState.type === "error") {
    return <div>Error: {checkoutState.error.message}</div>;
  }

  const handleConfirmExpressCheckout = (event) => {
    if (checkoutState.type === "success") {
      checkoutState.checkout.confirm({ expressCheckoutConfirmEvent: event });
    }
  };

  return (
    <div>
      {checkoutState.type === "success" && (
        <pre>
          {JSON.stringify(checkoutState.checkout.lineItems, null, 2)}
          Total: {checkoutState.checkout.total?.amount}
        </pre>
      )}
      <ExpressCheckoutElement onConfirm={handleConfirmExpressCheckout} />
    </div>
  );
};

export default StripeCheckoutForm;
