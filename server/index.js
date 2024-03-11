const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 8000;
let User = require("./models/userModel")
let jwt = require("jsonwebtoken")
var cors = require('cors');


app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://mazhar:mazhar123@mydatabase.fbzxbm2.mongodb.net/").then(()=>console.log("Connected to DB !")).catch(()=>console.log("Not connected to db"))

app.post("/signup",async (req,res)=>{
   
     try {
         let newUser =  new User(req.body)
         await newUser.save()
         let token = jwt.sign({_id : newUser._id},"mynameismazharalisiddiqi",{
            expiresIn:"7d"
         })
         
     res.json({
         message : "User signup successfully",
         token : token,
         data : newUser
     })
     } catch (error) {
         res.json({
            message : error,
            data : "CANNOT SIGNUP USER !"
         })
     }
 
 })
 
 app.post("/login",async (req,res)=>{
    let {email,password} = req.body
  try {
    let checkUser = await User.findOne({email,password})
    // let notCheckUser = await !User.findOne({email,password})
    let token = jwt.sign({_id : checkUser._id},"mynameismazharalisiddiqi",{
        expiresIn:"7d"
     })

    if(checkUser){
        res.json({
            message : "User logged In Successfully",
            token : token,
            data : checkUser
        })
    }else{
        res.json({
            message : "Invalid credentials !"
        })
    }
  
  } catch (error) {
    res.json({
        message : "error",
        data : error
    })
  }
 })

app.get("/",(req,res)=>{
    res.send("Welcome to the other side")
})

app.listen("8000",(req,res)=>{
console.log(`Welcome to Port ${port}`)
})