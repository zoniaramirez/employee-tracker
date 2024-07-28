# Employee Tracker

This Employee Tracker was created to allow business owners to view and manage the departments, roles, and employees in the company. It will help owners organize and plan their business.

## Description

This employee tracker was created as a challenge for bootcamp students to apply everything that was learned in module 12 of class. The challenge will make this generator run in the command line and will be invoked by using the `` node server.js `` or `` npm start `` command. This app functionality will be achieved by using the inquirer an pg package.

## Acceptance Criteria

    - Having a source code
    - Give a command-line application that accepts user input
    - Whe I start the application I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role, update employee managers, view employees by manager, view employees by department, view the total utilized budget of a department, delete departments, delete roles, delete employees, and exit
    - When I choose to view all departments I am presented with a formatted table showing department names and department ids
    - When I choose to view all roles I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    - When I choose to view all employees I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    - When I choose to add a department I am prompted to enter the name of the department and that department is added to the database
    - When I choose to add a role I am prompted to enter the name, salary, and department for the role and that role is added to the database
    - When I choose to add an employee I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    - When I choose to update an employee role I am prompted to select an employee to update and their new role and this information is updated in the database 
    - When I choose to update an employee manager I am prompted to select an employee to update and their new manager and this information is updated in the database 
    - When I choose to view employees by manager I am prompted to select a manager and I am presented with a table showing the employees that report to the chosen manager
    - When I choose to view employees by department I am prompted to select a department and I am presented with a table showing the employees that work in the chosen department
    - When I choose to view the total utilized budget by department I am presented with a list of departments to choose from and a table showing the combined salaries of all employees in that department is formatted
    - When I choose to delete departments I am prompted with a list of departments to choose one to delete 
    - When I choose to delete roles I am prompted with a list of roles to choose one to delete 
    - When I choose to delete employees I am prompted with a list of employees to choose one to delete 
    - When I choose exit the application stops and exits


## Installation
 ```
npm install
  ```

## Run the app
 ```
npm start or node server.js
  ```

## Employee Tracker Video

[Click here to view video](https://drive.google.com/file/d/1Z-LLrQIwCABRCT7xE_iRyK9PLM7gFsfq/view?usp=drive_link)


## Links

[Google Drive Video Link](https://drive.google.com/file/d/1Z-LLrQIwCABRCT7xE_iRyK9PLM7gFsfq/view?usp=drive_link)

[GitHub Repo](https://github.com/zoniaramirez/employee-tracker)