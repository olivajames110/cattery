import React, { Component } from "react";
import Input from "../../utils/input/input";

let personn = [
  {
    name: "Carl",
    timeStart: "2:10",
    timeEnd: "3:10",
    timeRemaining: 60,
    width: "0%"
  }
];

class AddPeople extends Component {
  state = {
    people: 1
  };

  addPerson = (num, people) => {
    this.props.updateCurrentNumOfPeople(num, people);
  };

  handleUpdatePeople = () => {
    let valueNum = document.getElementById("num-value").value;

    this.setState({
      people: valueNum
    });
  };
  handleMakeInputs = valueNum => {
    return Array.from(Array(Number(this.state.people))).map(person => (
      <Input label="Party Name:" type="text" />
    ));
  };
  render() {
    return (
      <div id="add-people-container">
        <h2>Add Party</h2>
        <label>Select # of People in Party:</label>
        <select
          onChange={this.handleUpdatePeople}
          id="num-value"
          valuename="number-of-people"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        {this.handleMakeInputs()}
        <button
          onClick={() => this.addPerson(this.state.people, personn)}
          className="add"
        >
          Add Party
        </button>
      </div>
    );
  }
}

export default AddPeople;
