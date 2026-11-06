const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Get all employees
router.get("/gt", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create employee
router.post("/create", async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        salary: req.body.salary,
        designation: req.body.designation
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update employee
router.put("/update/:id", async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete employee
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Export router
module.exports = router;