import { Mongoose } from "mongoose";

const Schema = Mongoose.Schema

const productSchema = new Mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    }
})

export default Mongoose.model('Product', productSchema)