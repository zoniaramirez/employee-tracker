const client = require('./database');// Import the database client

// Function to view all departments
const viewAllDepartments = async () => {
    // Execute the SQL query to select all departments
    const res = await client.query('SELECT * FROM department');
    // Display the result in a table format
    console.table(res.rows);
};
// Function to view all roles
const viewAllRoles = async () => {
    // Execute the SQL query to select all roles and join with the department table to get department names
    const res = await client.query(`
        SELECT role.id, role.title, role.salary, department.name AS department 
        FROM role 
        JOIN department ON role.department_id = department.id
    `);
    // Display the result in a table format
    console.table(res.rows);
};
// Function to view all employees
const viewAllEmployees = async () => {
    // Execute the SQL query to select all employees and join with role and department tables to get role titles and department names
    // Also left join with the employee table to get manager names
    const res = await client.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager 
        FROM employee 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    // Display the result in a table format
    console.table(res.rows);
};
// Function to add a new department
const addDepartment = async (name) => {
    // Execute the SQL query to insert a new department with the given name
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    // Log a message indicating the department was added
    console.log(`Added department: ${name}`);
};

// Function to get all departments
async function getDepartments() {
    // Execute the SQL query to select the id and name of all departments
    const res = await client.query('SELECT id, name FROM department');
    // Return the rows from the result
    return res.rows;
}
// Function to get all managers
async function getManagers() {
    // Execute the SQL query to select the id, first name, and last name of all managers
    const res = await client.query(`
        SELECT id, first_name, last_name 
        FROM employee 
        WHERE manager_id IS NULL
    `);
    // Return the rows from the result
    return res.rows;
}
// Function to get all employees
async function getEmployees() {
    // Execute the SQL query to select the id, first name, and last name of all employees
    const res = await client.query('SELECT id, first_name, last_name FROM employee');
    // Return the rows from the result
    return res.rows;
}
// Function to get all roles
async function getRoles() {
    // Execute the SQL query to select the id and title of all roles
    const res = await client.query('SELECT id, title FROM role');
    // Return the rows from the result
    return res.rows;
}
// Function to add a new role
const addRole = async (title, salary, department_id) => {
    // Execute the SQL query to insert a new role with the given title, salary, and department ID
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    // Log a message indicating the role was added
    console.log(`Added role: ${title}`);
};
// Function to add a new employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
     // Execute the SQL query to insert a new employee with the given first name, last name, role ID, and manager ID
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    // Log a message indicating the employee was added
    console.log(`Added employee: ${first_name} ${last_name}`);
};
// Function to update an employee's role
const updateEmployeeRole = async (employeeId, newRoleId) => {
    // Execute the SQL query to update the role ID of the employee with the given employee ID
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    // Log a message indicating the employee's role was updated
    console.log(`Updated employee ID ${employeeId} to new role ID ${newRoleId}`);
};
// Function to update an employee's manager
const updateEmployeeManager = async (employeeId, managerId) => {
    // Execute the SQL query to update the manager ID of the employee with the given employee ID
    await client.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId]);
    // Log a message indicating the employee's manager was updated
    console.log(`Updated employee ID ${employeeId} to new manager ID ${managerId}`);
};
// Function to view employees by manager
const viewEmployeesByManager = async (managerId) => {
    // Execute the SQL query to select employees who have the given manager ID
    const res = await client.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary 
        FROM employee 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        WHERE employee.manager_id = $1
    `, [managerId]);
    // Display the result in a table format
    console.table(res.rows);
};
// Function to view employees by department
const viewEmployeesByDepartment = async (departmentId) => {
    // Execute the SQL query to select employees who belong to the given department ID
    const res = await client.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.first_name AS manager 
        FROM employee 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id
        WHERE department.id = $1
    `, [departmentId]);
    // Display the result in a table format
    console.table(res.rows);
};
// Function to delete a department
const deleteDepartment = async (departmentId) => {
    // Execute the SQL query to delete the department
    await client.query('DELETE FROM department WHERE id = $1', [departmentId]);
    // Log a message indicating the department was deleted
    console.log(`Deleted department ID ${departmentId}`);
};
// Function to delete a role
const deleteRole = async (roleId) => {
    // Execute the SQL query to delete the role
    await client.query('DELETE FROM role WHERE id = $1', [roleId]);
    // Log a message indicating the role was deleted
    console.log(`Deleted role ID ${roleId}`);
};
// Function to delete an employee
const deleteEmployee = async (employeeId) => {
    // Execute the SQL query to delete the employee
    await client.query('DELETE FROM employee WHERE id = $1', [employeeId]);
    // Log a message indicating the employee was deleted
    console.log(`Deleted employee ID ${employeeId}`);
};
// Function to view the budget of a department
const viewDepartmentBudget = async (departmentId) => {
    // Execute the SQL query to calculate the total utilized budget of the given department ID
    const res = await client.query(`
        SELECT department.name AS department, SUM(role.salary) AS utilized_budget 
        FROM employee 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        WHERE department.id = $1
        GROUP BY department.name
    `, [departmentId]);
    // Display the result in a table format
    console.table(res.rows);
};
// Export all the functions to be used in other parts of the application
module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    getDepartments,
    getManagers,
    getRoles,
    getEmployees,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewDepartmentBudget,
};