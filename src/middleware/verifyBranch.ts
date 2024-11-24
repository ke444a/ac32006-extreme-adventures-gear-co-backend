import { Request, Response, NextFunction } from "express";
import { ResponseStatus } from "@/config/enums";

export const verifyBranch = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.branch_id) {
            res.status(403).json(<APIResponse>{ status: ResponseStatus.ACCESS_DENIED_EMPLOYEE, message: "Only employees assigned to a branch are authorized to access this resource" });
            return;
        }

        next();
    };
};
