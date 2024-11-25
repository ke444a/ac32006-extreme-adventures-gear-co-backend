import { Router } from "express";
import { getBranchItemsByBranch, createNewBranchItem, updateBranchItemQuantity, deleteBranchItem } from "@/controllers/inventory";
import { verifyRoles } from "@/middleware/verifyRoles";
import { verifyBranch } from "@/middleware/verifyBranch";
import { EmployeeRole } from "@/config/enums";

const inventoryRouter = Router();

inventoryRouter.get("/branch", verifyRoles([EmployeeRole.INVENTORY_MANAGER]), verifyBranch(), getBranchItemsByBranch);
inventoryRouter.post("/", verifyRoles([EmployeeRole.INVENTORY_MANAGER]), verifyBranch(), createNewBranchItem);
inventoryRouter.patch("/:branchItemId", verifyRoles([EmployeeRole.INVENTORY_MANAGER]), verifyBranch(), updateBranchItemQuantity);
inventoryRouter.delete("/:branchItemId", verifyRoles([EmployeeRole.INVENTORY_MANAGER]), verifyBranch(), deleteBranchItem);

export default inventoryRouter;
