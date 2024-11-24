import { Router } from "express";
import { getAllCustomers, getCustomersByBranch, updateCustomer, deleteCustomer } from "@/controllers/customers";
import { verifyRole } from "@/middleware/verifyRole";
import { verifyBranch } from "@/middleware/verifyBranch";

const customersRouter = Router();

customersRouter.get("/", verifyRole("sales_representative"), verifyBranch(), getAllCustomers);
customersRouter.get("/branch", verifyRole("sales_representative"), verifyBranch(), getCustomersByBranch);
customersRouter.patch("/:customerId", verifyRole("sales_representative"), verifyBranch(), updateCustomer);
customersRouter.delete("/:customerId", verifyRole("sales_representative"), verifyBranch(), deleteCustomer);

export default customersRouter;
