const Token = require('../model/TokenModel')
const User = require('../model/UserModel')
// const {url} = require('inspector')
const crypto =require('crypto')
const {sendEmail} = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const { cookie } = require('express-validator')

exports.addUser=async (req,res)=>{
    //find user
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:'user already exist. Create new one or login with differenct account'})
    }
    let userToAdd = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    })
    //generate token
    let token = new Token({
        token:crypto.randomBytes(24).toString('hex'),
        user:userToAdd._id
    })
    token = await token.save();
    if(!token){
        return res.status(400).json({error:'Token generation failed'})
    }
    //send token in email
     const url= `${process.env.REACT_APP_FRONTEND_URL}/confirm/${token.token}`
     sendEmail({
        from:"noreply@timeLogger.com",
        to:req.body.email,
        subject:"Email Verification",
        text:'Click here to verify email',
        html:`<a href=${url}><button>Click To Verify</button></a>`
     })
     userToAdd = await userToAdd.save()
     if (!userToAdd) {
        return res.status(400).json({ error: "something went wrong" })
    }
        return res.send(userToAdd)
        // return res.status(200).json({success:"congratulations, you registered successfully"})
    
}
// email verification
exports.emailVerify= async (req,res) =>{
    let token = await  Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error:"invalid token"})
    }
    // check user
    let user = await User.findOne(token.user)
    if(!user){
        return res.status(400).json({error:"user not found"})
    }
    // check user is verified or not
    if(user.isVerified){
        return res.status(400).json({error:"user is verified already"})
    }
    user.isVerified=true
    user = await user.save();
    if(!user){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.status(200).json({message:"Email verified successfully"})

}
//sign in
exports.signIn=async (req,res)=>{
    const {email,password}=req.body
    // check user ?
    let user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({error:"user does not exist"})
    }
    //check password
    if(!user.authenticate(password)){
        return res.status(400).json({error:"invalid password"})
    }
    //check verified or not
    if(!user.isVerified){
        return res.status(400).json({error:"user not verified yet"})
    }
    //generate login token
    let token = jwt.sign({user:user._id,role:user.role},process.env.JWT_SECRET)
    // set cookie 
    res.cookie('mycookie',token,{expire:Date.now() + 86400})
    //send information to user
    const {_id,firstname,role}=user
    return res.status(200).json({token,user:{_id,firstname,role,email}})


}
// signout
exports.signOut = async (req,res)=>{
    let response = await res.clearCookie('mycookie')
    if(!response){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.status(200).json({success:"logout successfully"})
}
