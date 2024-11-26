import { ResponseStatus } from "@/config/enums";
import { Request, Response } from "express";
import AuthService from "@/services/auth";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

const TOKEN_EXPIRY_TIME = 1000 * 60 * 60 * 24;

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json(<APIResponse>{ status: ResponseStatus.INVALID_REQUEST_BODY, message: "Email and password are required" });
            return;
        }
        const { token, employee } = await AuthService.handleLogin(email, password);
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: TOKEN_EXPIRY_TIME, sameSite: "none" });
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { user: convertSnakeCaseToCamel(employee) } });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Unable to login" });
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.token) {
            res.status(204).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Logout successful" });
            return;
        }
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
        res.status(204).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Logout successful", data: null });
    } catch (error) {
        console.log(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Unable to logout" });
    }
};
