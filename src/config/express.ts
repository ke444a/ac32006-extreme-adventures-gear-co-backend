import express, { Application } from "express";
import cors from "cors";

const ExpressConfig = (): Application => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    return app;
};

export default ExpressConfig;
