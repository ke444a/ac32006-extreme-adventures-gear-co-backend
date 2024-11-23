export {};


declare global {
    // namespace Express {
    //     interface Request {
    //         user: any;
    //     }
    // }

    interface IAPIResponse {
        status: ResponseStatus;
        message: string;
        data?: unknown;
    }
}
