import { EmployeeRole } from "@/config/enums";
import { verifyRoles } from "@/middleware/verifyRoles";
import { Router } from "express";
import { deleteProduct, getAllProducts, getProductCategories, updateProduct, updateProductPrice, getProductsByBranch } from "@/controllers/products";
import { verifyBranch } from "@/middleware/verifyBranch";

const router = Router();

router.get("/categories", getProductCategories);
router.get("/branch", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), getProductsByBranch);
router.get("/", getAllProducts);
router.patch("/price/:productId", verifyRoles([EmployeeRole.SALES_REP]), updateProductPrice);
router.patch("/:productId", verifyRoles([EmployeeRole.ADMIN]), updateProduct);
router.delete("/:productId", verifyRoles([EmployeeRole.ADMIN]), deleteProduct);

export default router;
