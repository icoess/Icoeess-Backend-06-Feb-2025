const express = require("express");
const cors=require("cors")
const dotenv = require("dotenv");
const router = require("./Router/Router")
dotenv.config()


const Port = process.env.PORT || 3000

const app= express()

app.use(cors())
app.use(express.json())
app.use("/api",router)

app.get("/",async(req,res)=>{
    res.send("<h1>Icoess Solutions</h1>")
})

app.listen(Port,()=>{
    console.log(`Server is listen on ${Port}`)
})