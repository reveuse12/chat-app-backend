import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import logger from "../../services/logger.js";
const configureMiddleware = (app) => {
    try {
        dotenv.config();

        app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

        app.use(bodyParser.json({ limit: "2mb" }));

        app.use(cors());
        return app;
    } catch (ex) {
        logger.error(`[critical-error]- ${JSON.stringify(ex)}`);
    }
};

export default configureMiddleware;
