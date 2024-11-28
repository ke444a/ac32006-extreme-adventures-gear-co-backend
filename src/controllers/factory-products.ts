import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import FactoryProductsService from "@/services/factory-products";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const createFactoryProduct = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        await FactoryProductsService.createFactoryProduct(req.user.factory_id!, productId, quantity);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};


export const getAllFactoryProducts = async (req: Request, res: Response) => {
    try {
        const products = await FactoryProductsService.getAllFactoryProducts(req.user.factory_id!);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS, data: { factoryProducts: convertSnakeCaseToCamel(products) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const updateFactoryProduct = async (req: Request, res: Response) => {
    try {
        const { factoryProductQuantity } = req.body;
        if (!factoryProductQuantity) {
            res.status(400).json(<APIResponse>{ message: "Factory product quantity is required", status: ResponseStatus.INVALID_REQUEST_BODY });
            return;
        }

        const factoryProductId = parseInt(req.params.factoryProductId);
        await FactoryProductsService.updateFactoryProduct(factoryProductId, factoryProductQuantity);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

export const deleteFactoryProduct = async (req: Request, res: Response) => {
    try {
        const factoryProductId = parseInt(req.params.factoryProductId);
        await FactoryProductsService.deleteFactoryProduct(factoryProductId);
        res.status(200).json(<APIResponse>{ message: "", status: ResponseStatus.SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ message: "Internal server error", status: ResponseStatus.INTERNAL_SERVER_ERROR });
    }
};

