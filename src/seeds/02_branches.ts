/**
 * Ingesting data with dependencies on locations
 * - Branches
 * - Factories
 */
import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
    // Delete all existing branches and factories
    await knex("branch").del();
    await knex("factory").del();

    // Get all locations and filter by type
    const locations = await knex("location").select("*");
    const branchLocations = locations.filter(l => l.location_type === "branch");
    const factoryLocations = locations.filter(l => l.location_type === "factory");

    // Generate additional data about branches and factories
    const branchesIngestData = branchLocations.map(loc => ({
        location_id: loc.id,
        sales_target: faker.number.float({ min: 1000, max: 10000 }),
        name: faker.company.name()
    }));
    const factoriesIngestData = factoryLocations.map(loc => ({
        location_id: loc.id,
        production_target: faker.number.float({ min: 1000, max: 10000 })
    }));

    await knex("branch").insert(branchesIngestData);
    await knex("factory").insert(factoriesIngestData);
};
