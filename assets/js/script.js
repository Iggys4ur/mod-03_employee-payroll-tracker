// Get references to the necessary elements
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const employeeTable = document.querySelector('#employee-table');
const aggregateDataTable = document.querySelector('#aggregate-data-table'); // New element for displaying aggregate data

// Global array to store employees
let employeesArray = [];

// Collect employee data
const collectEmployees = function () {
  let addingEmployee = true;

  while (addingEmployee) {
    let firstName = '';
    let lastName = '';
    let salary;

    // Prompt for first name until a valid string is entered
    while (!firstName || typeof firstName !== 'string') {
      firstName = prompt("Please enter the employee's first name:");
      if (!firstName || typeof firstName !== 'string') {
        alert("Invalid input. Please enter a valid first name.");
      }
    }

    // Prompt for last name until a valid string is entered
    while (!lastName || typeof lastName !== 'string') {
      lastName = prompt("Please enter the employee's last name:");
      if (!lastName || typeof lastName !== 'string') {
        alert("Invalid input. Please enter a valid last name.");
      }
    }

    // Prompt for salary until a valid number is entered
    while (!salary || isNaN(salary)) {
      salary = parseFloat(prompt("Please enter the employee's salary (numbers only):"));
      if (isNaN(salary)) {
        alert("Invalid input. Please enter a numeric salary.");
      }
    }

    // Create an employee object and add it to the array
    const employee = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      salary: salary
    };

    employeesArray.push(employee);

    // Confirm that the employee has been added
    alert(`Employee ${firstName} ${lastName} added successfully!`);

    // Ask if the user wants to add another employee
    addingEmployee = confirm("Do you want to add another employee?");
  }

  updateEmployeeDisplay(); // Update the display after adding employees
};

// Display the aggregate data
const displayAggregateData = function () {
  if (employeesArray.length === 0) {
    aggregateDataTable.innerHTML = '<tr><td colspan="2">No employees to display data for.</td></tr>';
    return;
  }

  // Calculate aggregate data
  let totalEmployees = employeesArray.length;
  let totalSalary = employeesArray.reduce((sum, employee) => sum + employee.salary, 0);
  let averageSalary = totalSalary / totalEmployees;
  let highestSalary = Math.max(...employeesArray.map(employee => employee.salary));
  let lowestSalary = Math.min(...employeesArray.map(employee => employee.salary));

  // Populate the aggregate data table
  aggregateDataTable.innerHTML = `
        <tr><td>Total Employees</td><td>${totalEmployees}</td></tr>
        <tr><td>Total Payroll</td><td>${totalSalary.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td></tr>
        <tr><td>Average Salary</td><td>${averageSalary.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td></tr>
        <tr><td>Highest Salary</td><td>${highestSalary.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td></tr>
        <tr><td>Lowest Salary</td><td>${lowestSalary.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td></tr>
    `;
};

// Select a random employee
const getRandomEmployee = function () {
  if (employeesArray.length === 0) {
    console.log('No employees to select.');
    return;
  }

  // Get a random index
  let randomIndex = Math.floor(Math.random() * employeesArray.length);

  // Select the random employee
  let randomEmployee = employeesArray[randomIndex];

  // Log the random employee to the console
  console.log('Random Employee:', randomEmployee.firstName, randomEmployee.lastName, randomEmployee.salary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  }));
};

// Delete an employee from the list
const deleteEmployee = function (index) {
  if (confirm(`Are you sure you want to delete ${employeesArray[index].firstName} ${employeesArray[index].lastName}?`)) {
    employeesArray.splice(index, 1);
    alert('Employee deleted successfully.');
    updateEmployeeDisplay(); // Only update the display
  }
};

// Edit an employee's data
const editEmployee = function (index) {
  let employee = employeesArray[index];

  const newFirstName = prompt("Enter new first name:", employee.firstName);
  const newLastName = prompt("Enter new last name:", employee.lastName);
  const newSalary = parseFloat(prompt("Enter new salary:", employee.salary));

  if (newFirstName && newLastName && !isNaN(newSalary)) {
    employee.firstName = newFirstName.trim();
    employee.lastName = newLastName.trim();
    employee.salary = newSalary;
    alert('Employee updated successfully.');
    updateEmployeeDisplay(); // Only update the display
  } else {
    alert("Invalid input. Please try again.");
  }
};

// Update the employee table and display aggregate data
const updateEmployeeDisplay = function () {
  // Sort employees by last name before displaying
  employeesArray.sort(function (a, b) {
    return a.lastName.localeCompare(b.lastName);
  });

  displayEmployees(employeesArray);
  displayAggregateData();
  getRandomEmployee();
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  employeeTable.innerHTML = ''; // Clear the employee table

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

    // Attach edit and delete buttons dynamically
    const actionCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn");
    deleteButton.title = "Click to delete this employee"; // Tooltip for Delete button
    deleteButton.onclick = () => deleteEmployee(i);
    actionCell.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn");
    editButton.title = "Click to edit this employee"; // Tooltip for Edit button
    editButton.onclick = () => editEmployee(i);
    actionCell.appendChild(editButton);

    newTableRow.append(actionCell);

    employeeTable.append(newTableRow);
  }
};

// Function to handle adding employees
const trackEmployeeData = function () {
  collectEmployees(); // Only collect employees when adding new ones
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
