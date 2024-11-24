import { Router } from "express";
import { getAllShipmentsByBranch, getUpcomingShipmentsByBranch, updateShipmentStatus } from "@/controllers/shipments";
import { verifyRole } from "@/middleware/verifyRole";
import { verifyBranch } from "@/middleware/verifyBranch";
import { EmployeeRole } from "@/config/enums";

const shipmentsRouter = Router();

shipmentsRouter.get("/branch", verifyRole(EmployeeRole.INVENTORY_MANAGER), verifyBranch(), getAllShipmentsByBranch);
shipmentsRouter.get("/branch/upcoming", verifyRole(EmployeeRole.INVENTORY_MANAGER), verifyBranch(), getUpcomingShipmentsByBranch);
shipmentsRouter.patch("/:shipmentId", verifyRole(EmployeeRole.INVENTORY_MANAGER), verifyBranch(), updateShipmentStatus);

export default shipmentsRouter;
