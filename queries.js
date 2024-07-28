const client = require('./database');

const viewAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
};

const viewAllRoles = async () => {
    const res = await client.query(`
        SELECT role.id, role.title, role.salary, department.name AS department 
        FROM role 
        JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
};

const viewAllEmployees = async () => {
    const res = await client.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager 
        FROM employee 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    console.table(res.rows);
};

const addDepartment = async (name) => {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department: ${name}`);
};


async function getDepartments() {
    const res = await client.query('SELECT id, name FROM department');
    return res.rows;
}

async function getManagers() {
    const res = await client.query(`
        SELECT id, first_name, last_name 
        FROM employee 
        WHERE manager_id IS NULL
    `);
    return res.rows;
}

async function getEmployees() {
    const res = await client.query('SELECT id, first_name, last_name FROM employee');
    return res.rows;
}

async function getRoles() {
    const res = await client.query('SELECT id, title FROM role');
    return res.rows;
}

const addRole = async (title, salary, department_id) => {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Added role: ${title}`);
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log(`Added employee: ${first_name} ${last_name}`);
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    console.log(`Updated employee ID ${employeeId} to new role ID ${newRoleId}`);
};

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
    updateEmployeeRole
};