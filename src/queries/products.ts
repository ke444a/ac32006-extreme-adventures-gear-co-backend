import knex from "@/config/db";
import { AdminViews, GlobalViews, SalesRepresentativeViews } from "@/config/enums";

const getProductsByIdsQuery = (ids: number[]) => {
    return knex("product").whereIn("id", ids);
};

const getAllProductsQuery = (price?: "asc" | "desc") => {
    const query = knex<IGlobalAllProductsView>(GlobalViews.ALL_PRODUCTS);
    if (price) {
        query.orderBy("price", price);
    }
    return query;
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

const getProductsByBranchQuery = (branchId: number, price?: "asc" | "desc") => {
    let query = knex<ISalesRepBranchProductsView>(SalesRepresentativeViews.PRODUCTS_IN_BRANCH).where({ branch_id: branchId });
    if (price) {
        query = query.orderBy("price", price);
    }
    return query;
};

const updateProductPriceQuery = (productId: number, price: number) => {
    return knex<ISalesRepModifyProductView>(SalesRepresentativeViews.MODIFY_PRODUCT).where({ id: productId }).update({ price });
};

export { 
    getProductsByIdsQuery,
    getAllProductsQuery,
    getProductCategoriesQuery,
    updateProductQuery,
    deleteProductQuery,
    getProductsByBranchQuery,
    updateProductPriceQuery
};
