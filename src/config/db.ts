import knex from "knex";
// import * as config from "../../knexfile";
// import { ENVIRONMENT } from "./env";

const db = knex({
    client: "mysql2",
    connection: {
        host: "extreme-adventures-test.c4nqamxesyxh.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "123PASSWORD###123",
        database: "extreme_adventures_db"
    },
    // connection: {
    //     host: "127.0.0.1",
    //     user: "root",
    //     password: "",
    //     database: "extreme_adventures_gear_db"
    // },
    migrations: {
        directory: "./src/migrations"
    },
    seeds: {
        directory: "./src/seeds"
    }
});

export default db;
