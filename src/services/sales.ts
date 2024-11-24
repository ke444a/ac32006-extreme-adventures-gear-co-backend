import { createPayment, updatePayment } from "@/queries/payments";
import { getProductsByIds } from "@/queries/products";
import { createCustomer, createPurchase, createPurchaseItems, getAllCustomers, getCustomersByBranch, getAllPurchasesByBranch, getPurchasesByBranchAndEmployee, getAllPurchaseItemsByPurchaseIds, updatePurchase, updatePurchaseItems, deletePurchase, updateCustomer, deleteCustomer } from "@/queries/sales";

class SalesService {
    public async createPurchaseWithExistingCustomer(customerId: number, branchId: number, purchaseItems: IPurchaseItem[], employeeId: number, paymentMethod: PaymentMethod, paymentStatus: PaymentStatus) {
        const storedProducts = await getProductsByIds(purchaseItems.map(item => item.productId));
        const purchaseItemWithPrice = purchaseItems.map(item => {
            const product = storedProducts.find(product => product.id === item.productId);
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            return { ...item, pricePerUnit: product.price };
        });
        const totalPrice = purchaseItemWithPrice.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
        const paymentId = await createPayment("customer", paymentMethod, paymentStatus, totalPrice);
        const purchaseId = await createPurchase(customerId, branchId, employeeId, paymentId, totalPrice);
        await createPurchaseItems(purchaseItemWithPrice, purchaseId);
    }

    public async createPurchaseWithNewCustomer(customer: ICustomer, branchId: number, purchaseItems: IPurchaseItem[], employeeId: number, paymentMethod: PaymentMethod, paymentStatus: PaymentStatus) {
        const storedProducts = await getProductsByIds(purchaseItems.map(item => item.productId));
        const purchaseItemWithPrice = purchaseItems.map(item => {
            const product = storedProducts.find(product => product.id === item.productId);
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            return { ...item, pricePerUnit: product.price };
        });
        const totalPrice = purchaseItemWithPrice.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
        const customerId = await createCustomer(customer);
        const paymentId = await createPayment("customer", paymentMethod, paymentStatus, totalPrice);
        const purchaseId = await createPurchase(customerId, branchId, employeeId, paymentId, totalPrice);
        await createPurchaseItems(purchaseItemWithPrice, purchaseId);
    }

    public async getAllCustomers() {
        return await getAllCustomers();
    }

    public async getCustomersByBranch(branchId: number) {
        return await getCustomersByBranch(branchId);
    }

    public async getAllPurchasesByBranch(branchId: number) {
        const purchases = await getAllPurchasesByBranch(branchId);
        const purchaseItems = await getAllPurchaseItemsByPurchaseIds(purchases.map(purchase => purchase.purchase_id));
        const purchasesWithItems = purchases.map(purchase => {
            return { ...purchase, purchaseItems: purchaseItems.filter(item => item.purchase_id === purchase.purchase_id) };
        });
        return purchasesWithItems;
    }

    public async getPurchasesByBranchAndEmployee(branchId: number, employeeId: number) {
        const purchases = await getPurchasesByBranchAndEmployee(branchId, employeeId);
        const purchaseItems = await getAllPurchaseItemsByPurchaseIds(purchases.map(purchase => purchase.purchase_id));
        const purchasesWithItems = purchases.map(purchase => {
            return { ...purchase, purchaseItems: purchaseItems.filter(item => item.purchase_id === purchase.purchase_id) };
        });
        return purchasesWithItems;
    }

    public async updatePurchase(purchaseId: number, purchaseItems: IPurchaseItem[], paymentStatus: PaymentStatus) {
        const storedProducts = await getProductsByIds(purchaseItems.map(item => item.productId));
        const purchaseItemWithPrice = purchaseItems.map(item => {
            const product = storedProducts.find(product => product.id === item.productId);
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            return { ...item, pricePerUnit: product.price };
        });

        const updatedTotalPrice = purchaseItemWithPrice.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
        await Promise.all([
            updatePayment(purchaseId, paymentStatus),
            updatePurchase(purchaseId, updatedTotalPrice),
            updatePurchaseItems(purchaseItemWithPrice, purchaseId)
        ]);
    }

    public async deletePurchase(purchaseId: number) {
        await deletePurchase(purchaseId);
    }

    public async updateCustomer(customerId: number, customer: ICustomer) {
        await updateCustomer(customerId, customer);
    }

    public async deleteCustomer(customerId: number) {
        await deleteCustomer(customerId);
    }
}

export default new SalesService();
