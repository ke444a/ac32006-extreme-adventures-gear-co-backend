import { PORT } from "@/config/env";
import ExpressConfig from "@/config/express";
import authRoutes from "@/routes/auth";
import salesRoutes from "@/routes/sales";
import { authCheck } from "@/middleware/authCheck";

const app = ExpressConfig();

app.use("/auth", authRoutes);
app.use(authCheck);
app.use("/sales", salesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
