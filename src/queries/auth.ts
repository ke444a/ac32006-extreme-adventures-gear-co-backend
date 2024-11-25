import knex from "@/config/db";

const getCredentialsByEmailQuery = async (email: string) => {
    return await knex<IEmployeeCredentialsDatabase>("employee_credentials")
        .select("employee_id", "email", "password_hash")
        .where({ email })
        .first();
};

export {
    getCredentialsByEmailQuery
};
