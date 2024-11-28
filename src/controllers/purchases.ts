import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import PurchasesService from "@/services/purchases";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const createPurchaseWithExistingCustomer = async (req: Request, res: Response) => {
    try {
        const { customerId, purchaseItems, paymentMethod, paymentStatus } = req.body as RequestBodyPOST["PURCHASE_WITH_EXISTING_CUSTOMER"];
        if (!customerId || !purchaseItems || !paymentMethod || !paymentStatus) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Missing required fields" });
            return;
        }

        await PurchasesService.createPurchaseWithExistingCustomer(customerId, req.user.branch_id!, purchaseItems, req.user.id, paymentMethod, paymentStatus);
        res.status(201).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};


export const createPurchaseWithNewCustomer = async (req: Request, res: Response) => {
    try {
        const { customer, purchaseItems, paymentMethod, paymentStatus } = req.body as RequestBodyPOST["PURCHASE_WITH_NEW_CUSTOMER"];
        if (!customer || !customer.name || !purchaseItems || !paymentMethod || !paymentStatus) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Missing required fields" });
            return;
        }

        await PurchasesService.createPurchaseWithNewCustomer(customer, req.user.branch_id!, purchaseItems, req.user.id, paymentMethod, paymentStatus);
        res.status(201).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const getAllPurchasesByBranch = async (req: Request, res: Response) => {
    try {
        const purchases = await PurchasesService.getAllPurchasesByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { purchases: convertSnakeCaseToCamel(purchases) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const getPurchasesByBranchAndEmployee = async (req: Request, res: Response) => {
    try {
        const purchases = await PurchasesService.getPurchasesByBranchAndEmployee(req.user.branch_id!, req.user.id);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { purchases: convertSnakeCaseToCamel(purchases) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const updatePurchase = async (req: Request, res: Response) => {
    try {
        const purchaseId = parseInt(req.params.purchaseId);
        const { purchaseItems, paymentStatus } = req.body as RequestBodyPATCH["PURCHASE"];
        if (!purchaseItems || !paymentStatus) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Missing required fields" });
            return;
        }

        await PurchasesService.updatePurchase(purchaseId, purchaseItems, paymentStatus);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const deletePurchase = async (req: Request, res: Response) => {
    try {
        const purchaseId = parseInt(req.params.purchaseId);
        await PurchasesService.deletePurchase(purchaseId);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

export const getAllPurchases = async (_req: Request, res: Response) => {
    try {
        const purchases = await PurchasesService.getAllPurchases();
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { purchases: convertSnakeCaseToCamel(purchases) } });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
}; 

export const updatePurchaseStatus = async (req: Request, res: Response) => {
    try {
        const purchaseId = parseInt(req.params.purchaseId);
        const { paymentStatus } = req.body as { paymentStatus: PaymentStatusDB };
        if (!paymentStatus) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Missing required fields" });
            return;
        }

        await PurchasesService.updatePurchaseStatus(purchaseId, paymentStatus);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Purchase payment status updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: "error", message: "Internal server error" });
    }
};

