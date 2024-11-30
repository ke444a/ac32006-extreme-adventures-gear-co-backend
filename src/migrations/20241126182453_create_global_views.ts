/*
    Views accessible to all 4 user roles
*/
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createView("global_product_categories_view", (view) => {
        view.columns([
            "id",
            "name"
        ]);
        view.as(
            knex.select([
                "id",
                "name"
            ])
                .from("product_category")
        );
    });

    // View all products
    await knex.schema.createView("global_all_products_view", (view) => {
        view.columns([
            "id",
            "name", 
            "description",
            "image_url",
            "price",
            "warranty_duration",
            "product_category_id",
            "product_category_name"
        ]);
        view.as(
            knex.select([
                "p.id",
                "p.name",
                "p.description",
                "p.image_url",
                "p.price",
                "p.warranty_duration",
                "pc.id as product_category_id",
                "pc.name as product_category_name"
            ])
                .from("product as p")
                .join("product_category as pc", "p.product_category_id", "pc.id")
        );
    });

    await knex.schema.createView("authenticated_employee_details_view", (view) => {
        view.columns([
            "id",
            "role",
            "location_type",
            "location_city",
            "location_address",
            "branch_id",
            "factory_id"
        ]);
        view.as(
            knex.select([
                "employee.id",
                "employee_role.name as role",
                "location.location_type",
                "location.city as location_city",
                "location.address as location_address",
                knex.raw("CASE WHEN location.location_type = 'branch' THEN branch.id ELSE NULL END as branch_id"),
                knex.raw("CASE WHEN location.location_type = 'factory' THEN factory.id ELSE NULL END as factory_id")
            ])
                .from("employee")
                .join("employee_role", "employee.role_id", "employee_role.id")
                .join("location", "employee.location_id", "location.id")
                .leftJoin("branch", function () {
                    this.on("location.id", "=", "branch.location_id")
                        .andOn("location.location_type", "=", knex.raw("'branch'"));
                })
                .leftJoin("factory", function () {
                    this.on("location.id", "=", "factory.location_id")
                        .andOn("location.location_type", "=", knex.raw("'factory'"));
                })
        );
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropViewIfExists("global_product_categories_view");
    await knex.schema.dropViewIfExists("global_all_products_view");
    await knex.schema.dropViewIfExists("authenticated_employee_details_view");
}
