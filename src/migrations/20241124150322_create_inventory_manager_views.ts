import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Insert/delete/update branch item
    await knex.schema.createView("inventory_manager_modify_branch_item_view", (view) => {
        view.columns([
            "id",
            "branch_id", 
            "product_id",
            "quantity",
            "updated_at"
        ]);
        view.as(
            knex.select([
                "bi.id",
                "bi.branch_id",
                "bi.product_id",
                "bi.quantity",
                "bi.updated_at"
            ]).from("branch_item as bi")
        );
        view.checkOption();
    });

    // View all branch items in specific branch
    await knex.schema.createView("inventory_manager_branch_items_in_branch_view", (view) => {
        view.columns([
            "branch_item_id",
            "branch_id",
            "product_id", 
            "product_name",
            "product_image_url",
            "product_category_id",
            "product_category",
            "quantity",
            "price",
            "warranty_duration",
            "last_restocked_at"
        ]);
        view.as(
            knex.select([
                "bi.id as branch_item_id",
                "bi.branch_id",
                "bi.product_id",
                "p.name as product_name",
                "p.image_url as product_image_url",
                "p.product_category_id",
                "pc.name as product_category",
                "bi.quantity",
                "p.price",
                "p.warranty_duration",
                "bi.updated_at as last_restocked_at"
            ])
                .from("branch_item as bi")
                .join("product as p", "bi.product_id", "p.id")
                .join("product_category as pc", "p.product_category_id", "pc.id")
                .orderBy("bi.updated_at", "desc")
                .orderBy("pc.name")
                .orderBy("p.name")
        );
    });

    // View all shipments to specific branch
    await knex.schema.createView("inventory_manager_all_shipments_to_branch_view", (view) => {
        view.columns([
            "shipment_id",
            "branch_id",
            "branch_city",
            "factory_id",
            "factory_city",
            "shipment_status",
            "shipped_at",
            "arrived_at",
            "total_items",
            "updated_at"
        ]);
        view.as(
            knex.select([
                "s.id as shipment_id",
                "s.branch_id",
                "bl.city as branch_city",
                "f.id as factory_id",
                "fl.city as factory_city",
                "s.shipment_status",
                "s.shipped_at",
                "s.arrived_at",
                knex.raw("SUM(si.quantity_shipped) as total_items"),
                "s.updated_at"
            ])
                .from("shipment as s")
                .join("factory as f", "s.factory_id", "f.id")
                .join("location as fl", "f.location_id", "fl.id")
                .join("branch as b", "s.branch_id", "b.id")
                .join("location as bl", "b.location_id", "bl.id")
                .join("shipment_item as si", "s.id", "si.shipment_id")
                .groupBy(
                    "s.id",
                    "f.location_id",
                    "fl.city",
                    "bl.city",
                    "s.shipment_status",
                    "s.shipped_at",
                    "s.arrived_at"
                )
                .orderBy("s.updated_at", "desc")
        );
    });

    // View upcoming shipments to specific branch
    await knex.schema.createView("inventory_manager_upcoming_shipments_to_branch_view", (view) => {
        view.columns([
            "shipment_id",
            "branch_id",
            "branch_city",
            "factory_id",
            "factory_city",
            "shipment_status",
            "shipped_at",
            "arrived_at",
            "total_items",
            "updated_at"
        ]);
        view.as(
            knex.select([
                "s.id as shipment_id",
                "s.branch_id",
                "bl.city as branch_city",
                "s.factory_id",
                "fl.city as factory_city",
                "s.shipment_status",
                "s.shipped_at",
                "s.arrived_at",
                knex.raw("SUM(si.quantity_shipped) as total_items"),
                "s.updated_at"
            ])
                .from("shipment as s")
                .join("factory as f", "s.factory_id", "f.id")
                .join("branch as b", "s.branch_id", "b.id")
                .join("location as fl", "f.location_id", "fl.id")
                .join("location as bl", "b.location_id", "bl.id")
                .join("shipment_item as si", "s.id", "si.shipment_id")
                .where("s.arrived_at", null)
                .whereNotNull("s.shipped_at")
                .whereIn("s.shipment_status", ["in_transit", "shipped"])
                .groupBy(
                    "s.id",
                    "f.location_id",
                    "fl.city",
                    "bl.city",
                    "s.shipment_status",
                    "s.shipped_at",
                    "s.arrived_at",
                    "s.updated_at"
                )
                .orderBy("s.updated_at", "desc")
        );
    });

    // View shipment items for specific shipment
    await knex.schema.createView("admin_and_inventory_manager_shipment_details_view", (view) => {
        view.columns([
            "shipment_id",
            "product_id",
            "product_name",
            "product_category",
            "product_image_url",
            "quantity_shipped",
            "manufactured_at"
        ]);
        view.as(
            knex.select([
                "s.id as shipment_id",
                "p.id as product_id",
                "p.name as product_name",
                "pc.name as product_category",
                "p.image_url as product_image_url",
                "si.quantity_shipped",
                "fpi.manufactured_at"
            ])
                .from("shipment as s")
                .join("shipment_item as si", "s.id", "si.shipment_id")
                .join("factory_product_item as fpi", "si.factory_product_id", "fpi.id")
                .leftJoin("product as p", "fpi.product_id", "p.id")
                .leftJoin("product_category as pc", "p.product_category_id", "pc.id")
                .orderBy("s.id")
                .orderBy("p.name")
        );
    });

    // Update shipment status when delivered
    await knex.schema.createView("inventory_manager_update_shipment_status_view", (view) => {
        view.columns([
            "id",
            "shipment_status",
            "arrived_at"
        ]);
        view.as(
            knex.select([
                "id",
                "shipment_status",
                "arrived_at"
            ])
                .from("shipment")
                .whereNotNull("shipment_status")
        );
        view.checkOption();
    });
}

export async function down(knex: Knex): Promise<void> {
    const views = [
        "inventory_manager_modify_branch_item_view",
        "inventory_manager_branch_items_in_branch_view",
        "inventory_manager_all_shipments_to_branch_view",
        "inventory_manager_upcoming_shipments_to_branch_view",
        "admin_and_inventory_manager_shipment_details_view",
        "inventory_manager_update_shipment_status_view"
    ];

    for (const view of views) {
        await knex.schema.dropViewIfExists(view);
    }
}
