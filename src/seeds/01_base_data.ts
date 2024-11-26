/**
 * Ingesting base data with no dependencies
 * - Locations
 * - Employee roles
 * - Employee work schedules
 */
import { Knex } from "knex";

const LOCATIONS = [
    {
        city: "Dundee",
        address: "123 High Street, Dundee DD1 1AA",
        location_type: "hq",
        latitude: 56.46,
        longitude: -2.96
    },
    {
        city: "Perth",
        address: "456 Commercial Street, Perth PH1 2BB",
        location_type: "branch",
        latitude: 56.39,
        longitude: -3.43


    },
    {
        city: "Edinburgh",
        address: "789 Princes Street, Edinburgh EH1 1CC",
        location_type: "branch",
        latitude: 55.95,
        longitude: -3.19
    },
    {
        city: "Glasgow",
        address: "321 Buchanan Street, Glasgow G1 1DD",
        location_type: "branch",
        latitude: 55.86,
        longitude: -4.25
    },
    {
        city: "London",
        address: "654 Oxford Street, London W1D 1EE",
        location_type: "branch",
        latitude: 51.51,
        longitude: -0.13
    },
    {
        city: "Manchester",
        address: "101 Market Street, Manchester M1 1AE",
        location_type: "branch",
        latitude: 53.48,
        longitude: -2.24
    },
    {
        city: "Birmingham",
        address: "202 Bullring, Birmingham B5 4BE",
        location_type: "branch",
        latitude: 52.48,
        longitude: -1.89
    },
    {
        city: "Liverpool",
        address: "303 Bold Street, Liverpool L1 4DQ",
        location_type: "branch",
        latitude: 53.41,
        longitude: -2.99
    },
    {
        city: "Leeds",
        address: "404 Briggate, Leeds LS1 6HF",
        location_type: "branch",
        latitude: 53.80,
        longitude: -1.55
    },
    {
        city: "Bristol",
        address: "505 Park Street, Bristol BS1 5NH",
        location_type: "branch",
        latitude: 51.45,
        longitude: -2.59
    },
    {
        city: "Sheffield",
        address: "606 Fargate, Sheffield S1 2HE",
        location_type: "branch",
        latitude: 53.38,
        longitude: -1.47
    },
    {
        city: "Cardiff",
        address: "707 Queen Street, Cardiff CF10 2BH",
        location_type: "branch",
        latitude: 51.48,
        longitude: -3.18
    },
    {
        city: "Nottingham",
        address: "808 Victoria Centre, Nottingham NG1 3QN",
        location_type: "branch",
        latitude: 52.95,
        longitude: -1.13
    },
    {
        city: "Coventry",
        address: "909 Corporation Street, Coventry CV1 1GZ",
        location_type: "factory",
        latitude: 52.40,
        longitude: -1.51
    },
    {
        city: "Leicester",
        address: "1010 High Street, Leicester LE1 4FQ",
        location_type: "factory",
        latitude: 52.63,
        longitude: -1.13
    }
];

const EMPLOYEE_ROLES = [
    { name: "admin" },
    { name: "inventory_manager" },
    { name: "sales_representative" },
    { name: "factory_manager" },
    { name: "factory_worker" }
];

const WORK_SCHEDULES = [
    { shift_type: "morning", start_time: "09:00", end_time: "17:00" },
    { shift_type: "afternoon", start_time: "13:00", end_time: "21:00" }
];

export async function seed(knex: Knex): Promise<void> {
    // Delete all existing data in the correct order based on migration dependencies
    await knex("shipment_item").del();
    await knex("shipment").del();
    await knex("factory_product_item").del();
    await knex("purchase_item").del();
    await knex("purchase").del();
    await knex("customer").del();
    await knex("payroll").del();
    await knex("payment").del();
    await knex("employee_credentials").del();
    await knex("employee").del();
    await knex("branch_item").del();
    await knex("product").del();
    await knex("product_category").del();
    await knex("branch").del();
    await knex("factory").del();
    await knex("location").del();
    await knex("employee_role").del();
    await knex("work_schedule").del();

    await knex("location").insert(LOCATIONS);
    await knex("employee_role").insert(EMPLOYEE_ROLES);
    await knex("work_schedule").insert(WORK_SCHEDULES);
};
