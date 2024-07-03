// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  let fullName, firstName, lastName, salary;

  let addingEmployee = true;

  while (addingEmployee) {

    if (!firstName || typeof firstName !== 'string') { // Validates that firstName is assigned to a value that is a string
      firstName = prompt('Employee\'s first name')
      continue;
    }
    if (!lastName || typeof lastName !== 'string') { // Validates that lastName is assigned to a value that is a string
      lastName = prompt("Employee\'s Last name:");
      continue;
    }

    fullName = firstName + ' ' + lastName;

    if (!salary) { // Validates that age is assigned to a value that is a number 
      console.log('is NaN: ' + isNaN(salary), 'is !salary: ' + !salary);
      if (isNaN(salary)){
        prompt("Enter Employee's Salary: ");
        console.log('is NaN: ' + isNaN(salary), 'is !salary: ' + !salary);
        continue;
      }
    }

    addingEmployee = false;
    console.log('Added Employee: '
      + '\n  Name: ' + fullName
      + '\n  First Name: ' + firstName
      + '\n  Last Name: ' + lastName
      + '\n  salary: ' + salary
      + '\n ________________________');

    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: salary
    }

  }

}

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
