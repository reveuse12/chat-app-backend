import express from "express";
import connectDB from "./db/connectDB.js";
import configureMiddleware from "./utils/server/configureMiddleware.js";

(async function main() {
    try {
        const app = express();

        await configureMiddleware(app);

        await connectDB();

        app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        console.log("error in main");
        console.log(error);
        process.exit(1);
    }
})();
