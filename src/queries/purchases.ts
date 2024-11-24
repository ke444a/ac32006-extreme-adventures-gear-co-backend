import knex from "@/config/db";

const createPurchase = async (customerId: number, branchId: number, employeeId: number, paymentId: number, totalAmount: number) => {
    const [purchaseId] = await knex("sales_rep_create_purchase_view").insert({
        customer_id: customerId,
        branch_id: branchId,
        employee_id: employeeId,
        payment_id: paymentId,
        total_amount: totalAmount
    });
    return purchaseId;
};

const updatePurchase = async (purchaseId: number, totalAmount: number) => {
    await knex("sales_rep_create_purchase_view").where("id", purchaseId).update({ total_amount: totalAmount });
};

const createPurchaseItems = async (purchaseItems: (IPurchaseItem & { pricePerUnit: number })[], purchaseId: number) => {
    await knex("sales_rep_create_purchase_item_view").insert(purchaseItems.map((item) => ({
        product_id: item.productId,
        purchase_id: purchaseId,
        quantity: item.quantity,
        total_price: item.pricePerUnit * item.quantity
    })));
};

const updatePurchaseItems = async (purchaseItems: (IPurchaseItem & { pricePerUnit: number })[], purchaseId: number) => {
    await knex("sales_rep_create_purchase_item_view").where("purchase_id", purchaseId).update(purchaseItems.map((item) => ({
        quantity: item.quantity,
        total_price: item.pricePerUnit * item.quantity
    })));
};

const getAllPurchasesByBranch = async (branchId: number) => {
    return await knex("sales_rep_purchase_summary_view").where("branch_id", branchId);
};

const getPurchasesByBranchAndEmployee = async (branchId: number, employeeId: number) => {
    return await knex("sales_rep_purchase_summary_view").where("branch_id", branchId).andWhere("sales_rep_id", employeeId);
};

const getAllPurchaseItemsByPurchaseIds = async (purchaseIds: number[]) => {
    return await knex("sales_rep_purchase_detail_view").whereIn("purchase_id", purchaseIds);
};

const deletePurchase = async (purchaseId: number) => {
    await knex("sales_rep_purchase_summary_view").where("id", purchaseId).delete();
};

export {
    createPurchase,
    createPurchaseItems,
    getAllPurchasesByBranch,
    getPurchasesByBranchAndEmployee,
    getAllPurchaseItemsByPurchaseIds,
    updatePurchase,
    updatePurchaseItems,
    deletePurchase
};
