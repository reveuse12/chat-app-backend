import express from "express";
import { registerUser } from "../../controllers/users.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    res.json({ message: "user routers" });
});

userRoutes.route("/register").post(registerUser);

export default userRoutes;
