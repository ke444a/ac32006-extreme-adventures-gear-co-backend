export {};


declare global {
    namespace Express {
        interface Request {
            user: IAuthenticatedEmployee;
        }
    }

    interface APIResponse {
        status: ResponseStatus;
        message: string;
        data?: unknown;
    }

    type IEmployeeRole = "sales_representative" | "inventory_manager" | "admin" | "factory_manager" | "factory_worker";

    interface IAuthenticatedEmployee {
        id: number;
        branch_id?: number;
        factory_id?: number;
        role: IEmployeeRole;
    }
}
