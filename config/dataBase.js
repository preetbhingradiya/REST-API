const mongoose=require("mongoose")

const connect=async()=>{
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    console.log("connect to the DB")
}

module.exports=connect
