import knex from "@/config/db";
import { FactoryManagerViews } from "@/config/enums";

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
    } else if (location?.location_type === "factory") {
        const factory = await knex("factory").where("location_id", location.id).first();
        return { ...employee, factory_id: factory?.id };
    }
    return employee;
};

const getEmployeesByFactoryId = async (factoryId: number) => {
    return await knex<IFactoryManagerFactoryEmployeesView>(FactoryManagerViews.FACTORY_EMPLOYEES)
        .where({ factory_id: factoryId });
};

const updateFactoryEmployee = async (
    factoryId: number,
    employeeId: number,
    changes: IEmployeeChange
) => {
    const updateData: Partial<IFactoryManagerModifyEmployeeView> = {};
    if (changes.name) updateData.name = changes.name;
    if (changes.phoneNumber) updateData.phone_number = changes.phoneNumber;
    if (changes.age) updateData.age = changes.age;
    if (changes.salary) updateData.salary = changes.salary;
    if (changes.employmentType) updateData.employment_type = changes.employmentType;
    if (changes.workScheduleId) updateData.work_schedule_id = changes.workScheduleId;

    return await knex(FactoryManagerViews.MODIFY_FACTORY_EMPLOYEE)
        .where({
            id: employeeId,
            factory_id: factoryId
        })
        .update(updateData);
};

const deleteFactoryEmployee = async (factoryId: number, employeeId: number) => {
    return await knex(FactoryManagerViews.MODIFY_FACTORY_EMPLOYEE)
        .where({
            id: employeeId,
            factory_id: factoryId
        })
        .delete();
};

export {
    getEmployeeById,
    getEmployeesByFactoryId,
    updateFactoryEmployee,
    deleteFactoryEmployee
};
