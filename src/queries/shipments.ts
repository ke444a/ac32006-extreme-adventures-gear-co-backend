import knex from "@/config/db";
import { FactoryManagerViews, InventoryManagerViews } from "@/config/enums";

const getAllShipmentsForBranch = async (branchId: number) => {
    return await knex<IInventoryManagerShipmentsView>(InventoryManagerViews.ALL_SHIPMENTS_TO_BRANCH).where("branch_id", branchId);
};

const getUpcomingShipmentsForBranch = async (branchId: number) => {
    return await knex<IInventoryManagerShipmentsView>(InventoryManagerViews.UPCOMING_SHIPMENTS_TO_BRANCH).where("branch_id", branchId);
};

const getShipmentItemsByShipmentIds = async (shipmentIds: number[]) => {
    return await knex<IInventoryManagerShipmentDetailsView>(InventoryManagerViews.SHIPMENT_DETAILS).whereIn("shipment_id", shipmentIds);
};

const createShipment = async (factoryId: number, branchId: number) => {
    const [shipmentId] = await knex(FactoryManagerViews.MODIFY_SHIPMENT).insert({
        factory_id: factoryId,
        branch_id: branchId,
        shipment_status: "preparing_to_ship"
    });
    return shipmentId;
};

const updateShipmentStatusForBranch = async (shipmentId: number, status: ShipmentStatus) => {
    return await knex(InventoryManagerViews.UPDATE_SHIPMENT_STATUS).where("id", shipmentId).update({
        shipment_status: status,
        arrived_at: knex.fn.now(),
    });
};

const updateShipmentStatusForFactory = async (shipmentId: number, status: ShipmentStatus, branchId: number) => {
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

const createShipmentItems = async (shipmentId: number, shipmentItems: IShipmentItem[]) => {
    return await knex(FactoryManagerViews.MODIFY_SHIPMENT_ITEM).insert(shipmentItems.map(item => ({
        shipment_id: shipmentId,
        factory_product_id: item.factoryProductId,
        quantity_shipped: item.quantityShipped
    })));
};

const getAllShipmentsForFactory = async (factoryId: number) => {
    return await knex<IFactoryManagerShipmentsView>(FactoryManagerViews.ALL_SHIPMENTS).where("factory_id", factoryId);
};


export { 
    getAllShipmentsForBranch, 
    getUpcomingShipmentsForBranch, 
    getShipmentItemsByShipmentIds, 
    updateShipmentStatusForBranch,
    updateShipmentStatusForFactory,
    createShipment,
    createShipmentItems,
    getAllShipmentsForFactory
}; 
