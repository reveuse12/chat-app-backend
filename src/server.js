import express from "express";
import connectDB from "./db/connectDB.js";
import configureMiddleware from "./utils/server/configureMiddleware.js";
import logger from "./services/logger.js";
import pulse from "./utils/heartbeat.js";
import { getRoutes } from "./routes/index.js";
(async function main() {
    try {
        logger.info("Starting server...");

        const app = express();

        await configureMiddleware(app);

        await connectDB();

        app.use("/api", getRoutes());

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
        logger.info("Server started");

        setInterval(() => pulse(), 30000);
    } catch (ex) {
        logger.error(`[critical error] ${ex}`);
    }
})();
