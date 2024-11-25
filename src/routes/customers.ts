import { Router } from "express";
import { getAllCustomers, getCustomersByBranch, updateCustomer, deleteCustomer } from "@/controllers/customers";
import { verifyRoles } from "@/middleware/verifyRoles";
import { verifyBranch } from "@/middleware/verifyBranch";
import { EmployeeRole } from "@/config/enums";

const customersRouter = Router();

customersRouter.get("/", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), getAllCustomers);
customersRouter.get("/branch", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), getCustomersByBranch);
customersRouter.patch("/:customerId", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), updateCustomer);
customersRouter.delete("/:customerId", verifyRoles([EmployeeRole.SALES_REP]), verifyBranch(), deleteCustomer);

export default customersRouter;
