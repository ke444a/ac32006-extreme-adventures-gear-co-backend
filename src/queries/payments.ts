import knex from "@/config/db";
import { SalesRepresentativeViews } from "@/config/enums";

const createPayment = async (paymentType: PaymentType, paymentMethod: PaymentMethod, paymentStatus: PaymentStatus, amount: number) => {
    const [paymentId] = await knex("payment").insert({
        payment_type: paymentType,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        amount: amount
    });
    return paymentId;
};

const updatePayment = async (paymentId: number, paymentStatus: PaymentStatus) => {
    await knex(SalesRepresentativeViews.MODIFY_PAYMENT).where("id", paymentId).update({ payment_status: paymentStatus });
};

const getPaymentById = async (paymentId: number) => {
    return await knex("payment").where("id", paymentId).first<IPaymentDatabase>();
};

export {
    createPayment,
    updatePayment,
    getPaymentById
};
