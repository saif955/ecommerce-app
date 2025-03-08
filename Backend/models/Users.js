import { mongoose } from "mongoose";

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model('User', userSchema)