USE employee_trackerdb;

-- Department IDs
-- Engineering: 1
-- Finance: 2
-- Legal: 3
-- Sales: 4
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Account Manager", 140000, 2),
("Accountant", 115000, 2),
("Legal Team Lead", 145000, 3),
("Lawyer", 105000, 3),
("Sales Lead", 130000, 4),
("Sales Associate", 85000, 4);

SELECT * FROM department;