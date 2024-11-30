import knex from "@/config/db";
import { AdminViews, FactoryManagerViews, GlobalViews } from "@/config/enums";

// const getEmployeeByIdQuery = async (id: number) => {
//     const employee = await knex("employee")
//         .select([
//             "employee.*",
//             "employee_role.name as role",
//             "location.location_type as location_type",
//             "location.city as location_city",
//             "location.address as location_address"
//         ])
//         .join("employee_role", "employee.role_id", "employee_role.id")
//         .join("location", "employee.location_id", "location.id")
//         .where("employee.id", id)
//         .first();

//     const location = await knex("location").where("id", employee?.location_id).first();
//     if (location?.location_type === "branch") {
//         const branch = await knex("branch").where("location_id", location.id).first();
//         return { ...employee, branch_id: branch?.id };
//     } else if (location?.location_type === "factory") {
//         const factory = await knex("factory").where("location_id", location.id).first();
//         return { ...employee, factory_id: factory?.id };
//     }
//     return employee;
// };

const getEmployeeByIdQuery = async (employeeId: number) => {
    return await knex<IAuthenticatedEmployeeDetailsView>(GlobalViews.AUTHENTICATED_EMPLOYEE_DETAILS)
        .where({ id: employeeId });
};

const getEmployeesByFactoryIdQuery = async (factoryId: number) => {
    return await knex<IFactoryManagerEmployeesView>(FactoryManagerViews.FACTORY_EMPLOYEES)
        .where({ factory_id: factoryId });
};

const updateFactoryEmployeeQuery = async (
    employeeId: number,
    updatedEmployeeData: Partial<IFactoryManagerModifyEmployeeView>
) => {
    return await knex(FactoryManagerViews.MODIFY_FACTORY_EMPLOYEE)
        .where({
            id: employeeId,
            // factory_id: factoryId
        })
        .update(updatedEmployeeData);
};

const deleteFactoryEmployeeQuery = async (employeeId: number) => {
    return await knex(FactoryManagerViews.MODIFY_FACTORY_EMPLOYEE)
        .where({
            id: employeeId,
            // factory_id: factoryId
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

const getWorkScheduleIdQuery = async (workScheduleType: WorkScheduleTypeDB) => {
    const { id } = await knex("work_schedule")
        .where("shift_type", workScheduleType)
        .select("id")
        .first();
    return id;
};

const getRoleIdQuery = async (roleName: IEmployeeRole) => {
    const { id } = await knex("employee_role")
        .where("name", roleName)
        .select("id")
        .first();
    return id;
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
    deleteEmployeeQuery,
    getWorkScheduleIdQuery,
    getRoleIdQuery,
};
