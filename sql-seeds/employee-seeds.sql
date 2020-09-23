USE employee_trackerdb;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Farah", "McCall", 4, 4), 
("Dominic", "Velasquez", 8, 2), 
("Adelina", "Stephenson", 8, 1), 
("Tehya", "Brandt", 4, 3), 
("Ami", "O'Brien", 2, 2),
("Indigo", "Guzman", 6, 2),
("Hughie", "Osborne", 8, 1),
("Clyde", "Nash", 6, 4),
("Leah", "Macleod", 6, 3);

SELECT * FROM employee;