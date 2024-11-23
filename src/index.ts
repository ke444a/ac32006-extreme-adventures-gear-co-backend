import { PORT } from "@/config/env";
import ExpressConfig from "@/config/express";

const app = ExpressConfig();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
