const userController = {};
const User = require('../model/User');
const admin=require('../utils/firebaseAdmin');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
require('dotenv').config();

userController.autoSignUpIOS=async(req,res)=>{
  try{
    const {image,orgName,token}=req.body;
    const decodedToken=await admin.auth().verifyIdToken(token);
    const {email,name}=decodedToken;
    let user=await User.findOne({email});
    if(!user){
      const randomPassword=""+Math.floor(Math.random()*1000000);
      const salt=await bcrypt.genSalt(10);
      const newPassword=await bcrypt.hash(randomPassword,salt)
      user= new User({
        email,
        name,
        password:newPassword,
        orgName,
        image,
        
      });
      await user.save();
      const sessionToken=await user.generateToken();
      res.status(200).json({status:'success-autoSignUpIOS',user,token:sessionToken})

    }
    const existingUser = await User.findOne({email});
    const sessionToken=await existingUser.generateToken();
    res.status(200).json({status:'success-autoSignUpIOS',user:existingUser,token:sessionToken})

   
  }catch(error){
    console.log(error,'errorUser!!!!!!!!!!!')
    res.status(400).json({status:'fail-autoSignUpIOS',error})
  }

}

userController.getUserIOS=async(req,res) => {
  try{
    const {email}=req.params;
    const user = await User.findOne({email:email});
    if(!user) throw new Error('You do not have an account')
    res.status(200).json({status:'success',user})
  }catch(error){
    console.log(error,'getUserIOS-error')
    res.status(400).json({status:'fail',error})
  }
}


module.exports=userController;
