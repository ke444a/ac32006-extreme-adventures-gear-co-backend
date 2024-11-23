import knex from "@/config/db";

export default {
    // registerCredentials: (employeeId: number, email: string, passwordHash: string) => knex("employee_credentials").insert({ employee_id: employeeId, email, password_hash: passwordHash }),
    login: (email: string) => knex("employee_credentials").select("employee_id", "email", "password_hash").where({ email }).first()
};
