import React, { useState, useEffect } from "react";
import { usersIcon } from "../../utils/icons/icons";
import {
  checkIfMultiple,
  checkifOverlap,
  sortArrayByKey
} from "../../utils/helpers/helpers";

const SpotsAvailable = ({
  parties,
  currentOccupancy,
  currentNumOfUpcomingReservations,
  currentNumOverdue
}) => {
  const [numOfOverlap, setNumOfOverlap] = useState(0);
  const [numOfSpotsAvailable, setNumOfSpotsAvailable] = useState(0);
  const upcomingTag = (
    <div className="upcoming-reservations">
      Includes {currentNumOfUpcomingReservations} Upcoming
    </div>
  );

  let checkifOverlap = () => {
    // firstParty = 1580766540 + 3600
    // firstParty = 1580770140
    // resParty = 1580769300
    console.log("STARTUBG");
    let reservationList = sortArrayByKey(
      parties,
      "isUpcomingReservation",
      true
    );
    let overLapOffset = 0;

    // let overLapOffset = sortArrayByKey(parties, "isOverlap", true);
    //party sum = num of all parties where isOverlapping === false;
    let partiesSum = 0;

    //sum of all IsUpcomingReservation
    let reservationSum = 7;
    // let calcOverLapOffset = () => {
    //   if (partiesSum < reservationSum) {
    //     overLapOffset = sumOfAllPartiesWhereIsOverlapIsEqualToFalse;
    //   }
    // };

    if (parties.length >= 1 && reservationList.length >= 1) {
      let firstPartyEndTime = parties[0].times.timeStamp + 3600;
      let upcomingEndTime = reservationList[0].times.timeStamp;
      let numInUpcomingParty = parties[0].numberInParty;

      if (firstPartyEndTime >= upcomingEndTime) {
        parties[0].isOverlap = true;
        console.log("YES overlap");
        console.log(numInUpcomingParty);
      }

      let overLappingParties = sortArrayByKey(parties, "isOverlap", false);
      let overLappingNum = overLappingParties.reduce(function(prev, cur) {
        return prev + cur.numberInParty;
      }, 0);
      console.log("OVERLAP NUMMMM_____");
      console.log(overLappingNum);
      overLapOffset = overLappingNum;
    }

    setNumOfOverlap(overLapOffset);
  };

  useEffect(() => {
    let num =
      15 -
      (currentOccupancy +
        currentNumOfUpcomingReservations -
        currentNumOverdue -
        numOfOverlap);
    checkifOverlap();
    setNumOfSpotsAvailable(num);
  }, [
    currentOccupancy,
    currentNumOfUpcomingReservations,
    currentNumOverdue,
    numOfOverlap
  ]);

  return (
    <div id="current-spots remaining" className="container">
      <span className="icon">{usersIcon}</span>
      <span className="primary-value  number-in-cattery">
        <span>{numOfSpotsAvailable}</span>
        {currentNumOfUpcomingReservations === 0 ? "" : upcomingTag}
      </span>
      <span className="open-spots">Spots Available</span>
    </div>
  );
};

export default SpotsAvailable;
