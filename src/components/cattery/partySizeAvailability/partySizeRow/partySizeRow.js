import React, { Component } from "react";
import { checkMark } from "../../../../utils/icons/icons";
import "./css/partySizeRow.css";
import { render } from "@testing-library/react";
import { useState, useEffect } from "react";

const PartySizeRow = props => {
  const { currentOccupancy, partySize, parties } = props;

  const [isAvailable, setIsAvailable] = useState(false);
  const [nextTimeAvailable, setNextTimeAvailable] = useState("");
  //   const [exitedGuests, setExitedGuests] = useState(currentOccupancy);
  const spotsRemaining = 15 - currentOccupancy;

  let getNextTime = () => {
    // let firstPartyEndTime = parties[0].times.end;
    let newTime;
    let numSpotsAvailable = spotsRemaining + parties[0].numberInParty;

    for (let i = 0; i < parties.length; i++) {
      //14 <= 7 + 3
      if (partySize <= numSpotsAvailable) {
        // console.log("Enter" + parties[i].times.end);

        newTime = parties[i].times.end;
        break;
      } else {
        // console.log(`Else ${numSpotsAvailable + parties[i].numberInParty}`);
        newTime = parties[i].times.end;
        numSpotsAvailable = numSpotsAvailable + parties[i].numberInParty;

        // exitedGuests += parties[i].numberInParty;
      }
    }
    return newTime;
  };
  //   useEffect(() => {
  //     console.log(parties);

  //     setNextTimeAvailable(newTime);
  //   }, [currentOccupancy]);

  return (
    <div id="party-size1" className="party-size-wrapper">
      <div className="party-size">{partySize}</div>
      <div className="next-available-time">
        {partySize <= spotsRemaining ? checkMark : getNextTime()}
      </div>
    </div>
  );
};

// this.getNextAvailableTime(partySize)
export default PartySizeRow;
