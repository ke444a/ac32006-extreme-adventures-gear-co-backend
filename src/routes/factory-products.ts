import { EmployeeRole } from "@/config/enums";
import { createFactoryProduct, deleteFactoryProduct, updateFactoryProduct } from "@/controllers/factory-products";
import { getAllFactoryProducts } from "@/controllers/factory-products";
import { verifyFactory } from "@/middleware/verifyFactory";
import { verifyRoles } from "@/middleware/verifyRoles";
import { Router } from "express";

const router = Router();

router.post("/", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), createFactoryProduct);
router.get("/", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), getAllFactoryProducts);
router.patch("/:factoryProductId", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), updateFactoryProduct);
router.delete("/:factoryProductId", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), deleteFactoryProduct);

export default router;
