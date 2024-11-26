import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const ExpressConfig = (): Application => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
    app.use(cookieParser());
    return app;
};

export default ExpressConfig;
