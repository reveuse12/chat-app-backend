import jwt from "jsonwebtoken";
import User from "../models/users.models.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer", "");
        console.log(token);

        if (!token)
            return res.status(401).json({
                message: "UnAuthorize Request",
            });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded?._id).select(
            "-password -refreshToken"
        );

        if (!user)
            return res.status(401).json({ message: "UnAuthorize Request" });

        req.user = user;
        next();
    } catch (error) {
        console.log("error in jwt", error?.message);
    }
};
