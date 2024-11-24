import { Request, Response, NextFunction } from "express";
import { ResponseStatus } from "@/config/enums";

export const verifyRole = (role: EmployeeRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role !== role) {
            res.status(403).json(<APIResponse>{ status: ResponseStatus.ACCESS_DENIED_EMPLOYEE, message: `Only employees with role "${role}" are authorized to access this resource` });
            return;
        }
        
        next();
    };
};
