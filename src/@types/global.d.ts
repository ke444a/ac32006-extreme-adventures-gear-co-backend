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

    type PaymentType = "customer" | "employee";
    type PaymentMethod = "cash" | "card" | "bank_transfer" | "cheque";
    type PaymentStatus = "pending" | "completed" | "refunded";

    interface IPayment {
        paymentType: PaymentType;
        paymentMethod: PaymentMethod;
        paymentStatus: PaymentStatus;
        amount: number;
    }

    interface IPaymentDatabase {
        id: number;
        payment_type: PaymentType;
        payment_method: PaymentMethod;
        payment_status: PaymentStatus;
        amount: number;
        payment_date: Date;
    }

}
