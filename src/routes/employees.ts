import { EmployeeRole } from "@/config/enums";
import { getAllFactoryEmployees, updateFactoryEmployeeDetails, deleteFactoryEmployee } from "@/controllers/employees";
import { verifyFactory } from "@/middleware/verifyFactory";
import { verifyRoles } from "@/middleware/verifyRoles";
import { Router } from "express";

const router = Router();

router.get("/factory", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), getAllFactoryEmployees);
router.patch("/factory/:employeeId", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), updateFactoryEmployeeDetails);
router.delete("/factory/:employeeId", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), deleteFactoryEmployee);

export default router;
