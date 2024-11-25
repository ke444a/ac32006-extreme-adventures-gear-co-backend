import { Request, Response, NextFunction } from "express";
import { ResponseStatus } from "@/config/enums";

export const verifyFactory = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.factory_id) {
            res.status(403).json(<APIResponse>{ status: ResponseStatus.ACCESS_DENIED_EMPLOYEE, message: "Only employees assigned to a factory are authorized to access this resource" });
            return;
        }

        next();
    };
};
