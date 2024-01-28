import * as express from "express";
import userRoutes from "./users/users.js";
const router = express.Router();

export const getRoutes = () => {
    router.get("/", (req, res) => {
        res.json({ message: "Hello World!" });
    });

    router.use("/users", userRoutes);
    return router;
};
