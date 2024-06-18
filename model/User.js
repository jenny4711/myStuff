require('dotenv').config();
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
const userSchema=Schema({
  email:{type:String,required:true},
  password:{type:String,required:true},
  name:{type:String,required:true},
  image:{type:String,required:true},
  orgName:{type:String,required:true},
  status:{type:String,default:'free'}
},{timestamps:true});

userSchema.methods.toJSON=function(){
  const obj =this.doc
  delete obj.password;
  delete obj.__v;
  return obj;

}

userSchema.methods.generateToken=async function(){
  const token=await jwt.sign({id:this._id},JWT_SECRET_KEY,{expiresIn:'1h'});
  return token;
}

const User=mongoose.model('User',userSchema);
module.exports=User;

