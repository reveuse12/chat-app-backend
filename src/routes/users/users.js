import express from "express";
import { loginUser, registerUser } from "../../controllers/users.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    res.json({ message: "user routers" });
});

userRoutes.route("/register").post(registerUser);

userRoutes.route("/login").post(loginUser);

export default userRoutes;
