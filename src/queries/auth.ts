import knex from "@/config/db";

const getCredentialsByEmail = (email: string) => knex("employee_credentials").select("employee_id", "email", "password_hash").where({ email }).first();

export {
    getCredentialsByEmail,
};
