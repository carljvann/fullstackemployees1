import db from "./client.js";
import { createEmployee } from "./queries/employees.js";

await db.connect();
console.log("Connected to database");

try {
  // Start a transaction
  await db.query("BEGIN");

  await seedEmployees();

  // Commit the transaction
  await db.query("COMMIT");
  console.log("🌱 Database seeded.");
} catch (error) {
  // Rollback on error
  await db.query("ROLLBACK");
  console.error("Error seeding database:", error);
} finally {
  await db.end();
}

async function seedEmployees() {
  // Clear existing employees
  await db.query("DELETE FROM employees");
  console.log("Cleared existing employees");

  // Seed with at least 10 employees
  const employees = [
    { name: "John Doe", birthday: "1990-05-15", salary: 75000 },
    { name: "Jane Smith", birthday: "1985-08-22", salary: 82000 },
    { name: "Michael Johnson", birthday: "1992-03-10", salary: 68000 },
    { name: "Emily Davis", birthday: "1988-11-30", salary: 91000 },
    { name: "David Wilson", birthday: "1995-07-18", salary: 62000 },
    { name: "Sarah Brown", birthday: "1987-02-25", salary: 88000 },
    { name: "Robert Taylor", birthday: "1991-09-12", salary: 73000 },
    { name: "Jennifer Martinez", birthday: "1993-06-08", salary: 79000 },
    { name: "Christopher Anderson", birthday: "1989-12-20", salary: 85000 },
    { name: "Amanda Thomas", birthday: "1994-04-17", salary: 71000 },
  ];

  for (const employee of employees) {
    console.log(`Inserting ${employee.name}...`);
    await createEmployee(employee);
  }

  console.log(`Inserted ${employees.length} employees`);
}
