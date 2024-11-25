/**
 * Views accessible to sales representative
 */

/**
 * View for modifying branch item
 */
interface IInventoryManagerModifyBranchItemView {
    id: number;
    branch_id: number;
    product_id: number;
    quantity: number;
    updated_at: Date;
}
/**
 * View for all branch items in a specific branch
 */
interface IInventoryManagerBranchItemsInBranchView {
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

/**
 * View for all shipments to a specific branch
 */
interface IInventoryManagerAllShipmentsToBranchView {
    shipment_id: number;
    branch_id: number;
    factory_location_id: number;
    factory_city: string;
    shipment_status: ShipmentStatusDB;
    shipped_at: Date;
    arrived_at: Date;
    total_items: number;
}

/**
 * View for upcoming shipments to a specific branch
 */
type IInventoryManagerUpcomingShipmentsToBranchView = IInventoryManagerAllShipmentsToBranchView


/**
 * View for shipment items
 */
interface IInventoryManagerShipmentDetailsView {
    shipment_id: number;
    product_id: number | null;
    product_name: string | null;
    product_category: string;
    product_image_url: string;
    quantity_shipped: string;
    manufactured_at: Date;
}

/**
 * View for updating shipment status
 */
interface IInventoryManagerUpdateShipmentStatusView {
    id: number;
    shipment_status: ShipmentStatusDB;
    arrived_at: Date;
}
