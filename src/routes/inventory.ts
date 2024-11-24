import { Router } from "express";
import { getBranchItemsByBranch, createNewBranchItem, updateBranchItemQuantity, deleteBranchItem } from "@/controllers/inventory";
import { verifyRole } from "@/middleware/verifyRole";
import { verifyBranch } from "@/middleware/verifyBranch";

const inventoryRouter = Router();

inventoryRouter.get("/branch", verifyRole("inventory_manager"), verifyBranch(), getBranchItemsByBranch);
inventoryRouter.post("/", verifyRole("inventory_manager"), verifyBranch(), createNewBranchItem);
inventoryRouter.patch("/:branchItemId", verifyRole("inventory_manager"), verifyBranch(), updateBranchItemQuantity);
inventoryRouter.delete("/:branchItemId", verifyRole("inventory_manager"), verifyBranch(), deleteBranchItem);

export default inventoryRouter;
