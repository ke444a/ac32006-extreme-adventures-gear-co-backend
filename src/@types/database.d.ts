/**
 * Types defined from database tables
 */

type LocationTypeDB = "branch" | "hq" | "factory";

interface ILocationDB {
    id: number;
    city: string | null;
    address: string;
    location_type: LocationTypeDB;
}

interface IEmployeeRoleDB {
    id: number;
    name: string;
}

type WorkScheduleTypeDB = "morning" | "afternoon";

interface IWorkScheduleDB {
    id: number;
    shift_type: WorkScheduleTypeDB;
    start_time: Date;
    end_time: Date;
}

interface IFactoryDB {
    id: number;
    location_id: number;
    production_target: number;
}

interface IBranchDB {
    id: number;
    name: string;
    sales_target: number;
    location_id: number;
}

interface IProductCategoryDB {
    id: number;
    name: string;
}

interface IProductDB {
    id: number;
    name: string;
    description: string;
    image_url: string | null;
    price: number;
    warranty_duration: number;
    created_at: Date;
    updated_at: Date;
    product_category_id: number;
}

interface IBranchItemDB {
    id: number;
    branch_id: number;
    product_id: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}

interface IFactoryProductItemDB {
    id: number;
    factory_id: number;
    product_id: number;
    quantity: number;
    manufactured_at: Date;
    created_at: Date;
    updated_at: Date;
}

type EmploymentTypeDB = "full_time" | "part_time";

interface IEmployeeDB {
    id: number;
    name: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: Date;
    employment_type: EmploymentTypeDB;
    work_schedule_id: number;
    location_id: number;
    role_id: number;
}

interface IEmployeeCredentialsDB {
    employee_id: number;
    email: string;
    password_hash: string;
    created_at: Date;
}

interface ICustomerDB {
    id: number;
    name: string;
    phone_number: string | null;
    email: string | null;
    address: string | null;
    joined_at: Date;
}

type PaymentTypeDB = "customer" | "payroll";
type PaymentMethodDB = "cash" | "card" | "bank_transfer" | "cheque";
type PaymentStatusDB = "pending" | "completed" | "failed" | "refunded";

interface IPaymentDB {
    id: number;
    payment_type: PaymentTypeDB;
    payment_method: PaymentMethodDB;
    payment_status: PaymentStatusDB;
    amount: number;
    payment_date: Date;
}

interface IPayrollDB {
    id: number;
    employee_id: number;
    payment_id: number;
}

interface IPurchaseDB {
    id: number;
    customer_id: number | null;
    branch_id: number;
    employee_id: number | null;
    payment_id: number;
    total_amount: number;
    purchase_date: Date;
}

interface IPurchaseItemDB {
    id: number;
    purchase_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
}

type ShipmentStatusDB = "preparing_to_ship" | "in_transit" | "shipped" | "delivered";

interface IShipmentDB {
    id: number;
    factory_id: number;
    branch_id: number;
    shipment_status: ShipmentStatusDB;
    shipped_at: Date | null;
    arrived_at: Date | null;
}

interface IShipmentItemDB {
    id: number;
    shipment_id: number;
    factory_product_id: number;
    quantity_shipped: number;
}
