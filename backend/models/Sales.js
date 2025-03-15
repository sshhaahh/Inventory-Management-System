const mongoose=require("mongoose")

const salesSchema=new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Completed","Failed"],
        default:"Pending"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
                                                                 
},
{timestamps:true});

module.exports=mongoose.model("Sales",salesSchema)