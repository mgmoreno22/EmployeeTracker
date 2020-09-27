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
            choices: ["View all Employees", "Add Employee"]
        }).then(res => {
            switch (res.menuChoice) {
                case "View all Employees":
                    viewAll();
                    break;
                case "Add Employee":
                    addEmployee();
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
            if (err) throw err;
            console.log();
            console.table(res);
            console.log();
        })
        startMenu();
        // connection.end();
    }

    function listRoles() {
        let query = "SELECT title FROM role"
        connection.query(query, (err, res) => {
            if (err) throw err;
            var rolesArr = []
            for (var i=0; i < res.length; i++) {
                choices.push(res[i].title)
            }
            return rolesArr
        })
    }

    function listManagers() {
        let query = "SELECT * FROM employee WHERE manager_id IS NULL"
        connection.query(query, (err, res) => {
            if (err) throw err;
            let managerArr = [];
            for (var i=0;i < res.length; i++) {
                managerArr.push(res[i].first_name + " " + res[i].last_name)
            }
            return managerArr
        });
    }

    function addEmployee() {
        var roleArr = listRoles()
        var managerChoices = listManagers()
        console.log(managerChoices)
        connection.end;
        // inquirer.prompt([
        //     {
        //         type: "input",
        //         name: "firstName",
        //         message: "Please enter employee's First Name: "
        //     },
        //     {
        //         type: "input",
        //         name: "lastName",
        //         message: "Please enter employee's Last Name: "
        //     },
        //     {
        //         type: "input",
        //         name: "role",
        //         message: "Please enter employee's Role: "
        //     },
        //     {
        //         type: "list",
        //         name: "manager",
        //         message: "Please choose this employee's manager",
        //         choices: managerChoices
        //     }
        // ]).then(result => {
        //     // let query = "INSERT INTO employee"
        //     // connection.query(query)
        //     console.log("Yuh I'll add this in a minute")
        //     console.log(result)

        //     startMenu();
        // })
    }
})