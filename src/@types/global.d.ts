export {};


declare global {
    namespace Express {
        interface Request {
            user: IEmployee;
        }
    }

    interface APIResponse {
        status: ResponseStatus;
        message: string;
        data?: unknown;
    }

    // DUMPING TYPES HERE FOR NOW

    type EmployeeRole = "sales_representative" | "inventory_manager" | "admin" | "factory_manager" | "factory_worker";

    interface IEmployee {
        id: number;
        name: string;
        phone_number: string;
        age: number;
        salary: number;
        hire_date: string;
        employment_type: "full_time" | "part_time";
        work_schedule_id: number;
        location_id: number;
        role: EmployeeRole;
        branch_id?: number;
    }

    interface IPurchaseItem {
        productId: number;
        quantity: number;
    }

    interface IPurchase {
        customerId: number;
        branchId: number;
        employeeId: number;
        paymentId: number;
        totalAmount: number;
        purchaseItems: IPurchaseItem[];
    }

    interface ICustomer {
        name: string;
        email?: string | null;
        phoneNumber?: string | null;
        address?: string | null;
    }

    type PaymentType = "customer" | "employee";
    type PaymentMethod = "cash" | "card" | "bank_transfer" | "cheque";
    type PaymentStatus = "pending" | "completed" | "refunded";

    interface IPayment {
        paymentType: PaymentType;
        paymentMethod: PaymentMethod;
        paymentStatus: PaymentStatus;
        amount: number;
    }
}

