const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
   name:{
    type:String,
    trim:true,
    unique:true,
    required:true
   },
   products:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
   }]
},
{timestamps:true});

module.exports=mongoose.model("Category",categorySchema)