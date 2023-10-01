const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc:{
      type:String,
      max:30
    },
    city:{
      type:String,
      default:"Surat"
    },
    form:{
      type:String,
      max:30
    },
    relationship:{
      type:Number,
      enum:[1,2,3]
    },
    createAt:{
      type:Date,
      default:Date.now()
    }
  },
  { timestemps: true }
);

const User=mongoose.model("user",UserSchema)

module.exports=User
