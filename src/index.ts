import { PORT } from "@/config/env";
import ExpressConfig from "@/config/express";
import authRoutes from "@/routes/auth";
import purchasesRouter from "@/routes/purchases";
import { authCheck } from "@/middleware/authCheck";
import customersRouter from "./routes/customers";
import inventoryRouter from "./routes/inventory";
import shipmentsRouter from "./routes/shipments";

const app = ExpressConfig();

app.use("/auth", authRoutes);
app.use(authCheck);
app.use("/purchases", purchasesRouter);
app.use("/customers", customersRouter);
app.use("/inventory", inventoryRouter);
app.use("/shipments", shipmentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
