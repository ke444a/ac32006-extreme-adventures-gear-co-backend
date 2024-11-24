import knex from "@/config/db";
import { InventoryManagerViews } from "@/config/enums";

export const getBranchItemsByBranch = async (branchId: number) => {
    return await knex<IInventoryManagerBranchItemsView>(InventoryManagerViews.ALL_BRANCH_ITEMS_IN_BRANCH).where("branch_id", branchId);
};

export const createNewBranchItem = async (branchId: number, productId: number, quantity: number) => {
    return await knex(InventoryManagerViews.MODIFY_BRANCH_ITEM).insert({ 
        branch_id: branchId, 
        product_id: productId, 
        quantity: quantity 
    });
};

export const updateBranchItemQuantity = async (branchItemId: number, quantity: number) => {
    return await knex(InventoryManagerViews.MODIFY_BRANCH_ITEM).where("id", branchItemId).update({ quantity: quantity });
};

export const deleteBranchItem = async (branchItemId: number) => {
    return await knex(InventoryManagerViews.MODIFY_BRANCH_ITEM).where("id", branchItemId).delete();
};
