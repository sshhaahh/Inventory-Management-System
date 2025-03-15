const mongoose=require("mongoose")
require("dotenv").config()
const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.URL);
        console.log("Database Connected.")
    }
    catch{
        console.log("Failed to connect Database : ",e);
         process.exit(1)

    }
}
module.exports=dbConnection;