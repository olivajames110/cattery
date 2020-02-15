import React, { useState, useEffect } from "react";
import { usersIcon } from "../../utils/icons/icons";
import { sortArrayByKey, addArrayByKey } from "../../utils/helpers/helpers";

const SpotsAvailable = ({ parties, currentOccupancy, currentNumOfUpcomingReservations, currentNumOverdue }) => {
    const [numOfNonOverlap, setNumOfNonOverlap] = useState(0);
    const [numOfSpotsAvailable, setNumOfSpotsAvailable] = useState(0);

    let checkifOverlap = () => {
        let upcomingReservationList = sortArrayByKey(parties, "isUpcomingReservation", true);
        let overlapAdjustment = 0;
        // console.log('LOOOOOOP STARTED');

        if (parties.length >= 1 && upcomingReservationList.length >= 1) {
            let row1 = sortArrayByKey(parties, "rowNum", 1);
            let currentOccupancyList = sortArrayByKey(row1, "isUpcomingReservation", false);

            //Arrays
            let overlappingParties = [];
            let nonOverlappingParties = [];

            //Sums
            let nonOverlappingParties__sum;
            let upcomingReservations__sum;

            //Sort parties into seperate arrays based on if they're overlapping
            for (let i = 0; i < upcomingReservationList.length; i++) {
                let reservationTime = upcomingReservationList[i].times.timeStamp;
                currentOccupancyList.forEach(party => {
                    let partyEndTime = party.times.timeStamp + 3600;
                    if (partyEndTime >= reservationTime) {
                        overlappingParties.push(party);
                    } else {
                        nonOverlappingParties.push(party);
                    }
                });
            }

            console.log(`overlap length: ${overlappingParties.length}`);
            console.log(`nonOverlap length: ${nonOverlappingParties.length}`);
            console.log(`upcomingReservationList length: ${upcomingReservationList.length}`);

            if (nonOverlappingParties.length >= 1 && upcomingReservationList.length >= 1) {
                if (nonOverlappingParties.length > 1) {
                    nonOverlappingParties__sum = addArrayByKey(nonOverlappingParties, "numberInParty");
                } else {
                    nonOverlappingParties__sum = nonOverlappingParties[0].numberInParty;
                }

                if (upcomingReservationList.length > 1) {
                    upcomingReservations__sum = addArrayByKey(upcomingReservationList, "numberInParty");
                } else {
                    upcomingReservations__sum = upcomingReservationList[0].numberInParty;
                }

                if (nonOverlappingParties__sum < upcomingReservations__sum) {
                    overlapAdjustment = nonOverlappingParties__sum;
                } else {
                    overlapAdjustment = upcomingReservations__sum;
                }
            } else {
                overlapAdjustment = 0;
            }
        }

        console.log(`OVERLAP ADJUSTMENT:  ${overlapAdjustment}`);
        setNumOfNonOverlap(overlapAdjustment);
    };

    useEffect(() => {
        checkifOverlap();
        let num = 15 - (currentOccupancy + currentNumOfUpcomingReservations - currentNumOverdue - numOfNonOverlap);
        setNumOfSpotsAvailable(num);
    }, [parties]);

    // useEffect(
    // 	() => {
    // 		handleSendToServer();
    // 	},
    // 	[ numOfSpotsAvailable ]
    // );

    return (
        <div id="current-spots remaining" className="container">
            <span className="icon">{usersIcon}</span>
            <span className="primary-value  number-in-cattery">
                <span>{numOfSpotsAvailable}</span>
                {currentNumOfUpcomingReservations === 0 ? "" : <div className="upcoming-reservations">Includes {currentNumOfUpcomingReservations} Upcoming</div>}
            </span>
            <span className="open-spots">Spots Available</span>
        </div>
    );
};

export default SpotsAvailable;
