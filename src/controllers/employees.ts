import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import EmployeesService from "@/services/employees";


export const getAllFactoryEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await EmployeesService.getEmployeesByLocation(req.user.factory_id!);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS, data: { employees } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const updateFactoryEmployeeDetails = async (req: Request, res: Response) => {
    try {
        const employeeId = parseInt(req.params.employeeId);
        await EmployeesService.updateFactoryEmployeeDetails(req.user.factory_id!, employeeId, req.body as IEmployeeChange);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS });
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

