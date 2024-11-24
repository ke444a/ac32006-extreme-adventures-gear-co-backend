import { PORT } from "@/config/env";
import ExpressConfig from "@/config/express";
import authRoutes from "@/routes/auth";
import purchasesRouter from "@/routes/purchases";
import { authCheck } from "@/middleware/authCheck";
import customersRouter from "./routes/customers";

const app = ExpressConfig();

app.use("/auth", authRoutes);
app.use(authCheck);
app.use("/purchases", purchasesRouter);
app.use("/customers", customersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
