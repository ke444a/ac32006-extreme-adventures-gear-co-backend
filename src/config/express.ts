import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const ExpressConfig = (): Application => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    return app;
};

export default ExpressConfig;
