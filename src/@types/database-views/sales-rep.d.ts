/**
 * Views accessible to sales representative
 */

/**
 * View for all customers
 */
interface ISalesRepAllCustomersView {
    customer_id: number;
    customer_name: string;
    phone_number: string | null;
    email: string | null;
    address: string | null;
    joined_at: Date;
    last_purchase_date: Date | null;
    total_purchases: number;
}

/**
 * View for all customers in a specific branch
 */
interface ISalesRepBranchCustomersView extends ISalesRepAllCustomersView {
    branch_id: number;
}

/**
 * View for all purchases in a specific branch
 */
interface ISalesRepPurchaseSummaryView {
    id: number;
    customer_name: string | null;
    customer_email: string | null;
    total_price: number;
    payment_status: PaymentStatusDB;
    purchase_date: Date;
    branch_id: number;
    sales_rep_id: number;
    sales_rep_name: string;
}

/**
 * View for purchase details
 */
interface ISalesRepPurchaseDetailsView {
    purchase_id: number;
    product_id: number | null;
    product_name: string | null;
    quantity: number;
    price_per_purchase_item: number;
    branch_id: number;
    sales_rep_id: number;
}

/**
 * View for modifying customer details
 */
interface ISalesRepModifyCustomerView {
    id: number;
    name: string;
    phone_number: string | null;
    email: string | null;
    address: string | null;
}

/**
 * View for modifying payment details
 */
interface ISalesRepModifyPaymentView {
    id: number;
    payment_type: PaymentType;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    amount: number;
}

/**
 * View for modifying purchase details
 */
interface ISalesRepModifyPurchaseView {
    customer_id: number | null;
    branch_id: number;
    employee_id: number | null;
    payment_id: number;
    total_amount: number;
}

/**
 * View for modifying purchase items details
 */
interface ISalesRepModifyPurchaseItemView {
    purchase_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
}

/**
 * View for modifying product details
 */
interface ISalesRepModifyProductView {
    id: number;
    name: string;
    description: string;
    warranty_duration: number;
}

/**
 * View for all products in a specific branch
 */
interface ISalesRepBranchProductsView {
    product_id: number;
    name: string;
    description: string;
    image_url: string | null;
    price: number;
    warranty_duration: number;
    branch_id: number;
    updated_at: Date;
}
