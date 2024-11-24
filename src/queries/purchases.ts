import knex from "@/config/db";
import { SalesRepresentativeViews } from "@/config/enums";

const createPurchase = async (customerId: number, branchId: number, employeeId: number, paymentId: number, totalAmount: number) => {
    const [purchaseId] = await knex(SalesRepresentativeViews.MODIFY_PURCHASE).insert({
        customer_id: customerId,
        branch_id: branchId,
        employee_id: employeeId,
        payment_id: paymentId,
        total_amount: totalAmount
    });
    return purchaseId;
};

const updatePurchase = async (purchaseId: number, totalAmount: number) => {
    await knex(SalesRepresentativeViews.MODIFY_PURCHASE).where("id", purchaseId).update({ total_amount: totalAmount });
};

const createPurchaseItems = async (purchaseItems: (IPurchaseItem & { pricePerUnit: number })[], purchaseId: number) => {
    await knex(SalesRepresentativeViews.MODIFY_PURCHASE_ITEM).insert(purchaseItems.map((item) => ({
        product_id: item.productId,
        purchase_id: purchaseId,
        quantity: item.quantity,
        total_price: item.pricePerUnit * item.quantity
    })));
};

const updatePurchaseItems = async (purchaseItems: (IPurchaseItem & { pricePerUnit: number })[], purchaseId: number) => {
    await knex(SalesRepresentativeViews.MODIFY_PURCHASE_ITEM).where("purchase_id", purchaseId).update(purchaseItems.map((item) => ({
        quantity: item.quantity,
        total_price: item.pricePerUnit * item.quantity
    })));
};

const getAllPurchasesByBranch = async (branchId: number) => {
    return await knex(SalesRepresentativeViews.PURCHASE_SUMMARY).where("branch_id", branchId);
};

const getPurchasesByBranchAndEmployee = async (branchId: number, employeeId: number) => {
    return await knex(SalesRepresentativeViews.PURCHASE_SUMMARY).where("branch_id", branchId).andWhere("sales_rep_id", employeeId);
};

const getAllPurchaseItemsByPurchaseIds = async (purchaseIds: number[]) => {
    return await knex(SalesRepresentativeViews.PURCHASE_DETAILS).whereIn("purchase_id", purchaseIds);
};

const deletePurchase = async (purchaseId: number) => {
    await knex(SalesRepresentativeViews.PURCHASE_SUMMARY).where("id", purchaseId).delete();
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
