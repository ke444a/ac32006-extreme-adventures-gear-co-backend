import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import CustomersService from "@/services/customers";

export const getAllCustomers = async (_req: Request, res: Response) => {
    try {
        const customers = await CustomersService.getAllCustomers();
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { customers } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const getCustomersByBranch = async (req: Request, res: Response) => {
    try {
        const customers = await CustomersService.getCustomersByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { customers } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { customerId } = req.params as { customerId: string };
        const { name, phoneNumber, email, address } = req.body as ICustomer;
        if (!name) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Invalid request body" });
            return;
        }

        await CustomersService.updateCustomer(parseInt(customerId), { name, phoneNumber, email, address });
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Customer updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { customerId } = req.params as { customerId: string };
        await CustomersService.deleteCustomer(parseInt(customerId));
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Customer deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};
