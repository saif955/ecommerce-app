import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken"


// registerUser
const registerUser = asynchandler(async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).json({
            message: "Please add all fields"
        })
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({
            message: "User already exists"
        })

    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedpassword
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400).json({
            message: "Invalid user data"
        })
    }



})
// login user
const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400)
        throw new Error("Invalid credentials")
    }

})

//generate token for access
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}
export { registerUser, loginUser }