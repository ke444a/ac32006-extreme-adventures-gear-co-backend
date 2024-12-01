import knex from "@/config/db";
import { AdminViews, SalesRepresentativeViews } from "@/config/enums";

const createPurchaseQuery = async (customerId: number, branchId: number, employeeId: number, paymentId: number, totalAmount: number) => {
    const [purchaseId] = await knex<ISalesRepModifyPurchaseView>(SalesRepresentativeViews.MODIFY_PURCHASE).insert({
        customer_id: customerId,
        branch_id: branchId,
        employee_id: employeeId,
        payment_id: paymentId,
        total_amount: totalAmount
    });
    return purchaseId;
};

const updatePurchaseQuery = async (purchaseId: number, totalAmount: number) => {
    await knex<ISalesRepModifyPurchaseView>(SalesRepresentativeViews.MODIFY_PURCHASE).where("id", purchaseId).update({ total_amount: totalAmount });
};

const createPurchaseItemsQuery = async (purchaseItems: (IPurchaseItem & { pricePerUnit: number })[], purchaseId: number) => {
    await knex<ISalesRepModifyPurchaseItemView>(SalesRepresentativeViews.MODIFY_PURCHASE_ITEM).insert(purchaseItems.map((item) => ({
        product_id: item.productId,
        purchase_id: purchaseId,
        quantity: item.quantity,
        total_price: item.pricePerUnit * item.quantity
    })));
};

const updatePurchaseItemsQuery = async (purchaseItems: (IPurchaseItem & { pricePerUnit: number })[], purchaseId: number) => {
    await knex<ISalesRepModifyPurchaseItemView>(SalesRepresentativeViews.MODIFY_PURCHASE_ITEM).where("purchase_id", purchaseId).update(purchaseItems.map((item) => ({
        quantity: item.quantity,
        total_price: item.pricePerUnit * item.quantity
    })));
};

const getAllPurchasesByLocationQuery = async (locationId: number) => {
    return await knex<IAdminPurchaseSummaryView>(AdminViews.PURCHASE_SUMMARY).where({ location_id: locationId });
};

const getAllPurchasesByBranchQuery = async (branchId: number, price?: "asc" | "desc") => {
    const query = knex<ISalesRepPurchaseSummaryView>(SalesRepresentativeViews.PURCHASE_SUMMARY).where("branch_id", branchId);
    if (price) {
        query.orderBy("total_price", price);
    }
    return query;
};

const getPurchasesByBranchAndEmployeeQuery = async (branchId: number, employeeId: number) => {
    return await knex<ISalesRepPurchaseSummaryView>(SalesRepresentativeViews.PURCHASE_SUMMARY).where("branch_id", branchId).andWhere("sales_rep_id", employeeId);
};

const getAllPurchaseItemsByPurchaseIdsQuery = async (purchaseIds: number[]) => {
    return await knex<ISalesRepPurchaseDetailsView>(SalesRepresentativeViews.PURCHASE_DETAILS).whereIn("purchase_id", purchaseIds);
};

const deletePurchaseQuery = async (purchaseId: number) => {
    await knex<ISalesRepModifyPurchaseView>(SalesRepresentativeViews.MODIFY_PURCHASE).where({ purchase_id: purchaseId }).delete();
};

const getAllPurchasesQuery = async () => {
    return await knex<IAdminAllPurchasesView>(AdminViews.ALL_PURCHASES);
};

export {
    createPurchaseQuery,
    createPurchaseItemsQuery,
    getAllPurchasesByBranchQuery,
    getPurchasesByBranchAndEmployeeQuery,
    getAllPurchaseItemsByPurchaseIdsQuery,
    updatePurchaseQuery,
    updatePurchaseItemsQuery,
    deletePurchaseQuery,
    getAllPurchasesQuery,
    getAllPurchasesByLocationQuery
};
