const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
   name:{
    type:String,
    trim:true,
    required:true
   },
   description:{
    type:String,
    trim:true,
    required:true,
   },
   quantity: { 
    type: Number, 
    required: true, 
    default: 1 

   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
   },
   price:{
    type:Number,
    required:true
   },
   seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   }
},
{timestamps:true});

module.exports=mongoose.model("Product",productSchema)