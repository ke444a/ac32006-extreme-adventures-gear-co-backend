import { Request, Response } from "express";
import ShipmentsService from "@/services/shipments";
import { ResponseStatus } from "@/config/enums";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const getAllShipmentsByBranch = async (req: Request, res: Response) => {
    try {
        const shipments = await ShipmentsService.getAllShipmentsByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { shipments: convertSnakeCaseToCamel(shipments) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const getUpcomingShipmentsByBranch = async (req: Request, res: Response) => {
    try {
        const shipments = await ShipmentsService.getUpcomingShipmentsByBranch(req.user.branch_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { shipments: convertSnakeCaseToCamel(shipments) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const getAllShipmentsByFactory = async (req: Request, res: Response) => {
    try {
        const shipments = await ShipmentsService.getAllShipmentsByFactory(req.user.factory_id!);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { shipments: convertSnakeCaseToCamel(shipments) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const updateShipmentStatusForBranch = async (req: Request, res: Response) => {
    try {
        const shipmentId = parseInt(req.params.shipmentId);
        const { shipmentStatus } = req.body as { shipmentStatus: ShipmentStatusDB };
        if (!shipmentStatus) {
            res.status(400).json(<APIResponse>{ message: "Shipment status is required", status: ResponseStatus.INVALID_REQUEST_BODY });
            return;
        }

        await ShipmentsService.updateShipmentStatusForBranch(shipmentId, shipmentStatus);
        res.status(200).json(<APIResponse>{ message: "Shipment status updated successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const updateShipmentStatusForFactory = async (req: Request, res: Response) => {
    try {
        const shipmentId = parseInt(req.params.shipmentId);
        const { shipmentStatus, branchId } = req.body as { shipmentStatus: ShipmentStatusDB, branchId: number };
        if (!shipmentStatus || !branchId) {
            res.status(400).json(<APIResponse>{ message: "Missing required fields", status: ResponseStatus.INVALID_REQUEST_BODY });
            return;
        }

        await ShipmentsService.updateShipmentStatusForFactory(shipmentId, shipmentStatus, branchId);
        res.status(200).json(<APIResponse>{ message: "Shipment status updated successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const createShipment = async (req: Request, res: Response) => {
    try {
        const { branchId, shipmentItems } = req.body as RequestBodyPOST["SHIPMENT"];
        if (!branchId || !shipmentItems) {
            res.status(400).json(<APIResponse>{ message: "Missing required fields", status: ResponseStatus.INVALID_REQUEST_BODY });
            return;
        }

        await ShipmentsService.createShipment(req.user.factory_id!, branchId, shipmentItems);
        res.status(200).json(<APIResponse>{ message: "Shipment created successfully", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const deleteShipment = async (req: Request, res: Response) => {
    try {
        const shipmentId = parseInt(req.params.shipmentId);
        await ShipmentsService.deleteShipment(shipmentId);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};
