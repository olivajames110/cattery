# Cattery

[View Project](https://olivajames110.github.io/cattery/)

*Test Mode:* 
Double click the time to go into test mode. This makes the countdown on the cards 900ms instead 1 minute.

------

*Overall Goal:* 
To make the process of managing walk-ins easier for the employee

*Max Occupancy:* 
15 People

*How Cattery Works:* 
Users currently make a reservation online through a third party service. Walk-ins are allowed, however reservation slots take priority, even if the party has currently not arrived for their time slot.
For example: the Current Time is 2pm. and Current Occupancy of the Cattery is 10 people. There is currently is a reservation set for 2pm but the party has yet to arrive. If a party of 5 walks in, they will not be allowed to enter because of the booked reservation slot at 2pm.


*Notable Features*
- Red cards indicate overdue, gray cards indicate currently in cattery, blue cards indicate reservation
- When time goes past zero, card turns red to indicate time is expired. Time continues to count down past zero to shower employee that the guest is X minutes past their end time. Guests are usually allowed to stay past end time if not busy. If busy rush occurs, employee now knows which customer to ask first ask to leave
- Click the payment container to toggle between Paid and Not Paid
- Reservations: countdown will not begin until user checks in. If party Start Time is equal to the Current Time, the reservation will automatically move into "Currently In Cattery" container

*Upcoming Updates:*
- Party Size Availability: quickly shows if a party size of X walks through the door at the current time, are there enough available spots for the party? If there are not enough spots, it will display the next possible time that a party size of X will be allowed to enter based on the current occupants End Time.
