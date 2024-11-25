/**
 * Migrating structures with no dependencies:
 * - location
 * - employee_role
 * - work_schedule
 */
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create location table
    await knex.schema.createTable("location", (table) => {
        table.increments("id").primary();
        table.string("city").nullable();
        table.string("address").notNullable();
        table.enum("location_type", ["branch", "hq", "factory"]).notNullable();
    });

    // Create employee role table
    // Possible roles: sales_representative, inventory_manager, admin, factory_manager, factory_worker
    await knex.schema.createTable("employee_role", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
    });

    // Create work schedule table
    // Morning shift is 9:00-17:00, afternoon shift is 13:00-21:00
    // All managers have a morning shift, factory workers have both morning and afternoon shifts
    await knex.schema.createTable("work_schedule", (table) => {
        table.increments("id").primary();
        table.string("shift_type").notNullable();
        table.time("start_time").notNullable();
        table.time("end_time").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("location");
    await knex.schema.dropTable("employee_role");
    await knex.schema.dropTable("work_schedule");
}

