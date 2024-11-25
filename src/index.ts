import { PORT } from "@/config/env";
import ExpressConfig from "@/config/express";
import authRoutes from "@/routes/auth";
import purchasesRouter from "@/routes/purchases";
import { authCheck } from "@/middleware/authCheck";
import customersRouter from "./routes/customers";
import employeesRouter from "./routes/employees";
import inventoryRouter from "./routes/inventory";
import shipmentsRouter from "./routes/shipments";
import factoryProductsRouter from "./routes/factory-products";
import paymentsRouter from "./routes/payments";

const app = ExpressConfig();

app.use("/auth", authRoutes);
app.use(authCheck);
app.use("/purchases", purchasesRouter);
app.use("/customers", customersRouter);
app.use("/inventory", inventoryRouter);
app.use("/shipments", shipmentsRouter);
app.use("/factory-products", factoryProductsRouter);
app.use("/employees", employeesRouter);
app.use("/payments", paymentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
