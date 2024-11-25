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
    customer_id: number | null;
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

interface IFactoryDatabase {
    id: number;
    location_id: number;
    production_target: number;
}

interface IFactoryProductItemDatabase {
    id: number;
    factory_id: number;
    product_id: number;
    quantity: number;
    manufactured_at: Date;
    created_at: Date;
    updated_at: Date;
}

interface IShipmentDatabase {
    id: number;
    factory_id: number;
    branch_id: number;
    shipment_status: "preparing_to_ship" | "in_transit" | "shipped" | "delivered";
    shipped_at: Date | null;
    arrived_at: Date | null;
}

interface IShipmentItemDatabase {
    id: number;
    shipment_id: number;
    factory_product_id: number;
    quantity_shipped: number;
}

interface IEmployeeRoleDatabase {
    id: number;
    name: string;  // "sales_representative" | "inventory_manager" | "factory_manager" | "factory_worker" | "admin"
}

interface IWorkScheduleDatabase {
    id: number;
    shift_type: string;  // "morning" | "afternoon"
    start_time: Date;
    end_time: Date;
}

interface IEmployeeDatabase {
    id: number;
    name: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: Date;
    employment_type: "full_time" | "part_time";
    work_schedule_id: number;
    location_id: number;
    role_id: number;
}
