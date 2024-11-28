import { 
    getAllProductsQuery, 
    getProductCategoriesQuery, 
    updateProductQuery, 
    deleteProductQuery, 
    getProductsByBranchQuery, 
    updateProductPriceQuery
} from "@/queries/products";

class ProductsService {
    public async getAllProducts() {
        return await getAllProductsQuery();
    }

    public async getProductCategories() {
        return await getProductCategoriesQuery();
    }

    public async updateProduct(productId: number, product: RequestBodyPATCH["PRODUCT"]) {
        const updatedProduct: Partial<IAdminModifyProductView> = {
            name: product.name,
            description: product.description,
            price: product.price,
            warranty_duration: product.warrantyDuration,
            product_category_id: product.categoryId
        };
        return await updateProductQuery(productId, updatedProduct);
    }

    public async updateProductPrice(productId: number, price: number) {
        return await updateProductPriceQuery(productId, price);
    }

    public async deleteProduct(productId: number) {
        return await deleteProductQuery(productId);
    }

    public async getProductsByBranch(branchId: number) {
        return await getProductsByBranchQuery(branchId);
    }
}

export default new ProductsService();
