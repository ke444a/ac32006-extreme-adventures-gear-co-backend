import knex from "@/config/db";
import { FactoryManagerViews } from "@/config/enums";

export const createFactoryProductItem = async (factoryId: number, productId: number, quantity: number) => {
    return await knex(FactoryManagerViews.MODIFY_MANUFACTURED_PRODUCT)
        .insert({
            factory_id: factoryId,
            product_id: productId,
            quantity: quantity,
            manufactured_at: knex.fn.now()
        });
};

export const getAllFactoryProductItems = async (factoryId: number) => {
    return await knex<IFactoryManagerManufacturedProductsView>(FactoryManagerViews.MANUFACTURED_PRODUCTS)
        .where("factory_id", factoryId);
};

export const updateFactoryProductItem = async (factoryProductId: number, factoryProductQuantity: number, manufacturedAt: Date) => {
    return await knex(FactoryManagerViews.MODIFY_MANUFACTURED_PRODUCT)
        .where("id", factoryProductId)
        .update({
            quantity: factoryProductQuantity,
            manufactured_at: manufacturedAt,
            updated_at: knex.fn.now()
        });
};

export const deleteFactoryProductItem = async (factoryProductId: number) => {
    return await knex(FactoryManagerViews.MODIFY_MANUFACTURED_PRODUCT)
        .where("id", factoryProductId)
        .delete();
};
