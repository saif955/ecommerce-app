import { Mongoose } from "mongoose";

const Schema = Mongoose.Schema

const userSchema = new Mongoose.Schema({
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

export default Mongoose.model('User', userSchema)