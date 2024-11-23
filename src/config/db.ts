import knex from "knex";
import * as config from "../../knexfile";
import { ENVIRONMENT } from "./env";

const db = knex(config[ENVIRONMENT as keyof typeof config]);

export default db;
