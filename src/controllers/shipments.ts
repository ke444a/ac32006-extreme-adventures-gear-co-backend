import { Request, Response } from "express";
import ShipmentsService from "@/services/shipments";
import { ResponseStatus } from "@/config/enums";

export const getAllShipmentsByBranch = async (req: Request, res: Response) => {
    try {
        const shipments = await ShipmentsService.getAllShipmentsByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS, data: { shipments } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const getUpcomingShipmentsByBranch = async (req: Request, res: Response) => {
    try {
        const shipments = await ShipmentsService.getUpcomingShipmentsByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS, data: { shipments } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const updateShipmentStatus = async (req: Request, res: Response) => {
    try {
        const shipmentId = parseInt(req.params.shipmentId);
        const { shipmentStatus } = req.body;
        if (!shipmentStatus) {
            res.status(400).json(<APIResponse>{ message: "Shipment status is required", status: ResponseStatus.INVALID_REQUEST_BODY });
            return;
        }

        await ShipmentsService.updateShipmentStatus(shipmentId, shipmentStatus);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};
