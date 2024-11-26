/**
 * Types for data received in PATCH/POST requests from client
 */

interface RequestBodyPATCH {
    CUSTOMER: {
        name?: string;
        phoneNumber?: string;
        email?: string;
        address?: string;
    },
    PURCHASE: {
        purchaseItems: IPurchaseItem[];
        paymentStatus: PaymentStatusDB;
    },
    EMPLOYEE: {
        name?: string;
        phoneNumber?: string;
        age?: number;
        salary?: number;
        employmentType?: EmploymentTypeDB;
        workScheduleType?: WorkScheduleTypeDB;
    },
    PAYMENT: {
        paymentType?: PaymentTypeDB;
        paymentMethod?: PaymentMethodDB;
        paymentStatus?: PaymentStatusDB;
        amount?: number;
    },
    PRODUCT: {
        name: string;
        description: string;
        price: number;
        warrantyDuration: number;
        categoryId: number;
    }
}

interface RequestBodyPOST {
    CUSTOMER: {
        name: string;
        phoneNumber?: string;
        email?: string;
        address?: string;
    },
    PURCHASE_WITH_EXISTING_CUSTOMER: {
        customerId: number;
        purchaseItems: IPurchaseItem[];
        paymentMethod: PaymentMethod;
        paymentStatus: PaymentStatus;
    },
    PURCHASE_WITH_NEW_CUSTOMER: {
        customer: RequestBodyPOST["CUSTOMER"];
        purchaseItems: IPurchaseItem[];
        paymentMethod: PaymentMethod;
        paymentStatus: PaymentStatus;
    },
    SHIPMENT: {
        branchId: number;
        shipmentItems: IShipmentItem[];
    },
    EMPLOYEE: {
        name: string;
        phoneNumber: string;
        age: number;
        salary: number;
        employmentType: EmploymentType;
        workScheduleType: WorkScheduleTypeDB;
        role: IEmployeeRole;
        locationId: number;
    },
    PAYMENT: {
        paymentType: PaymentTypeDB;
        paymentMethod: PaymentMethodDB;
        paymentStatus: PaymentStatusDB;
        amount: number;
    }
}

interface IPurchaseItem {
    productId: number;
    quantity: number;
}

interface IShipmentItem {
    factoryProductId: number;
    quantity: number;
}
