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
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropView("global_product_categories_view");
}

