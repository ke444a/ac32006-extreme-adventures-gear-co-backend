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

/**
 * Views created for inventory managers
 */

// View to see branch items for their specific branch
interface IInventoryManagerBranchItemsView {
    branch_item_id: number;
    branch_id: number;
    product_id: number;
    product_name: string;
    product_category: string;
    product_image_url: string;
    quantity: number;
    price: number;
    warranty_duration: number;
}

// View to see upcoming shipments for their branch
interface IInventoryManagerShipmentsView {
    shipment_id: number;
    factory_name: string;
    factory_city: string;
    shipment_status: string;
    shipped_at: Date;
    arrived_at: Date | null;
    total_items: number;
}

// View to see shipment details
interface IInventoryManagerShipmentDetailsView {
    shipment_id: number;
    product_id: number;
    product_name: string;
    product_category: string;
    product_image_url: string;
    quantity_shipped: number;
    manufactured_at: Date;
}

// View to update shipment status
interface IInventoryManagerUpdateShipmentView {
    id: number;
    shipment_status: string;
    arrived_at: Date | null;
}

/**
 * Views created for factory managers
 */

// View for all shipments from factory
interface IFactoryManagerShipmentsView {
    shipment_id: number;
    branch_id: number;
    branch_name: string;
    branch_city: string;
    shipment_status: "preparing_to_ship" | "in_transit" | "shipped" | "delivered";
    shipped_at: Date | null;
    arrived_at: Date | null;
    total_items: number;
}

// View for all manufactured products
interface IFactoryManagerManufacturedProductsView {
    factory_product_id: number;
    product_id: number;
    product_name: string;
    product_image_url: string;
    product_category: string;
    quantity: number;
    manufactured_at: Date;
}

// View for all employees in factory
interface IFactoryManagerFactoryEmployeesView {
    employee_id: number;
    name: string;
    role: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: Date;
    employment_type: "full_time" | "part_time";
    shift_type: string;
    shift_start: Date;
    shift_end: Date;
    factory_id: number;
}

// View for shipment details with manufacturing info
interface IFactoryManagerShipmentDetailsView {
    shipment_id: number;
    product_id: number;
    product_name: string;
    product_category: string;
    quantity_shipped: number;
    manufactured_at: Date;
    manufactured_batch_id: number;
    total_manufactured_in_batch: number;
    remaining_in_factory: number;
}

// Modifiable views interfaces
interface IFactoryManagerModifyShipmentView {
    id: number;
    factory_id: number;
    branch_id: number;
    shipment_status: "preparing_to_ship" | "in_transit" | "shipped" | "delivered";
    shipped_at: Date | null;
    arrived_at: Date | null;
}

interface IFactoryManagerModifyManufacturedProductView {
    id: number;
    factory_id: number;
    product_id: number;
    quantity: number;
    manufactured_at: Date;
}

interface IFactoryManagerModifyEmployeeView {
    id: number;
    name: string;
    phone_number: string;
    age: number;
    salary: number;
    employment_type: "full_time" | "part_time";
    work_schedule_id: number;
}
