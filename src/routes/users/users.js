import express from "express";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    res.json({ message: "user routers" });
});

export default userRoutes;
