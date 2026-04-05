const Employee = require("../models/employee");

// ADD EMPLOYEE
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, salary, start, end } = req.body;

    const employee = new Employee({
      name,
      email,
      department,
      salary,
      workingHours: {
        start,
        end
      },
      profilePic: req.file ? req.file.path : ""
    });

    await employee.save();

    res.json({ message: "Employee added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL EMPLOYEES
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};