import { EmployeeRole } from "@/config/enums";
import { verifyRoles } from "@/middleware/verifyRoles";
import { getAllLocations, getBranchDetails, getFactoryDetails, getHeadquarterStatistics, updateBranchDetails, updateFactoryDetails } from "@/controllers/locations";
import { Router } from "express";

const router = Router();

router.get("/branch/:locationId", verifyRoles([EmployeeRole.ADMIN]), getBranchDetails);
router.get("/factory/:locationId", verifyRoles([EmployeeRole.ADMIN]), getFactoryDetails);
router.get("/hq/statistics", verifyRoles([EmployeeRole.ADMIN]), getHeadquarterStatistics);
router.get("/", verifyRoles([EmployeeRole.ADMIN]), getAllLocations);
router.patch("/branch/:branchId", verifyRoles([EmployeeRole.ADMIN]), updateBranchDetails);
router.patch("/factory/:factoryId", verifyRoles([EmployeeRole.ADMIN]), updateFactoryDetails);

export default router;
