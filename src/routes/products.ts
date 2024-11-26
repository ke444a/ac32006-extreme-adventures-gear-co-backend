import { EmployeeRole } from "@/config/enums";
import { verifyRoles } from "@/middleware/verifyRoles";
import { Router } from "express";
import { deleteProduct, getAllProducts, getProductCategories, updateProduct, updateProductPrice } from "@/controllers/products";

const router = Router();

router.get("/categories", getProductCategories);
router.get("/", verifyRoles([EmployeeRole.ADMIN]), getAllProducts);
router.patch("/price/:productId", verifyRoles([EmployeeRole.SALES_REP, EmployeeRole.ADMIN]), updateProductPrice);
router.patch("/:productId", verifyRoles([EmployeeRole.ADMIN]), updateProduct);
router.delete("/:productId", verifyRoles([EmployeeRole.ADMIN]), deleteProduct);

export default router;
