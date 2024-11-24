import { Router } from "express";
import { loginUser, logoutUser } from "@/controllers/auth";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);

export default authRouter;
