import { Request, Response } from "express";
import { ResponseStatus } from "@/config/enums";
import PaymentsService from "@/services/payments";
import { convertSnakeCaseToCamel } from "@/utils/convertSnakeCaseToCamel";

export const getAllPayments = async (_req: Request, res: Response) => {
    try {
        const payments = await PaymentsService.getAllPayments();
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { payments: convertSnakeCaseToCamel(payments) } });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const getAllPayrolls = async (_req: Request, res: Response) => {
    try {
        const payrolls = await PaymentsService.getAllPayrolls();
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, data: { payrolls: convertSnakeCaseToCamel(payrolls) } });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const createPayroll = async (req: Request, res: Response) => {
    try {
        const { employeeId, ...payment } = req.body as { employeeId: number } & RequestBodyPOST["PAYMENT"];
        await PaymentsService.createPayroll(employeeId, payment);
        res.status(201).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Payroll created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const updatePayroll = async (req: Request, res: Response) => {
    try {
        const payrollId = parseInt(req.params.payrollId);
        await PaymentsService.updatePayroll(payrollId, req.body as RequestBodyPATCH["PAYMENT"]);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Payroll updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};

export const deletePayroll = async (req: Request, res: Response) => {
    try {
        const payrollId = parseInt(req.params.payrollId);
        await PaymentsService.deletePayroll(payrollId);
        res.status(200).json(<APIResponse>{ status: ResponseStatus.SUCCESS, message: "Payroll deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json(<APIResponse>{ status: ResponseStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};
