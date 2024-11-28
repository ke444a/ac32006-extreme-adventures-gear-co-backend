import { Request, Response } from "express";
import ProductsService from "@/services/products";
import { ResponseStatus } from "@/config/enums";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await ProductsService.getAllProducts();
        res.status(200).json({ status: ResponseStatus.SUCCESS, data: { products: convertSnakeCaseToCamel(products) } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const getProductsByBranch = async (req: Request, res: Response) => {
    try {
        const products = await ProductsService.getProductsByBranch(req.user.branch_id!);
        res.status(200).json({ status: ResponseStatus.SUCCESS, data: { products: convertSnakeCaseToCamel(products) } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const getProductCategories = async (_req: Request, res: Response) => {
    try {
        const productCategories = await ProductsService.getProductCategories();
        res.status(200).json({ status: ResponseStatus.SUCCESS, data: { productCategories: convertSnakeCaseToCamel(productCategories) } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.productId);
        const product = req.body as RequestBodyPATCH["PRODUCT"];
        const REQUIRED_FIELDS = ["name", "description", "price", "warrantyDuration", "categoryId"];
        if (!REQUIRED_FIELDS.every((field) => field in product)) {
            res.status(400).json({ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Invalid product data" });
            return;
        }
        
        await ProductsService.updateProduct(productId, product);
        res.status(200).json({ status: ResponseStatus.SUCCESS, message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const updateProductPrice = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.productId);
        const { price } = req.body;
        if (!price) {
            res.status(400).json({ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Invalid product data" });
            return;
        }

        await ProductsService.updateProductPrice(productId, price);
        res.status(200).json({ status: ResponseStatus.SUCCESS, message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.productId);
        await ProductsService.deleteProduct(productId);
        res.status(200).json({ status: ResponseStatus.SUCCESS, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};
