USE employee_trackerdb;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Farah", "McCall", 2, 4), 
("Dominic", "Velasquez", 4, 2), 
("Adelina", "Stephenson", 4, 1), 
("Tehya", "Brandt", 2, 3), 
("Ami", "O'Brien", 1, 2),
("Indigo", "Guzman", 3, 2),
("Hughie", "Osborne", 4, 1),
("Clyde", "Nash", 3, 4),
("Leah", "Macleod", 3, 3);

SELECT * FROM employee;