import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createView("admin_factory_performance_view", (view) => {
        view.columns([
            "factory_id",
            "factory_code",
            "city",
            "production_target",
            "total_manufactured",
            "products_in_production",
            "manufacturing_efficiency",
            "month",
            "year"
        ]);
        view.as(
            knex.select([
                "f.id as factory_id",
                "f.factory_code",
                "l.city",
                "f.production_target",
                knex.raw("COUNT(DISTINCT fpi.product_id) as products_in_production"),
                knex.raw("SUM(fpi.quantity) as total_manufactured"),
                knex.raw("(SUM(fpi.quantity) / f.production_target * 100) as manufacturing_efficiency"),
                knex.raw("MONTH(fpi.manufactured_at) as month"),
                knex.raw("YEAR(fpi.manufactured_at) as year")
            ])
                .from("factory as f")
                .join("location as l", "f.location_id", "l.id")
                .leftJoin("factory_product_item as fpi", function () {
                    this.on("f.id", "=", "fpi.factory_id")
                        .andOn("fpi.manufactured_at", ">=", knex.raw("DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)"));
                })
                .groupBy(
                    "f.id",
                    "f.factory_code",
                    "l.city",
                    "f.production_target",
                    knex.raw("MONTH(fpi.manufactured_at)"),
                    knex.raw("YEAR(fpi.manufactured_at)")
                )
        );
    });

    // Shipping Analytics
    await knex.schema.createView("admin_shipping_analytics_view", (view) => {
        view.columns([
            "factory_id",
            "factory_city",
            "total_shipments",
            "preparing_shipments",
            "in_transit_shipments",
            "delivered_shipments",
            "avg_delivery_time_hours",
            "total_items_shipped",
            "month",
            "year"
        ]);
        view.as(
            knex.select([
                "f.id as factory_id",
                "l.city as factory_city",
                knex.raw("COUNT(DISTINCT s.id) as total_shipments"),
                knex.raw("COUNT(CASE WHEN s.shipment_status = 'preparing_to_ship' THEN 1 END) as preparing_shipments"),
                knex.raw("COUNT(CASE WHEN s.shipment_status = 'in_transit' THEN 1 END) as in_transit_shipments"),
                knex.raw("COUNT(CASE WHEN s.shipment_status = 'delivered' THEN 1 END) as delivered_shipments"),
                knex.raw("AVG(TIMESTAMPDIFF(HOUR, s.shipped_at, s.arrived_at)) as avg_delivery_time_hours"),
                knex.raw("SUM(si.quantity_shipped) as total_items_shipped"),
                knex.raw("MONTH(s.shipped_at) as month"),
                knex.raw("YEAR(s.shipped_at) as year")
            ])
                .from("factory as f")
                .join("location as l", "f.location_id", "l.id")
                .leftJoin("shipment as s", function () {
                    this.on("f.id", "=", "s.factory_id")
                        .andOn("s.shipped_at", ">=", knex.raw("DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)"));
                })
                .leftJoin("shipment_item as si", "s.id", "si.shipment_id")
                .groupBy(
                    "f.id",
                    "l.city",
                    knex.raw("MONTH(s.shipped_at)"),
                    knex.raw("YEAR(s.shipped_at)")
                )
        );
    });

    // Product Performance Analytics
    await knex.schema.createView("admin_product_performance_view", (view) => {
        view.columns([
            "product_id",
            "product_name",
            "category_name",
            "total_quantity_sold",
            "total_revenue",
            "avg_price",
            "total_manufactured",
            "month",
            "year"
        ]);
        view.as(
            knex.select([
                "p.id as product_id",
                "p.name as product_name",
                "pc.name as category_name",
                knex.raw("SUM(pi.quantity) as total_quantity_sold"),
                knex.raw("SUM(pi.total_price) as total_revenue"),
                knex.raw("SUM(pi.total_price) / SUM(pi.quantity) as avg_price"),
                knex.raw("SUM(fpi.quantity) as total_manufactured"),
                knex.raw("MONTH(pu.purchase_date) as month"),
                knex.raw("YEAR(pu.purchase_date) as year")
            ])
                .from("product as p")
                .join("product_category as pc", "p.product_category_id", "pc.id")
                .leftJoin("purchase_item as pi", "p.id", "pi.product_id")
                .leftJoin("purchase as pu", function () {
                    this.on("pi.purchase_id", "=", "pu.id")
                        .andOn("pu.purchase_date", ">=", knex.raw("DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)"));
                })
                .leftJoin("factory_product_item as fpi", function () {
                    this.on("p.id", "=", "fpi.product_id")
                        .andOn("fpi.manufactured_at", ">=", knex.raw("DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)"));
                })
                .groupBy(
                    "p.id",
                    "p.name",
                    "pc.name",
                    knex.raw("MONTH(pu.purchase_date)"),
                    knex.raw("YEAR(pu.purchase_date)")
                )
                .orderBy("total_revenue", "desc")
        );
    });

    // Combined Business Analytics with Monthly Breakdown
    await knex.schema.createView("admin_business_analytics_view", (view) => {
        view.columns([
            "total_revenue",
            "total_products_sold",
            "total_products_manufactured",
            "total_shipments",
            "avg_manufacturing_efficiency",
            "avg_delivery_time",
            "month",
            "year"
        ]);
        view.as(
            knex.select([
                knex.raw("SUM(p.total_amount) as total_revenue"),
                knex.raw("SUM(pi.quantity) as total_products_sold"),
                knex.raw("SUM(fpi.quantity) as total_products_manufactured"),
                knex.raw("COUNT(DISTINCT s.id) as total_shipments"),
                knex.raw("AVG(fpi.quantity / f.production_target * 100) as avg_manufacturing_efficiency"),
                knex.raw("AVG(TIMESTAMPDIFF(HOUR, s.shipped_at, s.arrived_at)) as avg_delivery_time"),
                knex.raw("MONTH(p.purchase_date) as month"),
                knex.raw("YEAR(p.purchase_date) as year")
            ])
                .from("purchase as p")
                .leftJoin("purchase_item as pi", "p.id", "pi.purchase_id")
                .crossJoin(knex.raw("(SELECT 1) as dummy"))
                .leftJoin("factory as f", knex.raw("1=1"))
                .leftJoin("factory_product_item as fpi", function () {
                    this.on("f.id", "=", "fpi.factory_id")
                        .andOn("fpi.manufactured_at", ">=", knex.raw("DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)"));
                })
                .leftJoin("shipment as s", function () {
                    this.on("f.id", "=", "s.factory_id")
                        .andOn("s.shipped_at", ">=", knex.raw("DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)"));
                })
                .where("p.purchase_date", ">=", knex.raw("DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)"))
                .groupBy(
                    knex.raw("MONTH(p.purchase_date)"),
                    knex.raw("YEAR(p.purchase_date)")
                )
                .orderBy("year", "desc")
                .orderBy("month", "desc")
        );
    });
}

export async function down(knex: Knex): Promise<void> {
    const views = [
        "admin_factory_performance_view",
        "admin_shipping_analytics_view",
        "admin_product_performance_view",
        "admin_business_analytics_view"
    ];

    for (const view of views) {
        await knex.schema.dropViewIfExists(view);
    }
}
