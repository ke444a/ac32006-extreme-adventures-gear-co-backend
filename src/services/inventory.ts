import { 
    createNewBranchItemQuery, 
    deleteBranchItemQuery, 
    getBranchItemsByBranchQuery, 
    updateBranchItemQuantityQuery 
} from "@/queries/inventory";

class InventoryService {
    public async getBranchItemsByBranch(branchId: number, quantity?: "asc" | "desc", category?: number) {
        return await getBranchItemsByBranchQuery(branchId, quantity, category);
    }

    public async createNewBranchItem(branchId: number, productId: number, quantity: number) {
        return await createNewBranchItemQuery(branchId, productId, quantity);
    }

    public async updateBranchItemQuantity(branchItemId: number, quantity: number) {
        return await updateBranchItemQuantityQuery(branchItemId, quantity);
    }

    public async deleteBranchItem(branchItemId: number) {
        return await deleteBranchItemQuery(branchItemId);
    }
}

export default new InventoryService();
