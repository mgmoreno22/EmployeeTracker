-- THIS SEED WILL REMOVE DATABASE AND RESET ALL
-- DATA FOR EMPLOYEE TRACKER APP

-- EMPLOYEE_TRACKER.SQL 
DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- DEPARTMENT SEEDS
INSERT INTO department (department_name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

-- ROLE SEEDS
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Account Manager", 140000, 2),
("Accountant", 115000, 2),
("Legal Team Lead", 145000, 3),
("Lawyer", 105000, 3),
("Sales Lead", 130000, 4),
("Sales Associate", 85000, 4);

-- EMPLOYEES SEEDS
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Rogers", 1, null),
("Bobby", "Drake", 3, null),
("Diana", "Prince", 5, null),
("Selina", "Kyle", 7, null);

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

-- RUN QUERY TO SHOW ALL 3 TABLES/CONFIRM DATA
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;