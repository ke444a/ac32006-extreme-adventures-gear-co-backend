import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { TOKEN_SECRET } from "@/config/env";
import { getEmployeeByIdQuery } from "@/queries/employees";
import { ResponseStatus } from "@/config/enums";

export const authCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json(<APIResponse>{ status: ResponseStatus.INVALID_TOKEN, message: "Authorization token is required" });
        return;
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET as string) as JwtPayload;
        const [user] = await getEmployeeByIdQuery(decoded.id);
        if (!user) {
            res.status(401).json(<APIResponse>{ status: ResponseStatus.INVALID_TOKEN, message: "Invalid token" });
            return;
        }
        req.user = user as IAuthenticatedEmployee;
        next();
    } catch (_error) {
        res.status(401).json(<APIResponse>{ status: ResponseStatus.INVALID_TOKEN, message: "Invalid token" });
        return;
    }
};

