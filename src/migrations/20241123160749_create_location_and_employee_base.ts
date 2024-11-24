/**
 * Migrating structures with no dependencies:
 * - location
 * - employee_role
 * - work_schedule
 */
import type { Knex } from "knex";


// USE extreme_adventures_gear_db;
// SET FOREIGN_KEY_CHECKS = 0;
// DROP TABLE IF EXISTS`branch`;
// DROP TABLE IF EXISTS`branch_item`;
// DROP TABLE IF EXISTS`factory`;
// DROP TABLE IF EXISTS`factory_product_item`;
// DROP TABLE IF EXISTS`customer`;
// DROP TABLE IF EXISTS`employee`;
// DROP TABLE IF EXISTS`employee_credentials`;
// DROP TABLE IF EXISTS`employee_role`;
// DROP TABLE IF EXISTS`inventory`;
// DROP TABLE IF EXISTS`inventory_item`;
// DROP TABLE IF EXISTS`knex_migrations`;
// DROP TABLE IF EXISTS`knex_migrations_lock`;
// DROP TABLE IF EXISTS`location`;
// DROP TABLE IF EXISTS`payment`;
// DROP TABLE IF EXISTS`payroll`;
// DROP TABLE IF EXISTS`product`;
// DROP TABLE IF EXISTS`product_category`;
// DROP TABLE IF EXISTS`purchase`;
// DROP TABLE IF EXISTS`purchase_item`;
// DROP TABLE IF EXISTS`work_schedule`;
// DROP TABLE IF EXISTS`shipment`;
// DROP TABLE IF EXISTS`shipment_item`;
// SET FOREIGN_KEY_CHECKS = 1;

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

