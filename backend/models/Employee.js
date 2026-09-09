const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({
      message: "Invalid employee ID"
    });
  }
});

// POST a new employee
router.post("/", async (req, res) => {
  try {
    const {
      name,
      department,
      designation,
      email,
      contact,
      status
    } = req.body;

    const employee = new Employee({
      name,
      department,
      designation,
      email,
      contact,
      status
    });

    const savedEmployee = await employee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    console.log("Add employee error:", error);
    res.status(400).json({
      message: error.message
    });
  }
});

// PUT update employee
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(
      req.params.id
    );

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;