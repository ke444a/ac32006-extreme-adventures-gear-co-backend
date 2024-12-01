import { Request, Response } from "express";
import InventoryService from "@/services/inventory";
import { ResponseStatus } from "@/config/enums";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const getBranchItemsByBranch = async (req: Request, res: Response) => {
    try {
        const quantity = req.query.quantity as "asc" | "desc";
        const category = req.query.category ? parseInt(req.query.category as string) : undefined;
        const branchItems = await InventoryService.getBranchItemsByBranch(req.user.branch_id!, quantity, category);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS, data: { branchItems: convertSnakeCaseToCamel(branchItems) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const createNewBranchItem = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            res.status(400).json(<APIResponse>{ message: "Missing required fields", status: ResponseStatus.INVALID_REQUEST_BODY });
            return;
        }
        await InventoryService.createNewBranchItem(req.user.branch_id!, productId, quantity);
        res.status(200).json(<APIResponse>{ message: "Branch item created successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const updateBranchItemQuantity = async (req: Request, res: Response) => {
    try {
        const branchItemId = parseInt(req.params.branchItemId);
        const { quantity } = req.body;
        if (quantity === undefined || quantity === null) {
            res.status(400).json(<APIResponse>{ message: "Missing required fields", status: ResponseStatus.INVALID_REQUEST_BODY });
            return;
        }
        await InventoryService.updateBranchItemQuantity(branchItemId, quantity);
        res.status(200).json(<APIResponse>{ message: "Branch item quantity updated successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const deleteBranchItem = async (req: Request, res: Response) => {
    try {
        const branchItemId = parseInt(req.params.branchItemId);
        await InventoryService.deleteBranchItem(branchItemId);
        res.status(200).json(<APIResponse>{ message: "Branch item deleted successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};
