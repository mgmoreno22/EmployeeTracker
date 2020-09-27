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
            choices: ["View all Employees", "View all Roles", "View all Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "End Program"]
        }).then(res => {
            switch (res.menuChoice) {
                case "View all Employees":
                    viewAll();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "View all Departments":
                    viewDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "End Program":
                    console.log("Goodbye.");
                    connection.end();
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
            startMenu();
        })
        // connection.end();
    }
    
    function viewRoles() {
        let query = "SELECT role.id, role.title, role.salary, department.department_name FROM role "
        query += "INNER JOIN department ON department.id = role.department_id"
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log();
            console.table(res);
            console.log();
            startMenu();
        })
    }

    function viewDepartments() {
        let query = "SELECT * FROM department"
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log();
            console.table(res);
            console.log();
            startMenu();
        })
    }

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Please enter employee's First Name:"
            },
            {
                type: "input",
                name: "lastName",
                message: "Please enter employee's Last Name:"
            }
        ]).then(nameResult => {
            connection.query("SELECT * FROM role", (err, roleRes) => {
                if (err) throw err;
                let rolesArr = []
                for (var i=0; i < roleRes.length; i++) {
                    rolesArr.push(roleRes[i].title)
                }
                inquirer.prompt({
                    type: "list",
                    name: "role",
                    message: "Please choose this employee's role:",
                    choices: rolesArr
                }).then(roleResult => {
                    for (var i=0; i< roleRes.length; i++) {
                        if (roleRes[i].title == roleResult.role) {
                            var newRole = roleRes[i].id
                        }
                    }
                    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", (err, manRes) => {
                        if (err) throw err;
                        let managerArr = [];
                        for (var i=0;i < manRes.length; i++) {
                            let manName = manRes[i].first_name + " " + manRes[i].last_name
                            managerArr.push(manName)
                        }
                        inquirer.prompt({
                            type: "list",
                            name: "manager",
                            message: "Please choose this employee's manager:",
                            choices: managerArr
                        }).then(manResult => {
                            for (var i=0; i<manRes.length; i++) {
                                let manName = manRes[i].first_name + " " + manRes[i].last_name
                                if (manName == manResult.manager) {
                                    newManager = manRes[i].id
                                }
                            }
                            connection.query("INSERT INTO employee SET ?", 
                            {
                                first_name: nameResult.firstName,
                                last_name: nameResult.lastName,
                                role_id: newRole,
                                manager_id: newManager
                            }, (err) => {
                                if (err) throw err;
                                console.log("The employee has been added");
                                console.log();
                                startMenu();
                            }) 
                        }) 
                    })
                }) 
            }) 
        }) 
    } // close function

    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Please enter the role you would like to add:"
            },
            {
                type: "input",
                name: "salary",
                message: "Please enter this role's salary:"
            },
        ]).then(roleResult => {
            connection.query("SELECT * FROM department", (err, depRes) => {
                if (err) throw err;
                let depArr = [];
                for (var i=0; i < depRes.length; i++) {
                    let dep = depRes[i].department_name
                    depArr.push(dep)
                }
                inquirer.prompt({
                    type: "list",
                    name: "department",
                    message: "Please choose this role's department:",
                    choices: depArr
                }).then(depResult => {
                    for (var i=0; i< depRes.length; i++) {
                        if (depRes[i].department_name == depResult.department) {
                            var department = depRes[i].id
                        };
                    };
                    connection.query("INSERT INTO role SET ?", 
                    {
                        title: roleResult.title,
                        salary: roleResult.salary,
                        department_id: department
                    }, (err) => {
                        if (err) throw err;
                        console.log("The new role has been added.");
                        console.log();
                        startMenu();
                    })
                })
            })
        })
    };

    function addDepartment() {
        inquirer.prompt({
            type: "input",
            name: "department",
            message: "Please enter the new department:"
        }).then(result => {
            connection.query("INSERT INTO department SET ?",
            {
                department_name: result.department
            }, (err) => {
                if (err) throw err;
                console.log("The new department has been added.");
                console.log();
                startMenu();
            })
        })
    }

    function updateRole() {
        connection.query("SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            let empArr = [];
            for (var i=0; i < res.length; i++) {
                let emp = res[i].first_name + " " + res[i].last_name;
                empArr.push(emp)
            }
            inquirer.prompt({
                type: "list",
                name: "employee",
                message: "Please choose an employee to update:",
                choices: empArr
            }).then(result => {
                // VARIABLE FOR EMPLOYEE NAME
                var empID = "";
                for (var i=0; i < res.length; i++) {
                    let emp = res[i].first_name + " " + res[i].last_name;
                    if (emp == result.employee) {
                        empID = res[i].id
                    }
                }
                connection.query("SELECT * FROM role", (err, roleRes) => {
                    if (err) throw err;
                    let rolesArr = [];
                    for (var i=0; i < roleRes.length; i++) {
                        rolesArr.push(roleRes[i].title)
                    }
                    inquirer.prompt({
                        type: "list",
                        name: "role",
                        message: "Please choose this employee's new role:",
                        choices: rolesArr
                    }).then(roleResult => {
                        for (var i=0; i< roleRes.length; i++) {
                            if (roleRes[i].title == roleResult.role) {
                                var newRole = roleRes[i].id
                            }
                        }
                        connection.query("UPDATE employee SET ? WHERE ?",[
                        {
                            role_id: newRole
                        },
                        {
                            id: empID
                        }], (err) => {
                            if (err) throw err;
                            console.log("The employee's role has been updated");
                            console.log();
                            startMenu();
                        })
                    })
                })
            })
        })
    }
})