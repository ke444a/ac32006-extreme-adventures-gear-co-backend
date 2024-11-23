import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql2",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "extreme_adventures_gear_db"
        },
        migrations: {
            directory: "./src/migrations"
        },
        seeds: {
            directory: "./src/seeds"
        }
    }
};

export default config;
