/**
 * Migrating structures with dependencies on location and role:
 * - employee
 */
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create employee table
    // Employment type: full_time for all managers; full_time/part_time for factory workers & sales reps
    await knex.schema.createTable("employee", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("phone_number", 15).notNullable();
        table.integer("age").notNullable();
        table.float("salary").notNullable();
        table.date("hire_date").notNullable();
        table.string("employment_type").notNullable();
        table.integer("work_schedule_id").unsigned().notNullable();
        table.integer("location_id").unsigned().notNullable();
        table.integer("role_id").unsigned().notNullable();

        table.foreign("work_schedule_id").references("work_schedule.id");
        table.foreign("location_id").references("location.id");
        table.foreign("role_id").references("employee_role.id");
    });

    // Create employee credentials table
    await knex.schema.createTable("employee_credentials", (table) => {
        table.integer("employee_id").unsigned().primary();
        table.string("email").notNullable().unique();
        table.string("password_hash").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.foreign("employee_id").references("employee.id");

        table.index("email", "idx_email");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("employee_credentials");
    await knex.schema.dropTable("employee");
}

