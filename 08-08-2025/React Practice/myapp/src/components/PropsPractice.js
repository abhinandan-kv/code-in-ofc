function Car(props) {
  return <h2>I am a { props.brand.model }! adn my name is :{props.brand.name}</h2>;
}

function Garage() {
  const carInfo = { name: "Ford", model: "Mustang" };
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car brand={ carInfo } />
    </>
  );
}


export default Garage