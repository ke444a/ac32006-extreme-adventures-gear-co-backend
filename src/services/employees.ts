import { 
    getEmployeesByFactoryIdQuery,
    updateFactoryEmployeeQuery,
    deleteFactoryEmployeeQuery,
    getEmployeesByLocationIdQuery,
    getAllEmployeesQuery,
    createEmployeeQuery,
    updateEmployeeQuery,
    deleteEmployeeQuery
} from "@/queries/employees";

class EmployeesService {
    public async getFactoryEmployeesByFactoryId(factoryId: number) {
        return await getEmployeesByFactoryIdQuery(factoryId);
    }

    public async updateFactoryEmployeeDetails(
        factoryId: number, 
        employeeId: number, 
        employeeData: RequestBodyPATCH["EMPLOYEE"]
    ) {
        const updateData: Partial<IFactoryManagerModifyEmployeeView> = {};
        if (employeeData.name) updateData.name = employeeData.name;
        if (employeeData.phoneNumber) updateData.phone_number = employeeData.phoneNumber;
        if (employeeData.age) updateData.age = employeeData.age;
        if (employeeData.salary) updateData.salary = employeeData.salary;
        if (employeeData.employmentType) updateData.employment_type = employeeData.employmentType;
        if (employeeData.workScheduleId) updateData.work_schedule_id = employeeData.workScheduleId;
        
        return await updateFactoryEmployeeQuery(factoryId, employeeId, updateData);
    }

    public async deleteFactoryEmployee(factoryId: number, employeeId: number) {
        return await deleteFactoryEmployeeQuery(factoryId, employeeId);
    }

    public async getAllEmployees() {
        return await getAllEmployeesQuery();
    }

    public async getEmployeesByLocationId(locationId: number) {
        return await getEmployeesByLocationIdQuery(locationId);
    }

    public async createEmployee(employeeData: RequestBodyPOST["EMPLOYEE"]) {
        const createData: Partial<IAdminModifyEmployeeView> = {
            name: employeeData.name,
            phone_number: employeeData.phoneNumber,
            age: employeeData.age,
            salary: employeeData.salary,
            employment_type: employeeData.employmentType,
            work_schedule_id: employeeData.workScheduleId,
            location_id: employeeData.locationId,
            role_id: employeeData.roleId
        };
        return await createEmployeeQuery(createData);
    }

    public async updateEmployee(employeeId: number, employeeData: RequestBodyPATCH["EMPLOYEE"], locationId?: number) {
        const updateData: Partial<IAdminModifyEmployeeView> = {};
        if (employeeData.name) updateData.name = employeeData.name;
        if (employeeData.phoneNumber) updateData.phone_number = employeeData.phoneNumber;
        if (employeeData.age) updateData.age = employeeData.age;
        if (employeeData.salary) updateData.salary = employeeData.salary;
        if (employeeData.employmentType) updateData.employment_type = employeeData.employmentType;
        if (employeeData.workScheduleId) updateData.work_schedule_id = employeeData.workScheduleId;
        if (locationId) updateData.location_id = locationId;

        return await updateEmployeeQuery(employeeId, updateData);
    }

    public async deleteEmployee(employeeId: number) {
        return await deleteEmployeeQuery(employeeId);
    }
}

export default new EmployeesService(); 
