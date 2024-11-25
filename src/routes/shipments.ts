import { Router } from "express";
import { 
    getAllShipmentsByBranch, 
    getUpcomingShipmentsByBranch, 
    updateShipmentStatusForBranch,
    updateShipmentStatusForFactory,
    createShipment, 
    getAllShipmentsByFactory 
} from "@/controllers/shipments";
import { verifyRoles } from "@/middleware/verifyRoles";
import { verifyBranch } from "@/middleware/verifyBranch";
import { verifyFactory } from "@/middleware/verifyFactory";
import { EmployeeRole } from "@/config/enums";

const shipmentsRouter = Router();

shipmentsRouter.get("/branch", verifyRoles([EmployeeRole.INVENTORY_MANAGER]), verifyBranch(), getAllShipmentsByBranch);
shipmentsRouter.get("/branch/upcoming", verifyRoles([EmployeeRole.INVENTORY_MANAGER]), verifyBranch(), getUpcomingShipmentsByBranch);
shipmentsRouter.get("/", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), getAllShipmentsByFactory);
shipmentsRouter.patch("/branch/:shipmentId", verifyRoles([EmployeeRole.INVENTORY_MANAGER]), verifyBranch(), updateShipmentStatusForBranch);
shipmentsRouter.patch("/factory/:shipmentId", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), updateShipmentStatusForFactory);
shipmentsRouter.post("/", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), createShipment);

export default shipmentsRouter;
