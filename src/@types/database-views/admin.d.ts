/**
 * Views accessible to admin
 */

/**
 * View for all employees
 */
interface IAdminAllEmployeesView {
    employee_id: number;
    name: string;
    role: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: Date;
    employment_type: "full_time" | "part_time";
    location_id: number;
    location_type: "branch" | "factory" | "hq";
    location_city: string;
    location_address: string;
    shift_type: string;
    shift_start: Date;
    shift_end: Date;
}

/**
 * View for all payrolls
 */
interface IAdminAllPayrollsView {
    payroll_id: number;
    employee_id: number;
    employee_name: string;
    employee_role: string;
    payment_date: Date;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    amount: number;
}

/**
 * View for all payments
 */
interface IAdminAllPaymentsView {
    payment_id: number;
    payment_type: PaymentType;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    payment_date: Date;
    amount: number;
    recipient_name: string;
    recipient_role: string;
}

/**
 * View for all purchases
 */
interface IAdminAllPurchasesView {
    purchase_id: number;
    branch_id: number;
    branch_name: string;
    customer_name: string | null;
    sales_rep_id: number;
    sales_rep_name: string;
    total_amount: number;
    payment_status: PaymentStatus;
    purchase_date: Date;
}

/**
 * View for modifying employees
 */
interface IAdminModifyEmployeeView {
    id: number;
    name: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: Date;
    employment_type: "full_time" | "part_time";
    work_schedule_id: number;
    location_id: number;
    role_id: number;
}


/**
 * View for modifying payrolls
 */
interface IAdminModifyPayrollView {
    id: number;
    employee_id: number;
    payment_id: number;
}

/**
 * View for modifying payments
 */
interface IAdminModifyPaymentView {
    id: number;
    payment_type: PaymentTypeDB;
    payment_method: PaymentMethodDB;
    payment_status: PaymentStatusDB;
    amount: number;
    payment_date: Date;
}
