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
        location_type: "hq"
    },
    {
        city: "Dundee",
        address: "456 Commercial Street, Dundee DD1 2BB",
        location_type: "branch"
    },
    {
        city: "Edinburgh",
        address: "789 Princes Street, Edinburgh EH1 1CC",
        location_type: "branch"
    },
    {
        city: "Glasgow",
        address: "321 Buchanan Street, Glasgow G1 1DD",
        location_type: "branch"
    },
    {
        city: "London",
        address: "654 Oxford Street, London W1D 1EE",
        location_type: "branch"
    },
    {
        city: "Manchester",
        address: "101 Market Street, Manchester M1 1AE",
        location_type: "branch"
    },
    {
        city: "Birmingham",
        address: "202 Bullring, Birmingham B5 4BE",
        location_type: "branch"
    },
    {
        city: "Liverpool",
        address: "303 Bold Street, Liverpool L1 4DQ",
        location_type: "branch"
    },
    {
        city: "Leeds",
        address: "404 Briggate, Leeds LS1 6HF",
        location_type: "branch"
    },
    {
        city: "Bristol",
        address: "505 Park Street, Bristol BS1 5NH",
        location_type: "branch"
    },
    {
        city: "Sheffield",
        address: "606 Fargate, Sheffield S1 2HE",
        location_type: "branch"
    },
    {
        city: "Cardiff",
        address: "707 Queen Street, Cardiff CF10 2BH",
        location_type: "branch"
    },
    {
        city: "Nottingham",
        address: "808 Victoria Centre, Nottingham NG1 3QN",
        location_type: "branch"
    },
    {
        city: "Coventry",
        address: "909 Corporation Street, Coventry CV1 1GZ",
        location_type: "factory"
    },
    {
        city: "Leicester",
        address: "1010 High Street, Leicester LE1 4FQ",
        location_type: "factory"
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
