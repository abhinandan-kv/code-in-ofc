import withLogger from "./Logger";

// A functional component to be wrapped
const MyFunctionalComponent = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

// Apply the HOC to the functional component
const MyLoggedComponent = withLogger(MyFunctionalComponent);

export default MyLoggedComponent