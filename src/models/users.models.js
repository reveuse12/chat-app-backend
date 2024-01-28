import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unquie: true,
        },
        email: { type: String, required: true, unquie: true },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 20,
            unquie: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
