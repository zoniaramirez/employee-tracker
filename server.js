const inquirer = require('inquirer');
const {
    addRole,
    addEmployee,
    updateEmployeeRole,
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    getDepartments,
    getRoles,
    getEmployees,
    getManagers,
} = require('./queries');

async function question() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role',
                'Exit'
            ]
        }
    ]);
}
async function startApp() {
    let exit = false;
    while (!exit) {
        const { action } = await question();
        switch (action) {
            case 'View all departments':
                await viewAllDepartments();
                break;
            case 'View all roles':
                await viewAllRoles();
                break;
            case 'View all employees':
                await viewAllEmployees();
                break;
            case 'Add a department':
                const { name: deptName } = await inquirer.prompt([
                    { type: 'input', name: 'name', message: 'Enter department name:' }
                ]);
                await addDepartment(deptName);
                break;
            case 'Add a role':
                // Fetch departments from the database
                const departments = await getDepartments();
                const departmentChoices = departments.map(dept => ({
                    name: dept.name,
                    value: dept.id
                }));

                const { title, salary, department_id } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the role title:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the role salary:'
                    },
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Select the department:',
                        choices: departmentChoices
                    }
                ]);
                await addRole(title, salary, department_id);
                break;
            case 'Add an employee':
                const roles = await getRoles();
                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id
                }));

                const managers = await getManagers();
                const managerChoices = managers.map(manager => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id
                }));

                const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the employee\'s first name:'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the employee\'s last name:'
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select the role:',
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select the manager:',
                        choices: managerChoices
                    }
                ]);
                await addEmployee(firstName, lastName, roleId, managerId);
                break;
            case 'Update employee role':
                const employees = await getEmployees(); // Fetch the list of employees
                const employeeChoices = employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }));

                const role = await getRoles(); // Fetch the list of roles
                const roleChoice = role.map(role => ({
                    name: role.title,
                    value: role.id
                }));
                const { employeeId, newRoleId } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the employee to update:',
                        choices: employeeChoices
                    },
                    {
                        type: 'list',
                        name: 'newRoleId',
                        message: 'Select the new role for the employee:',
                        choices: roleChoice
                    }
                ]);
                await updateEmployeeRole(employeeId, newRoleId); // Update the employee's role in the database
                break;
            case 'Exit':
                exit = true;
                break;
        }
    }
}

startApp();