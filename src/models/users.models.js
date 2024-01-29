import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unique: true, // Corrected typo "unquie" to "unique"
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true, // Corrected typo "unquie" to "unique"
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            maxlength: 20,
        },
    },
    { timestamps: true }
);

// Define the pre-save middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Define instance methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

// Compile the model from the schema
const User = mongoose.model("User", userSchema);

export default User;
