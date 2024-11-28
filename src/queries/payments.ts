import knex from "@/config/db";
import { AdminViews, SalesRepresentativeViews } from "@/config/enums";

const createPaymentForPurchaseQuery = async (paymentType: PaymentTypeDB, paymentMethod: PaymentMethodDB, paymentStatus: PaymentStatusDB, amount: number) => {
    const [paymentId] = await knex<ISalesRepModifyPaymentView>(SalesRepresentativeViews.MODIFY_PAYMENT).insert({
        payment_type: paymentType,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        amount: amount
    });
    return paymentId;
};

const createPaymentForPayrollQuery = async (paymentType: PaymentTypeDB, paymentMethod: PaymentMethodDB, paymentStatus: PaymentStatusDB, amount: number) => {
    const [paymentId] = await knex<IAdminModifyPaymentView>(AdminViews.MODIFY_PAYMENT).insert({
        payment_type: paymentType,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        amount: amount
    });
    return paymentId;
};

const updatePaymentForPurchaseQuery = async (paymentId: number, paymentStatus: PaymentStatusDB) => {
    await knex<ISalesRepModifyPaymentView>(SalesRepresentativeViews.MODIFY_PAYMENT)
        .where({ id: paymentId })
        .update({ payment_status: paymentStatus });
};

const getAllPayrollsQuery = async () => {
    return await knex<IAdminAllPayrollsView>(AdminViews.ALL_PAYROLLS);
};

const getAllPayrollsByLocationQuery = async (locationId: number) => {
    return await knex<IAdminAllPayrollsView>(AdminViews.ALL_PAYROLLS)
        .where({ location_id: locationId });
};

const createPayrollQuery = async (employeeId: number, paymentId: number) => {
    return await knex<IAdminModifyPayrollView>(AdminViews.MODIFY_PAYROLL).insert({
        employee_id: employeeId,
        payment_id: paymentId
    });
};

const getPaymentIdByPayrollQuery = async (payrollId: number): Promise<number> => {
    const [{ payment_id }] = await knex<IAdminModifyPayrollView>(AdminViews.MODIFY_PAYROLL)
        .where("id", payrollId)
        .select("payment_id");

    return payment_id;
};

const getPaymentIdByPurchaseQuery = async (purchaseId: number): Promise<number> => {
    const [{ payment_id }] = await knex("purchase")
        .where("id", purchaseId)
        .select("payment_id");

    return payment_id;
};

const updatePaymentQuery = async (payrollId: number, paymentData: Partial<IAdminModifyPaymentView>) => {
    return await knex<IAdminModifyPayrollView>(AdminViews.MODIFY_PAYMENT)
        .where("id", payrollId)
        .update(paymentData);
};

const deletePayrollQuery = async (payrollId: number) => {
    await knex<IAdminModifyPayrollView>(AdminViews.MODIFY_PAYROLL)
        .where("id", payrollId)
        .delete();
};

const getAllPaymentsQuery = async () => {
    return await knex<IAdminAllPaymentsView>(AdminViews.ALL_PAYMENTS);
}; 

export {
    createPaymentForPurchaseQuery,
    updatePaymentForPurchaseQuery,
    getAllPayrollsQuery,
    createPayrollQuery,
    updatePaymentQuery,
    deletePayrollQuery,
    getAllPaymentsQuery,
    createPaymentForPayrollQuery,
    getPaymentIdByPayrollQuery,
    getAllPayrollsByLocationQuery,
    getPaymentIdByPurchaseQuery
};
