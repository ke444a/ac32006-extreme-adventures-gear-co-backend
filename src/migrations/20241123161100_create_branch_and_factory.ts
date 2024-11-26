/**
 * Migrating structures with dependencies on location:
 * - branch
 * - factory
 */
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create factory table
    await knex.schema.createTable("factory", (table) => {
        table.increments("id").primary();
        table.integer("factory_code").notNullable();
        table.integer("location_id").unsigned().notNullable();
        table.float("production_target").notNullable();

        table.foreign("location_id").references("location.id");
    });

    // Create branch table
    await knex.schema.createTable("branch", (table) => {
        table.increments("id").primary();
        table.integer("branch_code").notNullable();
        table.float("sales_target").notNullable();
        table.integer("location_id").unsigned().notNullable();
        
        table.foreign("location_id").references("location.id");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("factory");
    await knex.schema.dropTable("branch");
}

