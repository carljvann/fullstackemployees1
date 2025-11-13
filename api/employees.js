import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

const router = express.Router();

// GET /employees - Get all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

// POST /employees - Create a new employee
router.post("/", async (req, res, next) => {
  try {
    // Validate request body exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { name, birthday, salary } = req.body;

    // Validate required fields
    if (name === undefined || birthday === undefined || salary === undefined) {
      return res.status(400).json({ message: "Missing required field(s)" });
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

// GET /employees/:id - Get employee by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = Number(id);

    // Validate ID is a positive integer
    if (!Number.isInteger(numId) || numId <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const employee = await getEmployee(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// PUT /employees/:id - Update employee by ID
router.put("/:id", async (req, res, next) => {
  try {
    // Validate request body exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { id } = req.params;
    const { name, birthday, salary } = req.body;

    // Validate required fields
    if (name === undefined || birthday === undefined || salary === undefined) {
      return res.status(400).json({ message: "Missing required field(s)" });
    }

    const numId = Number(id);

    // Validate ID is a positive integer
    if (!Number.isInteger(numId) || numId <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const employee = await updateEmployee({ id, name, birthday, salary });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// DELETE /employees/:id - Delete employee by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = Number(id);

    // Validate ID is a positive integer
    if (!Number.isInteger(numId) || numId <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const employee = await deleteEmployee(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
