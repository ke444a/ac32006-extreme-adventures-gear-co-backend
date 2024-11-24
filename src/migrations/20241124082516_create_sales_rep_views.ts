/*
    Views for sales reps
*/
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // View to see all customers
    await knex.schema.createView("sales_rep_all_customers_view", (view) => {
        view.columns([
            "customer_id",
            "customer_name", 
            "phone_number",
            "email",
            "address",
            "joined_at",
            "last_purchase_date",
            "total_purchases"
        ]);
        view.as(
            knex.select([
                "c.id as customer_id",
                "c.name as customer_name",
                "c.phone_number",
                "c.email",
                "c.address",
                "c.joined_at",
                knex.raw("MAX(p.purchase_date) as last_purchase_date"),
                knex.raw("COUNT(p.id) as total_purchases")
            ])
                .from("customer as c")
                .join("purchase as p", "c.id", "p.customer_id")
                .groupBy(
                    "c.id",
                    "c.name",
                    "c.phone_number",
                    "c.email",
                    "c.address",
                    "c.joined_at"
                )
                .orderBy("last_purchase_date", "desc")
        );
    });

    // View to see only customers who made purchases in specific branch
    await knex.schema.createView("sales_rep_branch_customers_view", (view) => {
        view.columns([
            "customer_id",
            "customer_name",
            "phone_number",
            "email",
            "address",
            "joined_at",
            "branch_id",
            "last_purchase_date",
            "total_purchases"
        ]);
        view.as(
            knex.select([
                "c.id as customer_id",
                "c.name as customer_name",
                "c.phone_number",
                "c.email",
                "c.address",
                "c.joined_at",
                "p.branch_id",
                knex.raw("MAX(p.purchase_date) as last_purchase_date"),
                knex.raw("COUNT(p.id) as total_purchases")
            ])
                .from("customer as c")
                .join("purchase as p", "c.id", "p.customer_id")
                .groupBy(
                    "c.id",
                    "c.name",
                    "c.phone_number",
                    "c.email",
                    "c.address",
                    "c.joined_at",
                    "p.branch_id"
                )
                .orderBy("last_purchase_date", "desc")
        );
    });

    // View to see purchase summaries
    await knex.schema.createView("sales_rep_purchase_summary_view", (view) => {
        view.columns([
            "id",
            "customer_name",
            "customer_email",
            "total_price",
            "payment_status",
            "purchase_date",
            "branch_id",
            "sales_rep_id",
            "sales_rep_name",
        ]);
        view.as(
            knex.select([
                "p.id as purchase_id",
                "c.name as customer_name",
                "c.email as customer_email",
                "p.total_amount as total_price",
                "p.purchase_date",
                "pay.payment_status",
                "p.branch_id",
                "e.id as sales_rep_id",
                "e.name as sales_rep_name"
            ])
                .from("purchase as p")
                .join("customer as c", "p.customer_id", "c.id")
                .join("payment as pay", "p.payment_id", "pay.id")
                .join("employee as e", "p.employee_id", "e.id")
                .orderBy("p.purchase_date", "desc")
        );
    });

    // View to see purchase details (each purchase item with product details)
    await knex.schema.createView("sales_rep_purchase_detail_view", (view) => {
        view.columns([
            "purchase_id",
            "product_id",
            "product_name",
            "quantity",
            "price_per_purchase_item",
            "branch_id",
            "sales_rep_id"
        ]);
        view.as(
            knex.select([
                "p.id as purchase_id",
                "prod.id as product_id",
                "prod.name as product_name",
                "pi.quantity",
                "pi.total_price as price_per_purchase_item",
                "p.branch_id",
                "p.employee_id as sales_rep_id"
            ])
                .from("purchase as p")
                .join("purchase_item as pi", "p.id", "pi.purchase_id")
                .join("product as prod", "pi.product_id", "prod.id")
                .orderBy("pi.total_price", "desc")
        );
    });

    // View to create/update customer
    await knex.schema.createView("sales_rep_create_customer_view", (view) => {
        view.columns([
            "id",
            "name",
            "phone_number",
            "email",
            "address",
        ]);
        view.as(
            knex.select([
                "id",
                "name",
                "phone_number",
                "email",
                "address",
            ])
                .from("customer")
        );
        view.checkOption();
    });

    // View to create/update payment
    await knex.schema.createView("sales_rep_create_payment_view", (view) => {
        view.columns([
            "payment_type",
            "payment_method",
            "payment_status",
            "amount",
        ]);
        view.as(
            knex.select([
                "payment_type",
                "payment_method",
                "payment_status",
                "amount",
            ])
                .where("payment_type", "customer")
                .whereIn("payment_status", ["pending", "completed", "refunded"])
                .from("payment")
        );
        view.checkOption();
    });

    // View to create/update purchase
    await knex.schema.createView("sales_rep_create_purchase_view", (view) => {
        view.columns([
            "customer_id",
            "branch_id",
            "employee_id",
            "payment_id",
            "total_amount",
        ]);
        view.as(
            knex.select([
                "customer_id",
                "branch_id",
                "employee_id",
                "payment_id",
                "total_amount",
            ])
                .from("purchase")
        );
        view.checkOption();
    });

    // View to create/update purchase item
    await knex.schema.createView("sales_rep_create_purchase_item_view", (view) => {
        view.columns([
            "purchase_id",
            "product_id",
            "quantity",
            "total_price",
        ]);
        view.as(
            knex.select([
                "purchase_id",
                "product_id",
                "quantity",
                "total_price",
            ])
                .from("purchase_item")
        );
        view.checkOption();
    });
}

export async function down(knex: Knex): Promise<void> {
    // await knex.schema.dropView("sales_rep_create_purchase_view");
    await knex.schema.dropView("sales_rep_purchase_detail_view");
    await knex.schema.dropView("sales_rep_purchase_summary_view");
    await knex.schema.dropView("sales_rep_branch_customers_view");
    await knex.schema.dropView("sales_rep_all_customers_view");
    await knex.schema.dropView("sales_rep_create_payment_view");
    await knex.schema.dropView("sales_rep_create_purchase_item_view");
    await knex.schema.dropView("sales_rep_create_purchase_view");
    await knex.schema.dropView("sales_rep_create_customer_view");
}
