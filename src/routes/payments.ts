import { verifyRoles } from "@/middleware/verifyRoles";
import { Router } from "express";
import { EmployeeRole } from "@/config/enums";
import { 
    getAllPayrolls, 
    createPayroll, 
    updatePayroll, 
    deletePayroll, 
    getAllPayments 
} from "@/controllers/payments";

const router = Router();

router.get("/payrolls", verifyRoles([EmployeeRole.ADMIN]), getAllPayrolls);
router.get("/", verifyRoles([EmployeeRole.ADMIN]), getAllPayments);
router.post("/payrolls", verifyRoles([EmployeeRole.ADMIN]), createPayroll);
router.patch("/payrolls/:payrollId", verifyRoles([EmployeeRole.ADMIN]), updatePayroll);
router.delete("/payrolls/:payrollId", verifyRoles([EmployeeRole.ADMIN]), deletePayroll);

export default router;
