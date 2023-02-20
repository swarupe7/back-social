import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },
    content:{
        type:String

    },
    contact:{
        type:Number,
        required:true,
        minlength:4
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"social-media",
        required:true
    }
})






export default  mongoose.model("Blog",blogSchema);