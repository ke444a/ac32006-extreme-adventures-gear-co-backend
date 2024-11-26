/**
 * Ingesting data with dependencies on employee role, work schedule, and branch:
 * - Employees
 * - Employee credentials
 * - Payrolls & payments
 */
import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import fs from "fs";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("employee_credentials").del();
    await knex("employee").del();

    // Get locations grouped by type and sort them out by factory/non-factory
    const locations = await knex("location")
        .select("id", "city", "location_type")
        .orderBy("id");
    const hqLocation = locations.find(l => l.location_type === "hq");
    const factoryLocations = locations.filter(l => l.location_type === "factory").map(l => l.id);
    const branchLocations = locations.filter(l => l.location_type === "branch").map(l => l.id);
    
    // Get roles
    const roles = await knex("employee_role")
        .select("id", "name")
        .orderBy("id");

    // Create a map for quick access to role IDs
    const roleIds = Object.fromEntries(roles.map(role => [role.name, role.id]));
    
    // Get work schedules
    const workSchedules = await knex("work_schedule")
        .select("id", "shift_type", "start_time", "end_time")
        .orderBy("id");
    const morningShiftId = workSchedules.find(s => s.shift_type === "morning")?.id;
    const afternoonShiftId = workSchedules.find(s => s.shift_type === "afternoon")?.id;

    // Helper function to generate employee data
    const generateEmployee = (roleId: number, locationIds: number[]) => ({
        name: faker.person.fullName(),
        phone_number: faker.phone.number({ style: "national" }),
        salary: faker.number.int({ min: 25000, max: 55000 }),
        hire_date: faker.date.between({
            from: "2020-01-01",
            to: "2024-10-29"
        }).toISOString().split("T")[0],
        age: faker.number.int({ min: 20, max: 65 }),
        employment_type: (roleId === roleIds["sales_representative"] || roleId === roleIds["factory_worker"])
            ? faker.helpers.arrayElement(["full_time", "part_time"])
            : "full_time",
        work_schedule_id: roleId === roleIds["factory_worker"] ? faker.helpers.arrayElement([morningShiftId, afternoonShiftId]) : morningShiftId,
        role_id: roleId,
        location_id: faker.helpers.arrayElement(locationIds)
    });

    // Generate employees
    const employeesIngestData = [
        // Admin: 1 employee
        generateEmployee(roleIds["admin"], [hqLocation.id]),

        // Inventory managers: 8-12 employees for entire company
        ...Array(faker.number.int({ min: 8, max: 12 }))
            .fill(null)
            .map(() => generateEmployee(roleIds["inventory_manager"], branchLocations)),
        
        // Sales representatives: 20-30 employees for entire company
        ...Array(faker.number.int({ min: 20, max: 30 }))
            .fill(null)
            .map(() => generateEmployee(roleIds["sales_representative"], branchLocations)),
        
        // Factory managers: 2 employees per factory
        ...factoryLocations.flatMap(location => 
            Array(2).fill(null).map(() => generateEmployee(roleIds["factory_manager"], [location]))
        ),

        // Factory workers: 20-30 employees for entire company
        ...Array(faker.number.int({ min: 20, max: 30 }))
            .fill(null)
            .map(() => generateEmployee(roleIds["factory_worker"], factoryLocations))
    ];

    await knex("employee").insert(employeesIngestData);
    const insertedEmployees = await knex("employee").select("*");

    // Generate employee credentials for website login
    // Giving same password to all employees
    const passwordHash = await bcrypt.hash("advGearPswd123", 10);
    const credentialsIngestData = insertedEmployees.map(employee => ({
        employee_id: employee.id,
        email: employee.name.toLowerCase().replace(/\s+/g, ".")
            .replace(/\.+/g, ".")
            + "@adventuregear.com",
        password_hash: passwordHash
    }));

    // Write credentials to file
    const credentialsForFile = insertedEmployees.map(employee => ({
        id: employee.id,
        email: employee.name.toLowerCase().replace(/\s+/g, ".") + "@adventuregear.com",
        password: "advGearPswd123"
    }));
    fs.writeFileSync("credentials.json", JSON.stringify(credentialsForFile, null, 2));

    await knex("employee_credentials").insert(credentialsIngestData);

    // Generate payrolls and payments for each employee
    const payrollsIngestData = [];
    for (const employee of insertedEmployees) {
        // Create payment record
        const payment = {
            payment_type: "payroll",
            payment_method: faker.helpers.arrayElement(["bank_transfer", "check"]),
            payment_status: "completed",
            payment_date: faker.date.between({ 
                from: employee.hire_date,
                to: new Date().toISOString().split("T")[0]
            }),
            amount: employee.salary / 12 // Monthly salary
        };
        
        // Insert and get the ID
        const [paymentId] = await knex("payment").insert(payment);
        // Create associated payroll record
        payrollsIngestData.push({
            employee_id: employee.id,
            payment_id: paymentId
        });
    }

    await knex("payroll").insert(payrollsIngestData);
};
