import knex from "@/config/db";
import { InventoryManagerViews } from "@/config/enums";

export const getBranchItemsByBranchQuery = async (branchId: number, quantity?: "asc" | "desc", category?: number) => {
    return await knex<IInventoryManagerBranchItemsInBranchView>(InventoryManagerViews.BRANCH_ITEMS_IN_BRANCH).where("branch_id", branchId).modify(query => {
        if (category) {
            query.where("product_category_id", category);
        }
        if (quantity) {
            query.orderBy("quantity", quantity);
        }
    });
};

export const createNewBranchItemQuery = async (branchId: number, productId: number, quantity: number) => {
    return await knex<IInventoryManagerModifyBranchItemView>(InventoryManagerViews.MODIFY_BRANCH_ITEM).insert({ 
        branch_id: branchId, 
        product_id: productId, 
        quantity: quantity 
    });
};

export const updateBranchItemQuantityQuery = async (branchItemId: number, quantity: number) => {
    return await knex<IInventoryManagerModifyBranchItemView>(InventoryManagerViews.MODIFY_BRANCH_ITEM)
        .where("id", branchItemId)
        .update({ 
            quantity: quantity,
            ...(quantity > 0 ? { updated_at: knex.fn.now() } : {})
        });
};

export const deleteBranchItemQuery = async (branchItemId: number) => {
    return await knex<IInventoryManagerModifyBranchItemView>(InventoryManagerViews.MODIFY_BRANCH_ITEM).where("id", branchItemId).delete();
};
