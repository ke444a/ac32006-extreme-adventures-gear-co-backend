import knex from "@/config/db";
import { AdminViews, GlobalViews } from "@/config/enums";

const getProductsByIdsQuery = (ids: number[]) => {
    return knex("product").whereIn("id", ids);
};

const getAllProductsQuery = () => {
    return knex<IAdminAllProductsView>(AdminViews.ALL_PRODUCTS);
};

const getProductCategoriesQuery = () => {
    return knex<IGlobalProductCategoriesView>(GlobalViews.PRODUCT_CATEGORIES);
};

const updateProductQuery = (productId: number, product: Partial<IAdminModifyProductView>) => {
    return knex<IAdminModifyProductView>(AdminViews.MODIFY_PRODUCT).where("id", productId).update(product);
};

const deleteProductQuery = (productId: number) => {
    return knex<IAdminModifyProductView>(AdminViews.MODIFY_PRODUCT).where("id", productId).delete();
};

export { 
    getProductsByIdsQuery,
    getAllProductsQuery,
    getProductCategoriesQuery,
    updateProductQuery,
    deleteProductQuery
};
