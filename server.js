const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    firstPrompt();
  });
  
  function firstPrompt() {
  
    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Would you like to do?",
        choices: [
          "View Employees",
          "View Employees by Department",
          "View Employees by Manager",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "Remove Role",
          "Update Employee Manager",
          "End"]
      })
      .then(function ({ task }) {
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
          case "View Department Salaries":
            viewDepartmentSalaries();
            break;
          case "View Employees by Manager":
            viewEmployeeByManager();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employee":
            removeEmployees();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Add Role":
            addRole();
            break;
          case "Remove Role":
            removeRole();
            break;
          case "Update Employee Manager":
            updateEmployeeManager();
            break;
          case "End":
            connection.end();
            break;
        }
      });
  }