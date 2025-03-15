const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,trim:true,required:true},
    email:{type:String,required:true,trim:true,unique: true},
    number:{type:Number,required:true},
    role:{
        type:String,
        enum:["Seller","Customer"],
        required:true,
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"

        }
    ]
},
{timestamps:true});

module.exports=mongoose.model("User",userSchema)