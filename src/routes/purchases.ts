import { Router } from "express";
import { 
    createPurchaseWithExistingCustomer, 
    createPurchaseWithNewCustomer, 
    getAllPurchasesByBranch, 
    getPurchasesByBranchAndEmployee 
} from "@/controllers/purchases";
import { verifyRoles } from "@/middleware/verifyRoles";
import { verifyBranch } from "@/middleware/verifyBranch";
import { EmployeeRole } from "@/config/enums";
const router = Router();

router.post("/new-customer", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), createPurchaseWithNewCustomer);
router.post("/", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), createPurchaseWithExistingCustomer);
router.get("/employee", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), getPurchasesByBranchAndEmployee);
router.get("/", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), getAllPurchasesByBranch);

export default router;
