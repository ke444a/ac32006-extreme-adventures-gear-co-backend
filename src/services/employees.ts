import { 
    getEmployeesByFactoryIdQuery,
    updateFactoryEmployeeQuery,
    deleteFactoryEmployeeQuery,
    getEmployeesByLocationIdQuery,
    getAllEmployeesQuery,
    createEmployeeQuery,
    updateEmployeeQuery,
    deleteEmployeeQuery,
    getWorkScheduleIdQuery,
    getRoleIdQuery
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
        let workScheduleId: number | undefined;
        if (employeeData.workScheduleType) {
            workScheduleId = await getWorkScheduleIdQuery(employeeData.workScheduleType);
        }

        const updateData: Partial<IFactoryManagerModifyEmployeeView> = {};
        if (employeeData.name) updateData.name = employeeData.name;
        if (employeeData.phoneNumber) updateData.phone_number = employeeData.phoneNumber;
        if (employeeData.age) updateData.age = employeeData.age;
        if (employeeData.salary) updateData.salary = employeeData.salary;
        if (employeeData.employmentType) updateData.employment_type = employeeData.employmentType;
        if (workScheduleId) updateData.work_schedule_id = workScheduleId;
        
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
        const roleId = await getRoleIdQuery(employeeData.role);
        const workScheduleId = await getWorkScheduleIdQuery(employeeData.workScheduleType);
        const createData: Partial<IAdminModifyEmployeeView> = {
            name: employeeData.name,
            phone_number: employeeData.phoneNumber,
            age: employeeData.age,
            salary: employeeData.salary,
            employment_type: employeeData.employmentType,
            work_schedule_id: workScheduleId,
            location_id: employeeData.locationId,
            role_id: roleId
        };
        return await createEmployeeQuery(createData);
    }

    public async updateEmployee(employeeId: number, employeeData: RequestBodyPATCH["EMPLOYEE"], locationId?: number) {
        let workScheduleId: number | undefined;
        if (employeeData.workScheduleType) {
            workScheduleId = await getWorkScheduleIdQuery(employeeData.workScheduleType);
        }

        const updateData: Partial<IAdminModifyEmployeeView> = {
            ...(employeeData.name && { name: employeeData.name }),
            ...(employeeData.phoneNumber && { phone_number: employeeData.phoneNumber }),
            ...(employeeData.age && { age: employeeData.age }),
            ...(employeeData.salary && { salary: employeeData.salary }),
            ...(employeeData.employmentType && { employment_type: employeeData.employmentType }),
            ...(workScheduleId && { work_schedule_id: workScheduleId }),
            ...(locationId && { location_id: locationId })
        };
        return await updateEmployeeQuery(employeeId, updateData);
    }

    public async deleteEmployee(employeeId: number) {
        return await deleteEmployeeQuery(employeeId);
    }
}

export default new EmployeesService(); 
