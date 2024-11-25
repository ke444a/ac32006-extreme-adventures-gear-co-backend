import { 
    createFactoryProductItem,
    getAllFactoryProductItems,
    updateFactoryProductItem,
    deleteFactoryProductItem
} from "@/queries/factory-products";

class FactoryProductsService {
    public async createFactoryProduct(factoryId: number, productId: number, quantity: number) {
        return await createFactoryProductItem(factoryId, productId, quantity);
    }

    public async getAllFactoryProducts(factoryId: number) {
        return await getAllFactoryProductItems(factoryId);
    }

    public async updateFactoryProduct(factoryProductId: number, factoryProductQuantity: number, manufacturedAt: Date) {
        return await updateFactoryProductItem(factoryProductId, factoryProductQuantity, manufacturedAt);
    }

    public async deleteFactoryProduct(factoryProductId: number) {
        return await deleteFactoryProductItem(factoryProductId);
    }
}

export default new FactoryProductsService();
