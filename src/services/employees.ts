import { 
    getEmployeesByFactoryId,
    updateFactoryEmployee,
    deleteFactoryEmployee
} from "@/queries/employees";

class EmployeesService {
    public async getEmployeesByLocation(factoryId: number) {
        return await getEmployeesByFactoryId(factoryId);
    }

    public async updateFactoryEmployeeDetails(
        factoryId: number, 
        employeeId: number, 
        changes: IEmployeeChange
    ) {
        return await updateFactoryEmployee(factoryId, employeeId, changes);
    }

    public async deleteFactoryEmployee(factoryId: number, employeeId: number) {
        return await deleteFactoryEmployee(factoryId, employeeId);
    }
}

export default new EmployeesService(); 
