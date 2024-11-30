import knex from "@/config/db";
import { FactoryManagerViews, InventoryManagerViews } from "@/config/enums";

const getAllShipmentsForBranchQuery = async (branchId: number) => {
    return await knex<IInventoryManagerAllShipmentsToBranchView>(InventoryManagerViews.ALL_SHIPMENTS_TO_BRANCH).where("branch_id", branchId);
};

const getUpcomingShipmentsForBranchQuery = async (branchId: number) => {
    return await knex<IInventoryManagerUpcomingShipmentsToBranchView>(InventoryManagerViews.UPCOMING_SHIPMENTS_TO_BRANCH).where("branch_id", branchId);
};

const getShipmentItemsByShipmentIdsQuery = async (shipmentIds: number[]) => {
    // Accessible by both inventory manager and admin
    return await knex<IInventoryManagerShipmentDetailsView | IAdminShipmentDetailsView>(InventoryManagerViews.SHIPMENT_DETAILS).whereIn("shipment_id", shipmentIds);
};

const createShipmentQuery = async (factoryId: number, branchId: number) => {
    const [shipmentId] = await knex(FactoryManagerViews.MODIFY_SHIPMENT).insert({
        factory_id: factoryId,
        branch_id: branchId,
        shipment_status: "preparing_to_ship"
    });
    return shipmentId;
};

const updateShipmentStatusForBranchQuery = async (shipmentId: number, status: ShipmentStatusDB) => {
    return await knex(InventoryManagerViews.UPDATE_SHIPMENT_STATUS).where("id", shipmentId).update({
        shipment_status: status,
        arrived_at: knex.fn.now(),
    });
};

const updateShipmentStatusForFactoryQuery = async (shipmentId: number, status: ShipmentStatusDB, branchId: number) => {
    const shipment = await knex("shipment").where("id", shipmentId).first().select(["shipment_status", "shipped_at"]);
    if (!shipment) {
        throw new Error("Shipment not found");
    }
    let shippedAt = shipment.shipped_at;
    if (shipment.shipment_status === "preparing_to_ship" && status !== shipment.shipment_status) {
        shippedAt = knex.fn.now();
    }

    return await knex(FactoryManagerViews.UPDATE_SHIPMENT_STATUS).where("id", shipmentId).update({
        shipment_status: status,
        shipped_at: shippedAt,
        branch_id: branchId
    });
};

const createShipmentItemsQuery = async (shipmentId: number, shipmentItems: IShipmentItem[]) => {
    return await knex(FactoryManagerViews.MODIFY_SHIPMENT_ITEM).insert(shipmentItems.map(item => ({
        shipment_id: shipmentId,
        factory_product_id: item.factoryProductId,
        quantity_shipped: item.quantity
    })));
};

const getAllShipmentsForFactoryQuery = async (factoryId: number) => {
    // Accessible by both factory manager and admin
    return await knex<IFactoryManagerAllShipmentsView | IAdminAllShipmentsView>(FactoryManagerViews.ALL_SHIPMENTS).where("factory_id", factoryId);
};

const deleteShipmentQuery = async (shipmentId: number) => {
    return await knex<IFactoryManagerModifyShipmentView>(FactoryManagerViews.MODIFY_SHIPMENT).where("id", shipmentId).delete();
};

export { 
    getAllShipmentsForBranchQuery, 
    getUpcomingShipmentsForBranchQuery, 
    getShipmentItemsByShipmentIdsQuery, 
    updateShipmentStatusForBranchQuery,
    updateShipmentStatusForFactoryQuery,
    createShipmentQuery,
    createShipmentItemsQuery,
    getAllShipmentsForFactoryQuery,
    deleteShipmentQuery
}; 
