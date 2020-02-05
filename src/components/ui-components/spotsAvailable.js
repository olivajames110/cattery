import React, { useState, useEffect } from "react";
import { usersIcon } from "../../utils/icons/icons";
import { sortArrayByKey } from "../../utils/helpers/helpers";

const SpotsAvailable = ({
  parties,
  currentOccupancy,
  currentNumOfUpcomingReservations,
  currentNumOverdue
}) => {
  const [numOfOverlap, setNumOfOverlap] = useState(0);
  const [numOfSpotsAvailable, setNumOfSpotsAvailable] = useState(0);
  const [numOfCurrentOccupancy, setNumOfCurrentOccupancy] = useState(0);
  const upcomingTag = (
    <div className="upcoming-reservations">Includes {currentNumOfUpcomingReservations} Upcoming</div>
  );

  let checkifOverlap = () => {
    let reservationList = sortArrayByKey(parties, "isUpcomingReservation", true);
    let overlappingPartiesArray = sortArrayByKey(parties, "isOverlap", true);
    let nonOverlappingPartiesArray = sortArrayByKey(parties, "isOverlap", false);
    let overLapOffset = 0;

    if (parties.length >= 1 && reservationList.length >= 1 && overlappingPartiesArray) {
      let firstPartyEndTime = parties[0].times.timeStamp + 3600;
      let upcomingEndTime = reservationList[0].times.timeStamp;
      let sumOfNonOverlaps;
      let sumOfUpcomingReservations;

      if (firstPartyEndTime >= upcomingEndTime) {
        parties[0].isOverlap = true;
      }

      let nonOverLappingNum = nonOverlappingPartiesArray.reduce(function(prev, cur) {
        return prev + cur.numberInParty;
      }, 0);
      let reservationListSum = reservationList.reduce(function(prev, cur) {
        return prev + cur.numberInParty;
      }, 0);

      sumOfNonOverlaps = nonOverLappingNum;
      sumOfUpcomingReservations = reservationListSum;

      if (sumOfNonOverlaps < sumOfUpcomingReservations) {
        overLapOffset = sumOfNonOverlaps;
      } else {
        overLapOffset = sumOfUpcomingReservations;
      }
    } else {
      overLapOffset = 0;
    }

    setNumOfOverlap(overLapOffset);
  };

  let calcNumOfCurrentOccupancy = () => {
    let currentOccupancyList__rowNum = sortArrayByKey(parties, "rowNum", 1);
    let currentOccupancyList = sortArrayByKey(currentOccupancyList__rowNum, "isReservation", false);
    let currentOccupancyNum = currentOccupancyList.reduce(function(prev, cur) {
      return prev + cur.numberInParty;
    }, 0);
    setNumOfCurrentOccupancy(currentOccupancyNum);
    console.log("Current Occupancy" + currentOccupancyNum);
  };

  useEffect(() => {
    let num = 15 - (currentOccupancy + currentNumOfUpcomingReservations - currentNumOverdue - numOfOverlap);
    checkifOverlap();
    calcNumOfCurrentOccupancy();
    setNumOfSpotsAvailable(num);
  }, [currentOccupancy, currentNumOfUpcomingReservations, currentNumOverdue, numOfOverlap]);

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
