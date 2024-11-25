import knex from "@/config/db";
import { AdminViews, FactoryManagerViews } from "@/config/enums";

const getEmployeeByIdQuery = async (id: number) => {
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

const getEmployeesByFactoryIdQuery = async (factoryId: number) => {
    return await knex<IFactoryManagerEmployeesView>(FactoryManagerViews.FACTORY_EMPLOYEES)
        .where({ factory_id: factoryId });
};

const updateFactoryEmployeeQuery = async (
    factoryId: number,
    employeeId: number,
    updatedEmployeeData: Partial<IFactoryManagerModifyEmployeeView>
) => {
    return await knex(FactoryManagerViews.MODIFY_FACTORY_EMPLOYEE)
        .where({
            id: employeeId,
            factory_id: factoryId
        })
        .update(updatedEmployeeData);
};

const deleteFactoryEmployeeQuery = async (factoryId: number, employeeId: number) => {
    return await knex(FactoryManagerViews.MODIFY_FACTORY_EMPLOYEE)
        .where({
            id: employeeId,
            factory_id: factoryId
        })
        .delete();
};

const getAllEmployeesQuery = async () => {
    return await knex<IAdminAllEmployeesView>(AdminViews.ALL_EMPLOYEES);
};

const getEmployeesByLocationIdQuery = async (locationId: number) => {
    return await knex<IAdminAllEmployeesView>(AdminViews.ALL_EMPLOYEES)
        .where({ location_id: locationId });
};

const createEmployeeQuery = async (employeeData: Partial<IAdminModifyEmployeeView>) => {
    return await knex<IAdminModifyEmployeeView>(AdminViews.MODIFY_EMPLOYEE)
        .insert(employeeData);
};

const updateEmployeeQuery = async (employeeId: number, updates: Partial<IAdminModifyEmployeeView>) => {
    return await knex<IAdminModifyEmployeeView>(AdminViews.MODIFY_EMPLOYEE)
        .where("id", employeeId)
        .update(updates);
};

const deleteEmployeeQuery = async (employeeId: number) => {
    return await knex<IAdminModifyEmployeeView>(AdminViews.MODIFY_EMPLOYEE)
        .where("id", employeeId)
        .delete();
};

export {
    getEmployeeByIdQuery,
    getEmployeesByLocationIdQuery,
    getEmployeesByFactoryIdQuery,
    updateFactoryEmployeeQuery,
    deleteFactoryEmployeeQuery,
    getAllEmployeesQuery,
    createEmployeeQuery,
    updateEmployeeQuery,
    deleteEmployeeQuery
};
