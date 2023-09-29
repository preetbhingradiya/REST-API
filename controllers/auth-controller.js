const User = require("../model/user-mode");
const bcrypt = require("bcrypt");

//Register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPassword });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
};

//Login
const loginUser=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json("User can not found")

        const validPassword=await bcrypt.compare(req.body.password,user.password)
        if( !validPassword) return res.status(400).json("Plase chack youe Email or Password")

        res.status(200).json({messase:"Loggin User",user})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {registerUser,loginUser};
