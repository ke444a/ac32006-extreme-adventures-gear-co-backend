import { 
    createFactoryProductItemQuery,
    getAllFactoryProductItemsQuery,
    updateFactoryProductItemQuery,
    deleteFactoryProductItemQuery
} from "@/queries/factory-products";

class FactoryProductsService {
    public async createFactoryProduct(factoryId: number, productId: number, quantity: number) {
        return await createFactoryProductItemQuery(factoryId, productId, quantity);
    }

    public async getAllFactoryProducts(factoryId: number) {
        return await getAllFactoryProductItemsQuery(factoryId);
    }

    public async updateFactoryProduct(factoryProductId: number, factoryProductQuantity: number, manufacturedAt: Date) {
        return await updateFactoryProductItemQuery(factoryProductId, factoryProductQuantity, manufacturedAt);
    }

    public async deleteFactoryProduct(factoryProductId: number) {
        return await deleteFactoryProductItemQuery(factoryProductId);
    }
}

export default new FactoryProductsService();
