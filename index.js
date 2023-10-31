const express = require('express');
const app = express();
const port = 3000;

const employees = require('./employees.json'); 
const projects = require('./projects.json');   

// API endpoint to get employee data by ID
app.get('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  if (employees[employeeId]) {
    res.json(employees[employeeId]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// API endpoint to get project data by ID
app.get('/project/:id', (req, res) => {
  const projectId = req.params.id;
  if (projects[projectId]) {
    res.json(projects[projectId]);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// API endpoint to get employee details along with project details
app.get('/getemployeedetails/:id', (req, res) => {
  const employeeId = req.params.id;
  if (employees[employeeId]) {
    const projectId = employees[employeeId].projectId;
    if (projects[projectId]) {
      const employeeDetails = employees[employeeId];
      const projectDetails = projects[projectId];
      const result = { employee: employeeDetails, project: projectDetails };
      res.json(result);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
