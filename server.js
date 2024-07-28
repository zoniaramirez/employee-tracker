const inquirer = require('inquirer');// Import the inquirer 

// Import various functions from the queries module
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
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewDepartmentBudget,
} = require('./queries');

async function question() {
    // Prompt the user to select an action
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
                'Update Employee Manager',
                'View Employees by Manager',
                'View Employees by Department',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'View Department Budget',
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
                // Fetch roles for the prompts
                const roles = await getRoles();
                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id
                }));
                // Fetch managers for the prompts
                const managers = await getManagers();
                const managerChoices = managers.map(manager => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id
                }));
                // Prompt for employee details
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
                // Add the employee to the database
                await addEmployee(firstName, lastName, roleId, managerId);
                console.log('Employee added successfully');
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
                // Prompt for employee and new role
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
                console.log('Employee role updated successfully');
                break;
            case 'Update Employee Manager':
                // Fetch employees and managers for the prompts
                const employeesForManagerUpdate = await getEmployees();
                const employeeChoicesForManagerUpdate = employeesForManagerUpdate.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }));

                const managersForUpdate = await getManagers();
                const managerChoicesForUpdate = managersForUpdate.map(manager => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id
                }));
                 // Prompt for employee and new manager
                const { employeeIdForManager, newManagerId } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeIdForManager',
                        message: 'Select the employee:',
                        choices: employeeChoicesForManagerUpdate
                    },
                    {
                        type: 'list',
                        name: 'newManagerId',
                        message: 'Select the new manager:',
                        choices: managerChoicesForUpdate
                    }
                ]);
                // Update the employee's manager in the database
                await updateEmployeeManager(employeeIdForManager, newManagerId);
                console.log('Employee manager updated successfully');
                break;

            case 'View Employees by Manager':
                // Fetch managers for the prompt
                const managersForView = await getManagers();
                const managerChoicesForView = managersForView.map(manager => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id
                }));
                // Prompt for manager
                const { managerIdForView } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'managerIdForView',
                        message: 'Select the manager:',
                        choices: managerChoicesForView
                    }
                ]);
                // Fetch and display employees by manager
                const employeesByManager = await viewEmployeesByManager(managerIdForView);
                console.table(employeesByManager);
                break;

            case 'View Employees by Department':
                // Fetch departments for the prompt
                const departmentsForView = await getDepartments();
                const departmentChoicesForView = departmentsForView.map(department => ({
                    name: department.name,
                    value: department.id
                }));
                // Prompt for department
                const { departmentIdForView } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentIdForView',
                        message: 'Select the department:',
                        choices: departmentChoicesForView
                    }
                ]);
                // Fetch and display employees by department
                const employeesByDepartment = await viewEmployeesByDepartment(departmentIdForView);
                console.table(employeesByDepartment);
                break;

            case 'Delete Department':
                // Fetch departments for the prompt
                const departmentsForDelete = await getDepartments();
                const departmentChoicesForDelete = departmentsForDelete.map(department => ({
                    name: department.name,
                    value: department.id
                }));
                // Prompt for department to delete
                const { departmentIdForDelete } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentIdForDelete',
                        message: 'Select the department to delete:',
                        choices: departmentChoicesForDelete
                    }
                ]);
                // Delete the department from the database
                await deleteDepartment(departmentIdForDelete);
                console.log('Department deleted successfully');
                break;

            case 'Delete Role':
                // Fetch roles for the prompt
                const rolesForDelete = await getRoles();
                const roleChoicesForDelete = rolesForDelete.map(role => ({
                    name: role.title,
                    value: role.id
                }));
                // Prompt for role to delete
                const { roleIdForDelete } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleIdForDelete',
                        message: 'Select the role to delete:',
                        choices: roleChoicesForDelete
                    }
                ]);
                // Delete the role from the database
                await deleteRole(roleIdForDelete);
                console.log('Role deleted successfully');
                break;

            case 'Delete Employee':
                // Fetch employees for the prompt
                const employeesForDelete = await getEmployees();
                const employeeChoicesForDelete = employeesForDelete.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }));
                // Prompt for employee to delete
                const { employeeIdForDelete } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeIdForDelete',
                        message: 'Select the employee to delete:',
                        choices: employeeChoicesForDelete
                    }
                ]);
                // Delete the employee from the database
                await deleteEmployee(employeeIdForDelete);
                console.log('Employee deleted successfully');
                break;


            case 'View Department Budget':
                // Fetch departments for the prompt
                const departmentsForBudget = await getDepartments();
                const departmentChoicesForBudget = departmentsForBudget.map(department => ({
                    name: department.name,
                    value: department.id
                }));
                // Prompt for department
                const { departmentIdForBudget } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentIdForBudget',
                        message: 'Select the department:',
                        choices: departmentChoicesForBudget
                    }
                ]);
                // Fetch and display the total utilized budget for the department
                const budget = await viewDepartmentBudget(departmentIdForBudget);
                console.log(`Total utilized budget for department: ${budget}`);
                break;

            case 'Exit':
                // Exit the application
                console.log('Exiting the application...');
                process.exit(0);
        }
    }
}

startApp();