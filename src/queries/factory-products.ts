import knex from "@/config/db";
import { FactoryManagerViews } from "@/config/enums";

const createFactoryProductItemQuery = async (factoryId: number, productId: number, quantity: number) => {
    return await knex<IFactoryManagerModifyManufacturedProductView>(FactoryManagerViews.MODIFY_MANUFACTURED_PRODUCT)
        .insert({
            factory_id: factoryId,
            product_id: productId,
            quantity: quantity,
            manufactured_at: knex.fn.now()
        });
};

const getAllFactoryProductItemsQuery = async (factoryId: number) => {
    // Accessible by both factory manager and admin
    return await knex<IFactoryManagerManufacturedProductsView | IAdminManufacturedProductsView>(FactoryManagerViews.MANUFACTURED_PRODUCTS)
        .where("factory_id", factoryId);
};

const updateFactoryProductItemQuery = async (factoryProductId: number, factoryProductQuantity: number) => {
    return await knex<IFactoryManagerModifyManufacturedProductView>(FactoryManagerViews.MODIFY_MANUFACTURED_PRODUCT)
        .where("id", factoryProductId)
        .update({
            quantity: factoryProductQuantity,
            updated_at: knex.fn.now()
        });
};

const deleteFactoryProductItemQuery = async (factoryProductId: number) => {
    return await knex<IFactoryManagerModifyManufacturedProductView>(FactoryManagerViews.MODIFY_MANUFACTURED_PRODUCT)
        .where("id", factoryProductId)
        .delete();
};

export {
    createFactoryProductItemQuery,
    getAllFactoryProductItemsQuery,
    updateFactoryProductItemQuery,
    deleteFactoryProductItemQuery
};
