/**
 * Ingesting data with dependencies on branches and products:
 * - Branch items
 */
import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
    await knex("branch_item").del();

    const branches = await knex("branch").select("*");
    const products = await knex("product").select("*");

    // Create inventory items for each branch
    const branchIngestData = [];
    for (const product of products) {
        // Randomly assign what products are available at each branch
        const numberOfBranches = faker.number.int({ min: 1, max: branches.length });
        const selectedBranches = faker.helpers.arrayElements(branches, numberOfBranches);

        for (const branch of selectedBranches) {
            branchIngestData.push({
                branch_id: branch.id,
                product_id: product.id,
                // if quantity is 0, product is available but out of stock
                quantity: faker.number.int({ min: 0, max: 100 }),
                updated_at: faker.date.between({ from: "2022-01-01", to: "2024-11-26" })
            });
        }
    }

    await knex("branch_item").insert(branchIngestData);
};
