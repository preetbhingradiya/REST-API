const express=require('express')
const dotenv=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")
const connect = require('./config/dataBase')


const app=express()
//Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
dotenv.config()

app.get('/',(req,res)=>{
    res.send("chi")
})

app.listen(process.env.PORT,()=>{
    console.log(`connect to the PORT:-${process.env.PORT}`)
    connect()
})