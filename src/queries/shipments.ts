import knex from "@/config/db";
import { InventoryManagerViews } from "@/config/enums";

export const getAllShipmentsForBranch = async (branchId: number) => {
    return await knex<IInventoryManagerShipmentsView>(InventoryManagerViews.ALL_SHIPMENTS_TO_BRANCH).where("branch_id", branchId);
};

export const getUpcomingShipmentsForBranch = async (branchId: number) => {
    return await knex<IInventoryManagerShipmentsView>(InventoryManagerViews.UPCOMING_SHIPMENTS_TO_BRANCH).where("branch_id", branchId);
};

export const getShipmentItemsByShipmentIds = async (shipmentIds: number[]) => {
    return await knex<IInventoryManagerShipmentDetailsView>(InventoryManagerViews.SHIPMENT_DETAILS).whereIn("shipment_id", shipmentIds);
};

export const updateShipmentStatus = async (shipmentId: number, status: ShipmentStatus) => {
    return await knex("inventory_manager_update_shipment_view").where("id", shipmentId).update({
        shipment_status: status,
        arrived_at: knex.fn.now()
    });
};

