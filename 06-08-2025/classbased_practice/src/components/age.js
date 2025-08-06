import { Component } from "react";

class Age extends Component {
  //same method/way of implementation as child component
  onTrigger = (event) => {
    const dateValue = event.target.elements.age.value;
    const ageValue = this.getAge(dateValue, new Date());

    this.props.parentCallback(dateValue, ageValue);
    console.log("Age Value from onTrigger event - ", ageValue);
    event.preventDefault();
  };

  getAge = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    let diff = date2.getTime() - date1.getTime();

    let diffNormalizationYear = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    let diffNormalizationMonth = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    let diffNormalizationDay = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));

    console.log(diffNormalizationYear, "- Year");
    console.log(diffNormalizationMonth, "- Month");
    console.log(diffNormalizationDay, "- Days");

    let normAge = `${diffNormalizationDay.toString()} days - ${diffNormalizationMonth.toString()} months - ${diffNormalizationYear.toString()} years`;
    //console.log(normAge)
    return normAge;
  };

  render() {
    return (
      <div>
        <h4>Simple Age Calulator:-</h4>
        <form onSubmit={this.onTrigger}>
          <input type="date" name="age"></input>

          <button type="submit">Button</button>
        </form>
      </div>
    );
  }
}

export default Age;
