/**
 * Views accessible to admin
 */

/**
 * View for all employees
 */
interface IAdminAllEmployeesView {
    employee_id: number;
    name: string;
    role: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: Date;
    employment_type: "full_time" | "part_time";
    location_id: number;
    location_type: "branch" | "factory" | "hq";
    location_city: string;
    location_address: string;
    shift_type: string;
    shift_start: Date;
    shift_end: Date;
}

/**
 * View for all payrolls
 */
interface IAdminAllPayrollsView {
    payroll_id: number;
    employee_id: number;
    employee_name: string;
    employee_role: string;
    payment_date: Date;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    amount: number;
    location_id: number;
}

/**
 * View for all payments
 */
interface IAdminAllPaymentsView {
    payment_id: number;
    payment_type: PaymentType;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    payment_date: Date;
    amount: number;
    recipient_name: string;
    recipient_role: string;
}

/**
 * View for all purchases
 */
interface IAdminAllPurchasesView {
    purchase_id: number;
    branch_id: number;
    branch_code: number;
    customer_name: string | null;
    sales_rep_id: number;
    sales_rep_name: string;
    total_amount: number;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    purchase_date: Date;
}

/**
 * View for modifying employees
 */
interface IAdminModifyEmployeeView {
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


/**
 * View for modifying payrolls
 */
interface IAdminModifyPayrollView {
    id: number;
    employee_id: number;
    payment_id: number;
}

/**
 * View for modifying payments
 */
interface IAdminModifyPaymentView {
    id: number;
    payment_type: PaymentTypeDB;
    payment_method: PaymentMethodDB;
    payment_status: PaymentStatusDB;
    amount: number;
    payment_date: Date;
}

/**
 * View for all locations
 */
interface IAdminAllLocationsView {
    id: number;
    location_type: "branch" | "factory" | "hq";
    city: string;
    address: string;
    branch_code: number | null;
    factory_code: number | null;
}

/**
 * View for location details
 */
interface IAdminLocationDetailsView {
    branch_id: number | null;
    factory_id: number | null;
    location_id: number;
    location_type: "branch" | "factory" | "hq";
    city: string;
    address: string;
    branch_code: number | null;
    factory_code: number | null;
    sales_target: number | null;
    production_target: number | null;
}

/**
 * View for purchase summary
 */
interface IAdminPurchaseSummaryView extends ISalesRepPurchaseSummaryView {
    location_id: number;
    location_type: "branch" | "factory" | "hq";
}

/**
 * View for updating branch sales target
 */
interface IAdminModifyBranchView {
    id: number;
    sales_target: number;
}

/**
 * View for updating factory production target
 */
interface IAdminModifyFactoryView {
    id: number;
    production_target: number;
}

/**
 * View for all products
 */
// interface IAdminAllProductsView {
//     id: number;
//     name: string;
//     description: string;
//     image_url: string | null;
//     price: number;
//     warranty_duration: number;
//     product_category_id: number;
//     product_category_name: string;
// }

/**
 * View for all shipment items by branch
 */
type IAdminShipmentDetailsView = IInventoryManagerShipmentDetailsView;

/**
 * View for modifying products
 */
interface IAdminModifyProductView {
    id: number;
    name: string;
    description: string;
    price: number;
    warranty_duration: number;
    product_category_id: number;
}

/**
 * View for product sales analytics
 */
interface IAdminCategorySalesView {
    category_id: number;
    category_name: string;
    total_purchases: number;
    unique_products: number;
    total_quantity_sold: number;
    total_revenue: number;
    year: number;
}


/**
 * View for factory shipping
 */
interface IAdminFactoryShippingView {
    factory_id: number;
    factory_code: number;
    factory_city: string;
    total_shipments: number;
    completed_shipments: number;
    active_shipments: number;
    total_items_shipped: number;
    year: number;
}

/**
 * View for yearly summary
 */
interface IAdminYearlySummaryView {
    year: number;
    total_revenue: number;
    total_purchases: number;
    unique_customers: number;
    average_order_value: number;
}

/**
 * View for all shipments for factory
 */
type IAdminAllShipmentsView = IFactoryManagerAllShipmentsView;

/**
 * View for all manufactured products for factory
 */
type IAdminManufacturedProductsView = IFactoryManagerManufacturedProductsView;
