import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const configureMiddleware = (app) => {
    try {
        dotenv.config();

        app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

        app.use(bodyParser.json({ limit: "2mb" }));

        app.use(cors());
        return app;
    } catch (error) {
        console.log("error in middleware", error);
    }
};

export default configureMiddleware;
