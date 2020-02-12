# Cattery

[View Project](https://olivajames110.github.io/cattery/)

------

*Notable Features* 
Upcoming Reservation Adjustment:  
- Feature: turn reservation card blue when reservation start time is within 1 hour of the current time. A blue card indicates that both 1) the party is a reservation, and 2) the reservation time is within 1 hour of current time. 
- Ex: Current time is 3:00 PM and reservation start time is 3:50 PM

Reservation Row Adjustment:  
- Feature: move reservation card from reservation row to current occupancy row. The party size DOES NOT affect current occupancy since the party is not present yet, but it DOES affect Spots Available.
- Ex: Current time is 3:00 PM and reservation start time is 3:00 PM

Party Over Time Limit:  
- Feature: when Time Left reaches zero, the party turns red indicating that their time has expired. The party size DOES NOT affect current occupancy since the party is present yet, but it does affect Spots Available.
- Ex: Current time is 3:00 PM and reservation start time is 1:50 PM
