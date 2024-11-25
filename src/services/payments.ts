import { 
    getAllPayrollsQuery,
    createPayrollQuery,
    updatePaymentQuery,
    deletePayrollQuery,
    getAllPaymentsQuery,
    createPaymentForPayrollQuery,
    getPaymentIdByPayrollQuery
} from "@/queries/payments";

class PaymentsService {
    public async getAllPayrolls() {
        return await getAllPayrollsQuery();
    }

    public async createPayroll(employeeId: number, paymentData: RequestBodyPOST["PAYMENT"]) {
        const paymentId = await createPaymentForPayrollQuery("customer", paymentData.paymentMethod, paymentData.paymentStatus, paymentData.amount);
        return await createPayrollQuery(employeeId, paymentId);
    }

    public async updatePayroll(payrollId: number, paymentData: RequestBodyPATCH["PAYMENT"]) {
        const updateData: Partial<IAdminModifyPaymentView> = {
            ...(paymentData.paymentMethod && { payment_method: paymentData.paymentMethod }),
            ...(paymentData.paymentStatus && { payment_status: paymentData.paymentStatus }),
            ...(paymentData.amount && { amount: paymentData.amount }),
        };
        const paymentId = await getPaymentIdByPayrollQuery(payrollId);
        return await updatePaymentQuery(paymentId, updateData);
    }

    public async deletePayroll(payrollId: number) {
        return await deletePayrollQuery(payrollId);
    }

    public async getAllPayments() {
        return await getAllPaymentsQuery();
    }
}

export default new PaymentsService();
