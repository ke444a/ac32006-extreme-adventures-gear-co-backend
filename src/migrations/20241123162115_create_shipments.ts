/**
 * Migrating structures with dependencies on factory, branch, and product:
 * - shipment
 * - shipment_item
 */
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create shipments and shipment items
    await knex.schema.createTable("shipment", (table) => {
        table.increments("id").primary();
        table.integer("factory_id").unsigned().notNullable();
        table.integer("branch_id").unsigned().notNullable();
        table.string("shipment_status").notNullable();
        table.timestamp("shipped_at").nullable();
        table.timestamp("arrived_at").nullable();

        table.foreign("factory_id").references("factory.id");
        table.foreign("branch_id").references("branch.id");
    });

    await knex.schema.createTable("shipment_item", (table) => {
        table.increments("id").primary();
        table.integer("shipment_id").unsigned().notNullable();
        table.integer("factory_product_id").unsigned().notNullable();
        table.integer("quantity_shipped").notNullable();

        table.foreign("shipment_id").references("shipment.id");
        table.foreign("factory_product_id").references("factory_product_item.id");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("shipment_item");
    await knex.schema.dropTable("shipment");
}
