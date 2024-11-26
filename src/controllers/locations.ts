import { Request, Response } from "express";
import LocationsService from "@/services/locations";
import { ResponseStatus } from "@/config/enums";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const getAllLocations = async (_req: Request, res: Response) => {
    try {
        const locations = await LocationsService.getAllLocations();
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { locations: convertSnakeCaseToCamel(locations) } });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const getBranchDetails = async (req: Request, res: Response) => {
    try {
        const locationId = parseInt(req.params.locationId);
        const branchDetails = await LocationsService.getBranchDetails(locationId);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { branch: convertSnakeCaseToCamel(branchDetails) } });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const updateBranchDetails = async (req: Request, res: Response) => {
    try {
        const branchId = parseInt(req.params.branchId);
        const { salesTarget } = req.body as { salesTarget: number };
        await LocationsService.updateBranchDetails(branchId, salesTarget);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Branch details updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const updateFactoryDetails = async (req: Request, res: Response) => {
    try {
        const factoryId = parseInt(req.params.factoryId);
        const { productionTarget } = req.body as { productionTarget: number };
        await LocationsService.updateFactoryDetails(factoryId, productionTarget);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Factory production target updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};
