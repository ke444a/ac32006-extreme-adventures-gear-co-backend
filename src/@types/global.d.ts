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

    type IEmployeeRole = "sales_representative" | "inventory_manager" | "admin" | "factory_manager" | "factory_worker";

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
        factory_id?: number;
    }

    interface IEmployeeChange {
        name?: string;
        phoneNumber?: string;
        age?: number;
        salary?: number;
        employmentType?: "full_time" | "part_time";
        hireDate?: string;
        workScheduleId?: number;
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

    type ShipmentStatus = "preparing_to_ship" | "in_transit" | "shipped" | "delivered";
    interface IShipmentItem {
        factoryProductId: number;
        quantityShipped: number;
    }

    interface IFactoryProduct {
        id: number;
        factory_id: number;
        product_id: number;
        quantity: number;
        manufactured_at: Date;
        created_at: Date;
        updated_at: Date;
        product_name?: string;
        product_description?: string;
    }
}

