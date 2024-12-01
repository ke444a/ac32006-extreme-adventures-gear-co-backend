import { 
    getAllProductsQuery, 
    getProductCategoriesQuery, 
    updateProductQuery, 
    deleteProductQuery, 
    getProductsByBranchQuery, 
    updateProductPriceQuery
} from "@/queries/products";

class ProductsService {
    public async getAllProducts(price?: "asc" | "desc") {
        return await getAllProductsQuery(price);
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

    public async getProductsByBranch(branchId: number, price?: "asc" | "desc") {
        return await getProductsByBranchQuery(branchId, price);
    }
}

export default new ProductsService();
