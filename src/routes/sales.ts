import { Router } from "express";
import { createPurchaseWithExistingCustomer, createPurchaseWithNewCustomer, getAllCustomers, getAllPurchasesByBranch, getCustomersByBranch, getPurchasesByBranchAndEmployee } from "@/controllers/sales";

const salesRouter = Router();

salesRouter.post("/purchase/new-customer", createPurchaseWithNewCustomer);
salesRouter.post("/purchase", createPurchaseWithExistingCustomer);
salesRouter.get("/customers", getAllCustomers);
salesRouter.get("/customers/branch", getCustomersByBranch);
salesRouter.get("/purchases/branch", getAllPurchasesByBranch);
salesRouter.get("/purchases/branch/employee", getPurchasesByBranchAndEmployee);

export default salesRouter;
