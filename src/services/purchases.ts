import { 
    createPaymentForPurchaseQuery, 
    getPaymentIdByPurchaseQuery, 
    updatePaymentForPurchaseQuery 
} from "@/queries/payments";
import { getProductsByIdsQuery } from "@/queries/products";
import { 
    createPurchaseQuery, 
    createPurchaseItemsQuery, 
    getAllPurchasesByBranchQuery, 
    getPurchasesByBranchAndEmployeeQuery, 
    getAllPurchaseItemsByPurchaseIdsQuery, 
    updatePurchaseQuery, 
    updatePurchaseItemsQuery, 
    deletePurchaseQuery,
    getAllPurchasesQuery
} from "@/queries/purchases";
import { createCustomerQuery } from "@/queries/customers";


class PurchasesService {
    public async createPurchaseWithExistingCustomer(
        customerId: number, 
        branchId: number, 
        purchaseItems: IPurchaseItem[], 
        employeeId: number, 
        paymentMethod: PaymentMethodDB, 
        paymentStatus: PaymentStatusDB
    ) {
        const storedProducts = await getProductsByIdsQuery(purchaseItems.map(item => item.productId));
        const purchaseItemWithPrice = purchaseItems.map(item => {
            const product = storedProducts.find(product => Number(product.id) === Number(item.productId));
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            return { ...item, pricePerUnit: product.price };
        });
        const totalPrice = purchaseItemWithPrice.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
        const paymentId = await createPaymentForPurchaseQuery("customer", paymentMethod, paymentStatus, totalPrice);
        const purchaseId = await createPurchaseQuery(customerId, branchId, employeeId, paymentId, totalPrice);
        await createPurchaseItemsQuery(purchaseItemWithPrice, purchaseId);
    }

    public async createPurchaseWithNewCustomer(
        customer: RequestBodyPOST["CUSTOMER"], 
        branchId: number, 
        purchaseItems: IPurchaseItem[], 
        employeeId: number, 
        paymentMethod: PaymentMethodDB, 
        paymentStatus: PaymentStatusDB
    ) {
        const storedProducts = await getProductsByIdsQuery(purchaseItems.map(item => item.productId));
        const purchaseItemWithPrice = purchaseItems.map(item => {
            const product = storedProducts.find(product => Number(product.id) === Number(item.productId));
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            return { ...item, pricePerUnit: product.price };
        });
        const totalPrice = purchaseItemWithPrice.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
        const customerId = await createCustomerQuery(customer);
        const paymentId = await createPaymentForPurchaseQuery("customer", paymentMethod, paymentStatus, totalPrice);
        const purchaseId = await createPurchaseQuery(customerId, branchId, employeeId, paymentId, totalPrice);
        await createPurchaseItemsQuery(purchaseItemWithPrice, purchaseId);
    }

    public async getAllPurchasesByBranch(branchId: number, price?: "asc" | "desc") {
        const purchases = await getAllPurchasesByBranchQuery(branchId, price);
        const purchaseItems = await getAllPurchaseItemsByPurchaseIdsQuery(purchases.map(purchase => purchase.purchase_id));
        const purchasesWithItems = purchases.map(purchase => {
            return { ...purchase, items: purchaseItems.filter(item => Number(item.purchase_id) === Number(purchase.purchase_id)) };
        });
        return purchasesWithItems;
    }

    public async getPurchasesByBranchAndEmployee(branchId: number, employeeId: number) {
        const purchases = await getPurchasesByBranchAndEmployeeQuery(branchId, employeeId);
        const purchaseItems = await getAllPurchaseItemsByPurchaseIdsQuery(purchases.map(purchase => purchase.purchase_id));
        const purchasesWithItems = purchases.map(purchase => {
            return { ...purchase, items: purchaseItems.filter(item => Number(item.purchase_id) === Number(purchase.purchase_id)) };
        });
        return purchasesWithItems;
    }

    public async getAllPurchases() {
        const purchases = await getAllPurchasesQuery();
        const purchaseItems = await getAllPurchaseItemsByPurchaseIdsQuery(purchases.map(purchase => purchase.purchase_id));
        const purchasesWithItems = purchases.map(purchase => {
            return { ...purchase, items: purchaseItems.filter(item => Number(item.purchase_id) === Number(purchase.purchase_id)) };
        });
        return purchasesWithItems;
    }

    public async updatePurchase(purchaseId: number, purchaseItems: IPurchaseItem[], paymentStatus: PaymentStatusDB) {
        const storedProducts = await getProductsByIdsQuery(purchaseItems.map(item => item.productId));
        const purchaseItemWithPrice = purchaseItems.map(item => {
            const product = storedProducts.find(product => Number(product.id) === Number(item.productId));
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            return { ...item, pricePerUnit: product.price };
        });

        const updatedTotalPrice = purchaseItemWithPrice.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
        await Promise.all([
            updatePaymentForPurchaseQuery(purchaseId, paymentStatus),
            updatePurchaseQuery(purchaseId, updatedTotalPrice),
            updatePurchaseItemsQuery(purchaseItemWithPrice, purchaseId)
        ]);
    }

    public async deletePurchase(purchaseId: number) {
        await deletePurchaseQuery(purchaseId);
    }

    public async updatePurchaseStatus(purchaseId: number, paymentStatus: PaymentStatusDB) {
        const paymentId = await getPaymentIdByPurchaseQuery(purchaseId);
        await updatePaymentForPurchaseQuery(paymentId, paymentStatus);
    }
}

export default new PurchasesService();
