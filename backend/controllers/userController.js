import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

//api to register user
const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Please fill all the fields"})
        }
        //check if email is valid or not
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Please add valid email"})
        }
        // 3. Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already registered with this email" });
        }
        //validate password
        if(password.length<8){
            return res.status(400).json({success:false,message:"Enter a strong password that is at least 8 characters long"})
        }
        //user pasword hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }
        
        const newUser = new userModel(userData)
        const user = await newUser.save()

        //creating token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.status(200).json({success:true,message:"User registered successfully",token})

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})


    }
}

//api for user login

const loginUser = async(req,res)=>{

    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({success:false,message:"User doesnt exist"})
        }
        //password matching
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.status(200).json({success:true,message:"User logged in successfully",token})
        }else{
            res.status(400).json({success:false,message:"Invalid Credentials"})
        }

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }

}

//api for getting the profile
const getProfile = async(req,res)=>{
    try{
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')
        res.status(200).json({success:true,userData})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

//update user profile
const updateProfile = async(req,res)=>{
    try{
        const {name,phone,dob,gender,address} = req.body
        const userId = req.userId
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.status(400).json({success:false,message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if(imageFile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        res.status(200).json({success:true,message:"Profile updated successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})

    }
}

export {registerUser, loginUser, getProfile, updateProfile}