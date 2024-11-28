import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Product Category Sales Analytics - shows sales performance by category
    await knex.schema.createView("admin_category_sales_view", (view) => {
        view.as(
            knex.select([
                "pc.id as category_id",
                "pc.name as category_name",
                knex.raw("COUNT(DISTINCT pu.id) as total_purchases"),
                knex.raw("COUNT(DISTINCT p.id) as unique_products"),
                knex.raw("SUM(pi.quantity) as total_quantity_sold"),
                knex.raw("SUM(pi.total_price) as total_revenue"),
                knex.raw("YEAR(pu.purchase_date) as year")
            ])
                .from("product_category as pc")
                .leftJoin("product as p", "pc.id", "p.product_category_id")
                .leftJoin("purchase_item as pi", "p.id", "pi.product_id")
                .leftJoin("purchase as pu", "pi.purchase_id", "pu.id")
                .leftJoin("payment as pay", "pu.payment_id", "pay.id")
                .whereIn("pay.payment_status", ["pending", "completed"])
                .groupBy(
                    "pc.id",
                    "pc.name",
                    knex.raw("YEAR(pu.purchase_date)")
                )
                .orderBy("total_revenue", "desc")
        );
    });

    // Shipping performance by factory
    await knex.schema.createView("admin_factory_shipping_view", (view) => {
        view.as(
            knex.select([
                "f.id as factory_id",
                "f.factory_code",
                "l.city as factory_city",
                knex.raw("COUNT(DISTINCT s.id) as total_shipments"),
                knex.raw(`
                COUNT(CASE 
                    WHEN s.shipment_status = 'delivered' 
                    THEN 1 END) as completed_shipments
            `),
                knex.raw(`
                COUNT(CASE 
                    WHEN s.shipment_status IN ('in_transit', 'shipped') 
                    THEN 1 END) as active_shipments
            `),
                knex.raw("SUM(si.quantity_shipped) as total_items_shipped"),
                knex.raw("YEAR(s.shipped_at) as year")
            ])
                .from("factory as f")
                .join("location as l", "f.location_id", "l.id")
                .leftJoin("shipment as s", "f.id", "s.factory_id")
                .leftJoin("shipment_item as si", "s.id", "si.shipment_id")
                .whereNotNull("s.shipped_at")
                .groupBy(
                    "f.id",
                    "f.factory_code",
                    "l.city",
                    knex.raw("YEAR(s.shipped_at)")
                )
                .orderBy("total_shipments", "desc")
        );
    });

    // Yearly Business Summary
    await knex.schema.createView("admin_yearly_summary_view", (view) => {
        view.as(
            knex.select([
                knex.raw("YEAR(p.purchase_date) as year"),
                knex.raw("COUNT(DISTINCT p.id) as total_purchases"),
                knex.raw("COUNT(DISTINCT p.customer_id) as unique_customers"),
                knex.raw("SUM(p.total_amount) as total_revenue"),
                knex.raw("AVG(p.total_amount) as average_order_value")
            ])
                .from("purchase as p")
                .join("payment as pay", "p.payment_id", "pay.id")
                .whereIn("pay.payment_status", ["pending", "completed"])
                .groupBy(knex.raw("YEAR(p.purchase_date)"))
                .orderBy("year", "desc")
        );
    });
}

export async function down(knex: Knex): Promise<void> {
    const views = [
        "admin_category_sales_view",
        "admin_factory_shipping_view",
        "admin_yearly_summary_view"
    ];

    for (const view of views) {
        await knex.schema.dropViewIfExists(view);
    }
}
