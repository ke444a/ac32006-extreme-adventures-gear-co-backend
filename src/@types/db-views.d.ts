/**
 * Views created for sales representatives
 */

// View for customer details from sales rep perspective
interface ISalesRepCustomerView {
    customer_id: number;
    customer_name: string;
    phone_number: string | null;
    email: string | null;
    address: string | null;
    joined_at: Date;
    last_purchase_date: Date;
    total_purchases: number;
    branch_id?: number;
} 

// View for purchase details from sales rep perspective
interface ISalesRepPurchaseSummaryView {
    purchase_id: number;
    customer_name: string;
    customer_email: string | null;
    total_price: number;
    payment_status: PaymentStatus;
    purchase_date: Date;
    branch_id: number;
    sales_rep_id: number;
    sales_rep_name: string;
}

interface ISalesRepPurchaseDetailView {
    purchase_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price_per_purchase_item: number;
    branch_id: number;
    sales_rep_id: number;
}
