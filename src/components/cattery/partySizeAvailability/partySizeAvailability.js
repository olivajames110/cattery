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
      currentOccupancy={props.currentOccupancy}
      listOfParties={props.listOfParties}
      partySize={i + 1}
      key={Math.random()}
    />
  ));

  // for (let i = 0; i <= 15; i++) {
  //   //   console.log("Party: " + i);
  //   return <PartySizeRow partySize="1" />;
  // }

  return (
    <div id="party-size-availability-container">
      <h2>Walk-In Availability</h2>
      {partyRows}
    </div>
  );
};

export default PartySizeAvailability;
