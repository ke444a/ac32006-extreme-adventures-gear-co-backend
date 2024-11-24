import knex from "@/config/db";

const getEmployeeById = async (id: number) => {
    const employee = await knex("employee")
        .select([
            "employee.*",
            "employee_role.name as role"
        ])
        .join("employee_role", "employee.role_id", "employee_role.id")
        .where("employee.id", id)
        .first();

    const location = await knex("location").where("id", employee?.location_id).first();
    if (location?.location_type === "branch") {
        const branch = await knex("branch").where("location_id", location.id).first();
        return { ...employee, branch_id: branch?.id };
    }
    return employee;
};

export {
    getEmployeeById,
};
