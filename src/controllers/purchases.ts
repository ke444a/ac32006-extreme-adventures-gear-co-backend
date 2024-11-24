import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import SalesService from "@/services/purchases";

export const createPurchaseWithExistingCustomer = async (req: Request, res: Response) => {
    try {
        const { customerId, purchaseItems, paymentMethod, paymentStatus } = req.body as { customerId: number, purchaseItems: IPurchaseItem[], paymentMethod: PaymentMethod, paymentStatus: PaymentStatus };
        if (!req.user.branch_id) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Given employee is not assigned to any branch" });
            return;
        }
        if (req.user.role !== "sales_representative") {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.ACCESS_DENIED_EMPLOYEE, message: "Given employee is not a sales rep" });
            return;
        }
        if (!customerId || !purchaseItems || !paymentMethod || !paymentStatus) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Invalid request body" });
            return;
        }

        await SalesService.createPurchaseWithExistingCustomer(customerId, req.user.branch_id, purchaseItems, req.user.id, paymentMethod, paymentStatus);
        res.status(201).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};


export const createPurchaseWithNewCustomer = async (req: Request, res: Response) => {
    try {
        const { customer, purchaseItems, paymentMethod, paymentStatus } = req.body as { customer: ICustomer, purchaseItems: IPurchaseItem[], paymentMethod: PaymentMethod, paymentStatus: PaymentStatus };
        if (!req.user.branch_id) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Given employee is not assigned to any branch" });
            return;
        }
        if (req.user.role !== "sales_representative") {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.ACCESS_DENIED_EMPLOYEE, message: "Given employee is not a sales rep" });
            return;
        }
        if (!customer || !customer.name || !purchaseItems || !paymentMethod || !paymentStatus) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Invalid request body" });
            return;
        }

        await SalesService.createPurchaseWithNewCustomer(customer, req.user.branch_id, purchaseItems, req.user.id, paymentMethod, paymentStatus);
        res.status(201).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const getAllPurchasesByBranch = async (req: Request, res: Response) => {
    try {
        const purchases = await SalesService.getAllPurchasesByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { purchases } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const getPurchasesByBranchAndEmployee = async (req: Request, res: Response) => {
    try {
        const purchases = await SalesService.getPurchasesByBranchAndEmployee(req.user.branch_id!, req.user.id);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { purchases } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const updatePurchase = async (req: Request, res: Response) => {
    try {
        const { purchaseId } = req.params as { purchaseId: string };
        const { purchaseItems, paymentStatus } = req.body as { purchaseItems: IPurchaseItem[], paymentStatus: PaymentStatus };
        if (!purchaseItems || !paymentStatus) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Invalid request body" });
            return;
        }

        await SalesService.updatePurchase(parseInt(purchaseId), purchaseItems, paymentStatus);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const deletePurchase = async (req: Request, res: Response) => {
    try {
        const { purchaseId } = req.params as { purchaseId: string };
        await SalesService.deletePurchase(parseInt(purchaseId));
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};


