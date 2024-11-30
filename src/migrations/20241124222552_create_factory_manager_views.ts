import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // View all shipments from specific factory
    await knex.schema.createView("admin_and_factory_manager_all_shipments_view", (view) => {
        view.columns([
            "shipment_id",
            "branch_id",
            "factory_id",
            "branch_city",
            "shipment_status",
            "shipped_at",
            "arrived_at",
            "total_items",
            "updated_at"
        ]);
        view.as(
            knex.select([
                "s.id as shipment_id",
                "b.id as branch_id",
                "f.id as factory_id",
                "l.city as branch_city",
                "s.shipment_status",
                "s.shipped_at",
                "s.arrived_at",
                knex.raw("SUM(si.quantity_shipped) as total_items"),
                "s.updated_at"
            ])
                .from("shipment as s")
                .join("branch as b", "s.branch_id", "b.id")
                .join("location as l", "b.location_id", "l.id")
                .join("shipment_item as si", "s.id", "si.shipment_id")
                .join("factory as f", "s.factory_id", "f.id")
                .groupBy(
                    "s.id",
                    "b.id",
                    "l.city",
                    "s.shipment_status",
                    "s.shipped_at",
                    "s.arrived_at"
                )
                .orderBy("s.updated_at", "desc")
        );
    });

    // View all manufactured products in specific factory
    await knex.schema.createView("admin_and_factory_manager_manufactured_products_view", (view) => {
        view.columns([
            "factory_product_id",
            "factory_id",
            "product_id",
            "product_name",
            "product_image_url",
            "product_category_id",
            "product_category",
            "quantity",
            "manufactured_at"
        ]);
        view.as(
            knex.select([
                "fpi.id as factory_product_id",
                "f.id as factory_id",
                "p.id as product_id",
                "p.name as product_name",
                "p.image_url as product_image_url",
                "pc.id as product_category_id",
                "pc.name as product_category",
                "fpi.quantity",
                "fpi.manufactured_at"
            ])
                .from("factory_product_item as fpi")
                .join("product as p", "fpi.product_id", "p.id")
                .join("product_category as pc", "p.product_category_id", "pc.id")
                .join("factory as f", "fpi.factory_id", "f.id")
                .orderBy("fpi.manufactured_at", "desc")
        );
    });

    // View all factory workers in specific factory
    await knex.schema.createView("factory_manager_employees_view", (view) => {
        view.columns([
            "factory_id",
            "employee_id",
            "name",
            "role",
            "phone_number",
            "age",
            "salary",
            "hire_date",
            "employment_type",
            "shift_type",
            "shift_start",
            "shift_end",
        ]);
        view.as(
            knex.select([
                "f.id as factory_id",
                "e.id as employee_id",
                "e.name",
                "er.name as role",
                "e.phone_number",
                "e.age",
                "e.salary",
                "e.hire_date",
                "e.employment_type",
                "ws.shift_type",
                "ws.start_time as shift_start",
                "ws.end_time as shift_end",
            ])
                .from("employee as e")
                .join("employee_role as er", "e.role_id", "er.id")
                .join("work_schedule as ws", "e.work_schedule_id", "ws.id")
                .join("factory as f", "e.location_id", "f.location_id")
                .orderBy("e.hire_date", "desc")
                .where("er.name", "=", "factory_worker")
        );
    });

    // Insert/update shipments
    await knex.schema.createView("factory_manager_modify_shipment_view", (view) => {
        view.columns([
            "id",
            "factory_id",
            "branch_id",
            "shipment_status",
            "shipped_at",
            "arrived_at",
            "updated_at"
        ]);
        view.as(
            knex.select([
                "id",
                "factory_id",
                "branch_id",
                "shipment_status",
                "shipped_at",
                "arrived_at",
                "updated_at"
            ])
                .from("shipment")
        );
        view.checkOption();
    });

    // Insert/update/delete manufactured products
    await knex.schema.createView("factory_manager_modify_manufactured_product_view", (view) => {
        view.columns([
            "id",
            "factory_id",
            "product_id",
            "quantity",
            "manufactured_at",
            "updated_at"
        ]);
        view.as(
            knex.select([
                "id",
                "factory_id",
                "product_id",
                "quantity",
                "manufactured_at",
                "updated_at"
            ])
                .from("factory_product_item")
        );
        view.checkOption();
    });

    // Insert/update factory workers
    await knex.schema.createView("factory_manager_modify_employee_view", (view) => {
        view.columns([
            "id",
            "name",
            "phone_number",
            "age",
            "salary",
            "employment_type",
            "work_schedule_id"
        ]);
        view.as(
            knex.select([
                "id",
                "name", 
                "phone_number",
                "age",
                "salary",
                "employment_type",
                "work_schedule_id"
            ])
                .from("employee")
        );
        view.checkOption();
    });

    // View shipment items and factory product details for shipment
    await knex.schema.createView("factory_manager_shipment_details_view", (view) => {
        view.columns([
            "shipment_id",
            "product_id",
            "product_name",
            "product_category",
            "quantity_shipped",
            "manufactured_at",
            "factory_product_id",
            "total_manufactured_in_batch",
            "remaining_in_factory"
        ]);
        view.as(
            knex.select([
                "s.id as shipment_id",
                "p.id as product_id",
                "p.name as product_name",
                "pc.name as product_category",
                "si.quantity_shipped",
                "fpi.manufactured_at",
                "fpi.id as factory_product_id",
                knex.raw(`
                    COALESCE((SELECT quantity 
                     FROM factory_product_item 
                     WHERE id = fpi.id), 0) as total_manufactured_in_batch
                `),
                knex.raw(`
                    COALESCE((SELECT quantity 
                     FROM factory_product_item 
                     WHERE id = fpi.id), 0) - si.quantity_shipped as remaining_in_factory
                `)
            ])
                .from("shipment as s")
                .join("shipment_item as si", "s.id", "si.shipment_id")
                .join("factory_product_item as fpi", "si.factory_product_id", "fpi.id")
                .leftJoin("product as p", "fpi.product_id", "p.id")
                .leftJoin("product_category as pc", "p.product_category_id", "pc.id")
                .orderBy("s.id")
                .orderBy("fpi.manufactured_at", "desc")
        );
    });

    // Insert/update shipment items
    await knex.schema.createView("factory_manager_modify_shipment_item_view", (view) => {
        view.columns([
            "id",
            "shipment_id",
            "factory_product_id",
            "quantity_shipped",
        ]);
        view.as(
            knex.select([
                "id",
                "shipment_id",
                "factory_product_id",
                "quantity_shipped"
            ])
                .from("shipment_item")
        );
        view.checkOption();
    });

    // View for updating shipment status for branch
    await knex.schema.createView("factory_manager_update_shipment_status_view", (view) => {
        view.columns([
            "id",
            "shipment_status",
            "shipped_at",
            "branch_id"
        ]);
        view.as(
            knex.select([
                "id",
                "shipment_status",
                "shipped_at",
                "branch_id"
            ])
                .from("shipment")
        );
    });
}

export async function down(knex: Knex): Promise<void> {
    const views = [
        "admin_and_factory_manager_all_shipments_view",
        "admin_and_factory_manager_manufactured_products_view",
        "factory_manager_employees_view",
        "factory_manager_modify_shipment_view",
        "factory_manager_modify_manufactured_product_view",
        "factory_manager_modify_employee_view",
        "factory_manager_shipment_details_view",
        "factory_manager_modify_shipment_item_view",
        "factory_manager_update_shipment_status_view"
    ];
    
    for (const view of views) {
        await knex.schema.dropViewIfExists(view);
    }
}

