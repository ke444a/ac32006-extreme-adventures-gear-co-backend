/**
 * Types defined from database schema
 */

interface ILocationDatabase {
    id: number;
    city: string | null;
    address: string;
    location_type: "branch" | "hq" | "factory";
}

interface IEmployeeCredentialsDatabase {
    employee_id: number;
    email: string;
    password_hash: string;
    created_at: Date;
}

interface ICustomerDatabase {
    id: number;
    name: string;
    phone_number: string | null;
    email: string | null;
    address: string | null;
    joined_at: Date;
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

interface IPaymentDatabase {
    id: number;
    payment_type: PaymentType;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    amount: number;
    payment_date: Date;
}

interface IProductDatabase {
    id: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    warranty_duration: number;
    product_category_id: number;
    created_at: Date;
    updated_at: Date;
}
