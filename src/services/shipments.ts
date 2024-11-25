import { 
    getAllShipmentsForBranch, 
    getShipmentItemsByShipmentIds, 
    getUpcomingShipmentsForBranch, 
    updateShipmentStatusForBranch,
    updateShipmentStatusForFactory,
    createShipment,
    createShipmentItems,
    getAllShipmentsForFactory
} from "@/queries/shipments";

class ShipmentsService {
    public async getAllShipmentsByBranch(branchId: number) {
        const shipments = await getAllShipmentsForBranch(branchId);
        const shipmentItems = await getShipmentItemsByShipmentIds(shipments.map(shipment => shipment.shipment_id));
        const shipmentsWithItems = shipments.map(shipment => {
            const items = shipmentItems.filter(item => item.shipment_id === shipment.shipment_id);
            return { ...shipment, items };
        });
        return shipmentsWithItems;
    }

    public async getUpcomingShipmentsByBranch(branchId: number) {
        const shipments = await getUpcomingShipmentsForBranch(branchId);
        const shipmentItems = await getShipmentItemsByShipmentIds(shipments.map(shipment => shipment.shipment_id));
        const shipmentsWithItems = shipments.map(shipment => {
            const items = shipmentItems.filter(item => item.shipment_id === shipment.shipment_id);
            return { ...shipment, items };
        });
        return shipmentsWithItems;
    }

    public async updateShipmentStatusForBranch(shipmentId: number, status: ShipmentStatus) {
        return await updateShipmentStatusForBranch(shipmentId, status);
    }

    public async updateShipmentStatusForFactory(shipmentId: number, status: ShipmentStatus, branchId: number) {
        return await updateShipmentStatusForFactory(shipmentId, status, branchId);
    }

    public async createShipment(factoryId: number, branchId: number, shipmentItems: IShipmentItem[]) {
        const shipmentId = await createShipment(factoryId, branchId);
        await createShipmentItems(shipmentId, shipmentItems);
    }

    public async getAllShipmentsByFactory(factoryId: number) {
        const storedShipments = await getAllShipmentsForFactory(factoryId);
        const shipmentItems = await getShipmentItemsByShipmentIds(storedShipments.map(shipment => shipment.shipment_id));
        const shipmentsWithItems = storedShipments.map(shipment => {
            const items = shipmentItems.filter(item => item.shipment_id === shipment.shipment_id);
            return { ...shipment, shipment_items: items };
        });
        return shipmentsWithItems;
    }
}

export default new ShipmentsService();
