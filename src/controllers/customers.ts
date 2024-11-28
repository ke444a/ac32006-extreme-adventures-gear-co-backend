import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import CustomersService from "@/services/customers";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const getAllCustomers = async (_req: Request, res: Response) => {
    try {
        const customers = await CustomersService.getAllCustomers();
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { customers: convertSnakeCaseToCamel(customers) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const getCustomersByBranch = async (req: Request, res: Response) => {
    try {
        const customers = await CustomersService.getCustomersByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { customers: convertSnakeCaseToCamel(customers) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.customerId);
        await CustomersService.updateCustomer(customerId, req.body as RequestBodyPATCH["CUSTOMER"]);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Customer updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.customerId);
        await CustomersService.deleteCustomer(customerId);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Customer deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};
