const express=require("express");
require("dotenv").config();
const connect=require("./config/Db");
const app=express();
const router=require("./routes/Routes")
app.use(express.json());
connect();


app.use("/api",router)
app.listen(process.env.PORT,()=>{
    console.log(`Server run on port ${process.env.PORT}`)
})

