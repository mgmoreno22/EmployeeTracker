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
        start();
    });

    function start() {
        console.log("Password was accepted!");
        connection.end();
    }
})