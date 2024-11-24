interface IPurchaseItem {
    productId: number;
    quantity: number;
}

interface IPurchase {
    customerId: number;
    branchId: number;
    employeeId: number;
    paymentId: number;
    totalAmount: number;
    purchaseItems: IPurchaseItem[];
}

interface IPurchaseDatabase {
    id: number;
    customer_id: number;
    branch_id: number;
    employee_id: number;
    payment_id: number;
    total_amount: number;
    purchase_date: Date;
}

interface IPurchaseItemDatabase {
    id: number;
    purchase_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
}

interface ICustomer {
    name: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
}
