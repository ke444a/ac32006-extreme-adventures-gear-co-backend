import { 
    getAllShipmentsForBranch, 
    getShipmentItemsByShipmentIds, 
    getUpcomingShipmentsForBranch, 
    updateShipmentStatus 
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

    public async updateShipmentStatus(shipmentId: number, status: ShipmentStatus) {
        return await updateShipmentStatus(shipmentId, status);
    }
}

export default new ShipmentsService();
