const express=require("express");
require("dotenv").config();
const cors = require('cors');
const connect=require("./config/Db");
const app=express();
const router=require("./routes/Routes")
app.use(express.json());
connect();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use("/api",router)
app.listen(process.env.PORT,()=>{
    console.log(`Server run on port ${process.env.PORT}`)
})

