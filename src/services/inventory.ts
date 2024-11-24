import { createNewBranchItem, deleteBranchItem, getBranchItemsByBranch, updateBranchItemQuantity } from "@/queries/inventory";

class InventoryService {
    public async getBranchItemsByBranch(branchId: number) {
        return await getBranchItemsByBranch(branchId);
    }

    public async createNewBranchItem(branchId: number, productId: number, quantity: number) {
        return await createNewBranchItem(branchId, productId, quantity);
    }

    public async updateBranchItemQuantity(branchItemId: number, quantity: number) {
        return await updateBranchItemQuantity(branchItemId, quantity);
    }

    public async deleteBranchItem(branchItemId: number) {
        return await deleteBranchItem(branchItemId);
    }
}

export default new InventoryService();
