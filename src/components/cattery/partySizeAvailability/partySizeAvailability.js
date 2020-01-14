import React, { Component } from "react";
import "./css/partySizeAvailability.css";
import PartySizeRow from "./partySizeRow/partySizeRow";
const PartySizeAvailability = props => {
  //   let partyRows = function() {
  //     let partyRows = (
  //       <div className="containr">
  //         <PartySizeRow partySize="1" />
  //         <PartySizeRow partySize="1" />
  //         <PartySizeRow partySize="1" />
  //       </div>
  //     );

  let partyRows = Array.from(Array(15)).map((x, i) => (
    <PartySizeRow
      currentTime={props.currentTime}
      currentNumOfPeople={props.currentNumOfPeople}
      listOfParties={props.listOfParties}
      partySize={i + 1}
    />
  ));

  // for (let i = 0; i <= 15; i++) {
  //   //   console.log("Party: " + i);
  //   return <PartySizeRow partySize="1" />;
  // }

  return (
    <div id="party-size-availability-container">
      <h2>Party Size Availability</h2>
      {partyRows}
    </div>
  );
};

export default PartySizeAvailability;
