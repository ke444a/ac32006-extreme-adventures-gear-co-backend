/**
 * Migrating structures with dependencies on product & location:
 * - product_category
 * - product
 * - branch_item
 * - factory_product_item
 */
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create product category table
    // All categories are listed in the seeds/ directory
    await knex.schema.createTable("product_category", (table) => {
        table.increments("id").primary();
        table.string("name", 80).notNullable();
    });

    // Create product table
    await knex.schema.createTable("product", (table) => {
        table.increments("id").primary();
        table.string("name", 80).notNullable();
        table.string("description").notNullable();
        table.string("image_url").nullable();
        table.float("price").notNullable();
        table.integer("warranty_duration").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.integer("product_category_id").unsigned().notNullable();

        table.foreign("product_category_id").references("product_category.id");
    });

    // Create item tables for branches and factories (associated with product)
    await knex.schema.createTable("branch_item", (table) => {
        table.increments("id").primary();
        table.integer("branch_id").unsigned().notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.integer("quantity").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        table.foreign("branch_id").references("branch.id");
        table.foreign("product_id").references("product.id").onDelete("cascade").onUpdate("cascade");
    });

    await knex.schema.createTable("factory_product_item", (table) => {
        table.increments("id").primary();
        table.integer("factory_id").unsigned().notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.integer("quantity").notNullable();
        table.timestamp("manufactured_at").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        
        table.foreign("factory_id").references("factory.id");
        table.foreign("product_id").references("product.id").onDelete("cascade").onUpdate("cascade");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("branch_item");
    await knex.schema.dropTable("factory_product_item");
    await knex.schema.dropTable("product");
    await knex.schema.dropTable("product_category");
}

