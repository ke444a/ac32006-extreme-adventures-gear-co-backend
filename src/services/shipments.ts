import { 
    getAllShipmentsForBranchQuery, 
    getShipmentItemsByShipmentIdsQuery, 
    getUpcomingShipmentsForBranchQuery, 
    updateShipmentStatusForBranchQuery,
    updateShipmentStatusForFactoryQuery,
    createShipmentQuery,
    createShipmentItemsQuery,
    getAllShipmentsForFactoryQuery,
    deleteShipmentQuery
} from "@/queries/shipments";


class ShipmentsService {
    public async getAllShipmentsByBranch(branchId: number) {
        const shipments = await getAllShipmentsForBranchQuery(branchId);
        const shipmentItems = await getShipmentItemsByShipmentIdsQuery(shipments.map(shipment => shipment.shipment_id));
        const shipmentsWithItems = shipments.map(shipment => {
            const items = shipmentItems.filter(item => item.shipment_id === shipment.shipment_id);
            return { ...shipment, items };
        });
        return shipmentsWithItems;
    }

    public async getUpcomingShipmentsByBranch(branchId: number) {
        const shipments = await getUpcomingShipmentsForBranchQuery(branchId);
        const shipmentItems = await getShipmentItemsByShipmentIdsQuery(shipments.map(shipment => shipment.shipment_id));
        const shipmentsWithItems = shipments.map(shipment => {
            const items = shipmentItems.filter(item => item.shipment_id === shipment.shipment_id);
            return { ...shipment, items };
        });
        return shipmentsWithItems;
    }

    public async updateShipmentStatusForBranch(shipmentId: number, status: ShipmentStatusDB) {
        return await updateShipmentStatusForBranchQuery(shipmentId, status);
    }

    public async updateShipmentStatusForFactory(shipmentId: number, status: ShipmentStatusDB, branchId: number) {
        return await updateShipmentStatusForFactoryQuery(shipmentId, status, branchId);
    }

    public async createShipment(factoryId: number, branchId: number, shipmentItems: IShipmentItem[]) {
        const shipmentId = await createShipmentQuery(factoryId, branchId);
        await createShipmentItemsQuery(shipmentId, shipmentItems);
    }

    public async getAllShipmentsByFactory(factoryId: number) {
        const storedShipments = await getAllShipmentsForFactoryQuery(factoryId);
        const shipmentItems = await getShipmentItemsByShipmentIdsQuery(storedShipments.map(shipment => shipment.shipment_id));
        const shipmentsWithItems = storedShipments.map(shipment => {
            const items = shipmentItems.filter(item => item.shipment_id === shipment.shipment_id);
            return { ...shipment, items };
        });
        return shipmentsWithItems;
    }

    public async deleteShipment(shipmentId: number) {
        return await deleteShipmentQuery(shipmentId);
    }
}

export default new ShipmentsService();
