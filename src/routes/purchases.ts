import { Router } from "express";
import { 
    createPurchaseWithExistingCustomer, 
    createPurchaseWithNewCustomer, 
    getAllPurchasesByBranch, 
    getPurchasesByBranchAndEmployee 
} from "@/controllers/purchases";
import { verifyRole } from "@/middleware/verifyRole";
import { verifyBranch } from "@/middleware/verifyBranch";

const router = Router();

router.post("/new-customer", verifyRole("sales_representative"), verifyBranch(), createPurchaseWithNewCustomer);
router.post("/", verifyRole("sales_representative"), verifyBranch(), createPurchaseWithExistingCustomer);
router.get("/employee", verifyRole("sales_representative"), verifyBranch(), getPurchasesByBranchAndEmployee);
router.get("/", verifyRole("sales_representative"), verifyBranch(), getAllPurchasesByBranch);

export default router;
