USE employee_trackerdb;

-- Managers Below (manager_id should be null for each)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Rogers", 1, null),
("Bobby", "Drake", 3, null),
("Diana", "Prince", 5, null),
("Selina", "Kyle", 7, null);

-- Employees Below
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Farah", "McCall", 4, 3), 
("Dominic", "Velasquez", 8, 7), 
("Adelina", "Stephenson", 8, 7), 
("Tehya", "Brandt", 4, 3), 
("Ami", "O'Brien", 2, 1),
("Indigo", "Guzman", 6, 5),
("Hughie", "Osborne", 8, 7),
("Clyde", "Nash", 6, 5),
("Leah", "Macleod", 2, 1);

SELECT * FROM employee;