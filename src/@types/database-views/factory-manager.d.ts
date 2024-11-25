/**
 * Views accessible to factory manager
 */


/**
 * View all shipments from specific factory
 */
interface IFactoryManagerAllShipmentsView {
    shipment_id: number;
    branch_id: number;
    factory_id: number;
    branch_name: string;
    branch_city: string;
    shipment_status: ShipmentStatusDB;
    shipped_at: Date;
    arrived_at: Date;
    total_items: number;
}

/**
 * View all manufactured products in specific factory
 */
interface IFactoryManagerManufacturedProductsView {
    factory_product_id: number;
    factory_id: number;
    product_id: number;
    product_name: string;
    product_image_url: string;
    product_category: string;
    quantity: number;
    manufactured_at: Date;
}

/**
 * View all factory workers in specific factory
 */
interface IFactoryManagerEmployeesView {
    factory_id: number;
    employee_id: number;
    name: string;
    role: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: Date;
    employment_type: EmploymentTypeDB;
    shift_type: ShiftTypeDB;
    shift_start: Date;
    shift_end: Date;
}

/**
 * View for modifying shipments
 */
interface IFactoryManagerModifyShipmentView {
    id: number;
    factory_id: number;
    branch_id: number;
    shipment_status: ShipmentStatusDB;
    shipped_at: Date;
    arrived_at: Date;
}

/**
 * View for modifying manufactured products
 */
interface IFactoryManagerModifyManufacturedProductView {
    id: number;
    factory_id: number;
    product_id: number;
    quantity: number;
    manufactured_at: Date;
}

/**
 * View for modifying factory workers
 */
interface IFactoryManagerModifyEmployeeView {
    id: number;
    name: string;
    phone_number: string;
    age: number;
    salary: number;
    employment_type: EmploymentTypeDB;
    work_schedule_id: number;
}

/**
 * View shipment items and factory product details for shipment
 */
interface IFactoryManagerShipmentDetailsView {
    shipment_id: number;
    product_id: number;
    product_name: string;
    product_category: string;
    quantity_shipped: number;
    manufactured_at: Date;
    factory_product_id: number;
    total_manufactured_in_batch: number;
    remaining_in_factory: number;
}

/**
 * View for modifying shipment items
 */
interface IFactoryManagerModifyShipmentItemView {
    id: number;
    shipment_id: number;
    factory_product_id: number;
    quantity_shipped: number;
}

/**
 * View for updating shipment status for branch
 */
interface IFactoryManagerUpdateShipmentStatusView {
    id: number;
    shipment_status: ShipmentStatusDB;
    shipped_at: Date;
    branch_id: number;
}

