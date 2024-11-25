import { Request, Response, NextFunction } from "express";
import { ResponseStatus } from "@/config/enums";

export const verifyRoles = (roles: IEmployeeRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json(<APIResponse>{ status: ResponseStatus.ACCESS_DENIED_EMPLOYEE, message: `Only employees with role '${roles.join(" ")}' are authorized to access this resource` });
            return;
        }
        
        next();
    };
};
