import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();

// Body-parsing middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", employeesRouter);

// Error-handling middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status ?? 500)
    .json(err.message ?? "Sorry, something went wrong!");
});

export default app;
