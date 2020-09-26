const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table")

// Program will add your password without need for hardcoding
inquirer.prompt({
    type: "password",
    name: "pass",
    message: "Please enter your MySQL password"
}).then(result => {
    var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: result.pass,
    database: "employee_trackerdb"
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Password was accepted!");
        startMenu();
    });

    function startMenu() {
        inquirer.prompt({
            type: "list",
            name: "menuChoice",
            message: "What would you like to do?",
            choices: ["View all Employees"]
        }).then(res => {
            switch (res.menuChoice) {
                case "View all Employees":
                    viewAll();
                    break;
            };
        });
    }

    function viewAll() {
        // This query is to show all 
        let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, "
        query += "CONCAT(e.first_name, ' ', e.last_name) AS manager FROM employee "
        query += "LEFT JOIN employee e on employee.manager_id = e.id "
        query += "INNER JOIN role ON role.id = employee.role_id "
        query += "INNER JOIN department ON department.id = role.department_id "
        query += "ORDER BY employee.id;"
        connection.query(query, (err, res) => {
            console.log();
            console.table(res);
        })

        connection.end();
    }
})