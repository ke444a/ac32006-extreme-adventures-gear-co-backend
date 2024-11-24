/**
 * Migrating structures with dependencies on employee:
 * - customer
 * - payment
 * - purchase
 * - purchase_item
 * - payroll
 */
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create customer table
    await knex.schema.createTable("customer", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("phone_number", 15).nullable();
        table.string("email").nullable();
        table.string("address").nullable();
        table.timestamp("joined_at").defaultTo(knex.fn.now());
    });

    // Create payment table
    // payment_type: customer, employee
    // payment_method: cash, card, bank_transfer, cheque (bank_transfer and cheque are for employees only)
    // payment_status: pending, completed, failed, refunded
    await knex.schema.createTable("payment", (table) => {
        table.increments("id").primary();
        table.string("payment_type", 50).notNullable();
        table.string("payment_method", 50).notNullable();
        table.string("payment_status", 50).notNullable();
        table.timestamp("payment_date").defaultTo(knex.fn.now());
        table.float("amount").notNullable();
    });

    // Create payroll table
    await knex.schema.createTable("payroll", (table) => {
        table.increments("id").primary();
        table.integer("employee_id").unsigned().notNullable();
        table.integer("payment_id").unsigned().notNullable();
        table.foreign("employee_id").references("employee.id");
        table.foreign("payment_id").references("payment.id");
    });

    // Create purchase table
    await knex.schema.createTable("purchase", (table) => {
        table.increments("id").primary();
        table.integer("branch_id").unsigned().notNullable();
        table.integer("customer_id").unsigned().nullable();
        table.integer("employee_id").unsigned().notNullable();
        table.integer("payment_id").unsigned().notNullable();
        table.float("total_amount").notNullable();
        table.timestamp("purchase_date").defaultTo(knex.fn.now());

        table.foreign("branch_id").references("branch.id");
        table.foreign("customer_id").references("customer.id");
        table.foreign("employee_id").references("employee.id");
        table.foreign("payment_id").references("payment.id");
    });

    // Create purchase item table
    await knex.schema.createTable("purchase_item", (table) => {
        table.increments("id").primary();
        table.integer("product_id").unsigned().notNullable();
        table.integer("purchase_id").unsigned().notNullable();
        table.integer("quantity").notNullable();
        table.float("total_price").notNullable();

        table.foreign("product_id").references("product.id");
        table.foreign("purchase_id").references("purchase.id");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("purchase_item");
    await knex.schema.dropTable("purchase");
    await knex.schema.dropTable("payment");
    await knex.schema.dropTable("customer");
}

