import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import EmployeesService from "@/services/employees";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const getAllFactoryEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await EmployeesService.getFactoryEmployeesByFactoryId(req.user.factory_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { employees: convertSnakeCaseToCamel(employees) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const updateFactoryEmployeeDetails = async (req: Request, res: Response) => {
    try {
        const employeeId = parseInt(req.params.employeeId);
        await EmployeesService.updateFactoryEmployeeDetails(req.user.factory_id!, employeeId, req.body as RequestBodyPATCH["EMPLOYEE"]);
        res.status(200).json(<APIResponse>{ message: "Employee details updated successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const deleteFactoryEmployee = async (req: Request, res: Response) => {
    try {
        await EmployeesService.deleteFactoryEmployee(req.user.factory_id!, parseInt(req.params.employeeId));
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const getEmployeesByLocationId = async (req: Request, res: Response) => {
    try {
        const locationId = parseInt(req.params.locationId);
        const employees = await EmployeesService.getEmployeesByLocationId(locationId);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { employees: convertSnakeCaseToCamel(employees) }});
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const getAllEmployees = async (_req: Request, res: Response) => {
    try {
        const employees = await EmployeesService.getAllEmployees();
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { employees: convertSnakeCaseToCamel(employees) }});
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{
            status: ResponseStatus.INTERNAL_SERVER_ERROR,
            message: "Internal server error"
        });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { locationId, role, ...employeeData } = req.body as { locationId: number } & RequestBodyPOST["EMPLOYEE"];
        const REQUIRED_FIELDS = ["name", "phoneNumber", "age", "salary", "employmentType", "workScheduleType"];
        if (!locationId || !role || REQUIRED_FIELDS.some(field => !(field in employeeData))) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Invalid request body" });
            return;
        }
        await EmployeesService.createEmployee(req.body);
        res.status(201).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Employee created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const updateEmployeeDetails = async (req: Request, res: Response) => {
    try {
        const employeeId = parseInt(req.params.employeeId);
        const { locationId, ...employeeData } = req.body as { locationId?: number } & RequestBodyPATCH["EMPLOYEE"];
        await EmployeesService.updateEmployee(employeeId, employeeData, locationId);
        res.status(200).json(<APIResponse>{ message: "Employee details updated successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        await EmployeesService.deleteEmployee(parseInt(req.params.employeeId));
        res.status(200).json(<APIResponse>{ message: "Employee deleted successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};
