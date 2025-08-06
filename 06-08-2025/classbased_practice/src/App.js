import React from "react";
import Child from "./components/child";
import Age from "./components/age";

class App extends React.Component {
  state = {
    name: "",
    date: "",
    age: "",
  };

  // handlecallback gets the data from child component after child component triggers it.
  handleCallback = (childData) => {
    this.setState({ name: childData });
    //console.log(childData)
  };

  handleCallback2 = (dateValue, ageValue) => {
    this.setState({ data: dateValue, age: ageValue });
  };

  render() {
    const { name, date, age } = this.state;
    return (
      <div>
        <h1>Simple demonstration of sending data from child to parent using class components</h1>
        <hr></hr>

        <Child parentCallback={this.handleCallback} />
        {name}
        <br></br>
        <br></br>

        <hr></hr>
        <Age parentCallback={this.handleCallback2} />
        {date}

        {age ? <h3>{`current date is : ${age} OLD`} </h3> : ""}
      </div>
    );
  }
}
export default App;
