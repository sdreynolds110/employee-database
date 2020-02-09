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
          "View Department Salaries",
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
          case "View Roles":
            viewAllRoles();
            break;
          case "View Employees by Manager":
            viewEmployeeByManager();
            break;
        // case "View Department Salaries":
        //     viewDepartmentSalaries();
        //     break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employee":
            removeEmployee();
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

  function viewEmployee() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id", function (error, res) {
      console.table(res);
      endOrMenu();
    })
  }
  
  function viewAllRoles() {
    connection.query("SELECT * from role", function (error, res) {
      console.table(res);
      endOrMenu();
    })
  }

  function viewEmployeeByManager() {
    connection.query("SELECT * from manager_id", function (error, res) {
      console.table(res);
      endOrMenu();
    })
  }

  function addEmployee() {  
    var query =
      `SELECT r.id, r.title, r.salary 
        FROM role r`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
  
      promptInsert(roleChoices);
    });
  }
  function promptInsert(roleChoices) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's direct manager? Please input by ID Number.",
          choices: manager
        }
      ])
      .then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`
        connection.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
            console.table(res);
  
            firstPrompt();
          });
      });
  }
  function removeEmployee() {
    console.log("Deleting an employee");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name
        FROM employee e`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
  
      console.table(res);
  
      promptDelete(deleteEmployeeChoices);
    });
  }
  
  function promptDelete(deleteEmployeeChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeChoices
        }
      ])
      .then(function (answer) {
        var query = `DELETE FROM employee WHERE ?`;
        connection.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;
          console.table(res);
  
          firstPrompt();
        });
      });
  }
  