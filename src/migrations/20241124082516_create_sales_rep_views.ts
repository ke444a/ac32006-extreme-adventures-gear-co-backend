/*
    Views for sales reps
*/
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // View all customers for all branches
    await knex.schema.createView("sales_represenative_all_customers_view", (view) => {
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
                .leftJoin("purchase as p", "c.id", "p.customer_id")
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

    // View all customers who made purchases in specific branch
    await knex.schema.createView("sales_represenative_branch_customers_view", (view) => {
        view.columns([
            "customer_id",
            "customer_name",
            "phone_number",
            "email",
            "address",
            "joined_at",
            "last_purchase_date",
            "total_purchases",
            "branch_id"
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
                knex.raw("COUNT(p.id) as total_purchases"),
                "p.branch_id"
            ])
                .from("customer as c")
                .leftJoin("purchase as p", "c.id", "p.customer_id")
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

    // View purchase summary: info about each purchase without purchase items
    await knex.schema.createView("sales_represenative_purchase_summary_view", (view) => {
        view.columns([
            "purchase_id",
            "customer_name",
            "customer_email",
            "total_price",
            "payment_status",
            "payment_method",
            "purchase_date",
            "branch_id",
            "sales_rep_id",
            "sales_rep_name"
        ]);
        view.as(
            knex.select([
                "p.id as purchase_id",
                "c.name as customer_name",
                "c.email as customer_email",
                "p.total_amount as total_price",
                "pay.payment_status",
                "pay.payment_method",
                "p.purchase_date",
                "p.branch_id",
                "e.id as sales_rep_id",
                "e.name as sales_rep_name"
            ])
                .from("purchase as p")
                .leftJoin("customer as c", "p.customer_id", "c.id")
                .join("payment as pay", "p.payment_id", "pay.id")
                .leftJoin("employee as e", "p.employee_id", "e.id")
                .orderBy("p.purchase_date", "desc")
        );
    });

    // View purchase items for purchase
    await knex.schema.createView("sales_represenative_purchase_details_view", (view) => {
        view.columns([
            "purchase_id",
            "product_id",
            "product_name",
            "product_image_url",
            "product_price",
            "product_category_name",
            "product_category_id",
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
                "prod.image_url as product_image_url",
                "prod.price as product_price",
                "pc.name as product_category_name",
                "pc.id as product_category_id",
                "pi.quantity",
                "pi.total_price as price_per_purchase_item",
                "p.branch_id",
                "p.employee_id as sales_rep_id"
            ])
                .from("purchase as p")
                .join("purchase_item as pi", "p.id", "pi.purchase_id")
                .leftJoin("product as prod", "pi.product_id", "prod.id")
                .leftJoin("product_category as pc", "prod.product_category_id", "pc.id")
                .orderBy("pi.total_price", "desc")
        );
    });

    // Insert/delete/update data about customers
    await knex.schema.createView("sales_represenative_modify_customer_view", (view) => {
        view.columns([
            "id",
            "name",
            "phone_number",
            "email",
            "address"
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
                .where("name", "!=", "")
        );
        view.checkOption();
    });

    // Insert/delete/update data about payments
    await knex.schema.createView("sales_represenative_modify_payment_view", (view) => {
        view.columns([
            "id",
            "payment_type",
            "payment_method",
            "payment_status",
            "amount"
        ]);
        view.as(
            knex.select([
                "id",
                "payment_type",
                "payment_method",
                "payment_status",
                "amount",
            ])
                .where("payment_type", "customer")
                // .whereIn("payment_status", ["pending", "completed", "refunded"])
                .where("amount", ">", 0)
                .from("payment")
        );
        view.checkOption();
    });

    // Insert/delete/update data about purchases
    await knex.schema.createView("sales_represenative_modify_purchase_view", (view) => {
        view.columns([
            "purchase_id",
            "customer_id",
            "branch_id",
            "employee_id",
            "payment_id",
            "total_amount"
        ]);
        view.as(
            knex.select([
                "id as purchase_id",
                "customer_id",
                "branch_id",
                "employee_id",
                "payment_id",
                "total_amount",
            ])
                .where("total_amount", ">", 0)
                .from("purchase")
        );
        view.checkOption();
    });

    // Insert/delete/update data about purchase items
    await knex.schema.createView("sales_represenative_modify_purchase_item_view", (view) => {
        view.columns([
            "purchase_id",
            "product_id",
            "quantity",
            "total_price"
        ]);
        view.as(
            knex.select([
                "purchase_id",
                "product_id",
                "quantity",
                "total_price",
            ])
                .where("quantity", ">", 0)
                .where("total_price", ">", 0)
                .from("purchase_item")
        );
        view.checkOption();
    });
    
    // Update data about products (product name, description, or warranty duration)
    await knex.schema.createView("sales_representative_modify_product_view", (view) => {
        view.columns([
            "id",
            "price"
        ]);
        view.as(
            knex.select([
                "id",
                "price"
            ])
                .where("price", ">", 0)
                .from("product")
        );
        view.checkOption();
    });

    // View for products available in specific branch
    await knex.schema.createView("sales_representative_branch_products_view", (view) => {
        view.columns([
            "product_id",
            "name",
            "description",
            "image_url",
            "price",
            "warranty_duration",
            "branch_id",
            "updated_at",
            "product_category_name",
            "product_category_id"
        ]);
        view.as(
            knex.select([
                "p.id as product_id",
                "p.name",
                "p.description",
                "p.image_url",
                "p.price",
                "p.warranty_duration",
                "bi.branch_id",
                "p.updated_at",
                "pc.name as product_category_name",
                "pc.id as product_category_id"
            ])
                .from("product as p")
                .innerJoin("branch_item as bi", "bi.product_id", "p.id")
                .leftJoin("product_category as pc", "p.product_category_id", "pc.id")
                .orderBy("p.updated_at", "desc")
        );
    });
}

export async function down(knex: Knex): Promise<void> {
    const views = [
        "sales_represenative_all_customers_view",
        "sales_represenative_branch_customers_view",
        "sales_represenative_purchase_summary_view",
        "sales_represenative_purchase_details_view",
        "sales_represenative_modify_customer_view",
        "sales_represenative_modify_payment_view",
        "sales_represenative_modify_purchase_view",
        "sales_represenative_modify_purchase_item_view",
        "sales_representative_modify_product_view",
        "sales_representative_branch_products_view"
    ];
    
    for (const view of views) {
        await knex.schema.dropViewIfExists(view);
    }
}
