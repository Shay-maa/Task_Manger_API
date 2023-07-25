const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const joi = require('joi')
const bcrypt = require('bcryptjs')


const register = async (req, res) => {
  const user = await User.create({ ...req.body});
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
};



const login = async (req, res) => {
  const {error} = validate(req.body)
  if (error){
      return res.status(400).send(error.details[0].message)
  }
let user = await User.findOne({ email: req.body.email }); 
if(!user){
  return res.status(400).send("Enter Valid Email.. ")
}
const userPass = await bcrypt.compare(req.body.password , user.password )
if(!userPass){
  return res.status(400).send("Invalid Password... ")
}
 const token = user.createJWT();
 return res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

function validate (req){
      const schema = {
        email : joi.string().email().required(),
        password : joi.string().min(5).max(80).required()
      }
      return joi.validate(req , schema);
}

module.exports = { login, register };
