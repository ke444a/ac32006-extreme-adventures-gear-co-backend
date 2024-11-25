import { EmployeeRole } from "@/config/enums";
import { verifyFactory } from "@/middleware/verifyFactory";
import { verifyRoles } from "@/middleware/verifyRoles";
import { Router } from "express";
import { 
    getAllFactoryEmployees, 
    updateFactoryEmployeeDetails, 
    deleteFactoryEmployee,
    getEmployeesByLocationId,
    getAllEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployeeDetails
} from "@/controllers/employees";

const router = Router();

router.get("/factory", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), getAllFactoryEmployees);
router.get("/location/:locationId", verifyRoles([EmployeeRole.ADMIN]), getEmployeesByLocationId);
router.get("/", verifyRoles([EmployeeRole.ADMIN]), getAllEmployees);
router.post("/", verifyRoles([EmployeeRole.ADMIN]), createEmployee);
router.patch("/factory/:employeeId", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), updateFactoryEmployeeDetails);
router.patch("/:employeeId", verifyRoles([EmployeeRole.ADMIN]), updateEmployeeDetails);
router.delete("/factory/:employeeId", verifyRoles([EmployeeRole.FACTORY_MANAGER]), verifyFactory(), deleteFactoryEmployee);
router.delete("/:employeeId", verifyRoles([EmployeeRole.ADMIN]), deleteEmployee);

export default router;
