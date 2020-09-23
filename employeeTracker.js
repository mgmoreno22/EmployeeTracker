const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table")

// Program will add your panswer 
inquirer.prompt({
    type: "password",
    name: "pass",
    message: "Please enter your MySQL password"
}).then(result => {
    var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Godons21",
    database: "employee_trackerdb"
    });
    connection.connect(function(err) {
        if (err) throw err;
        start();
    });

    function start() {
        console.log("Program has started");
        connection.end();
    }
})