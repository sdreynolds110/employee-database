USE employee_DB;

INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("Quality Control");
INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Reception");
INSERT INTO department (name)
VALUES ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES ("Regional Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Representative", 40000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Representative", 50000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("H.R. Representative", 25000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Receptionist", 30000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ("Warehouse Worker", 30000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Martin", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Meredith", "Palmer", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Toby", "Flenderson", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Halpert", 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Darryl", "Philbin", 7, null);
