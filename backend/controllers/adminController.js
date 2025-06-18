import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as Cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'


//API for adding doctor
const addDoctor = async(req,res)=>{
    try{
        const {name, email, password, speciality, experience, degree, about, fees, address} = req.body
        const imageFile = req.file
        
        //checking for all data to add the doctor to database
        if(!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address || !imageFile){
            return res.status(400).json({success:false,message: "Please fill all the fields"})

        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Please add valid email"})
        }
//check this aprt later whether to add or not
        // check if doctor already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(409).json({ success: false, message: "Doctor already exists with this email" });
        }
        //validating password
        if(password.length<8){
            return res.status(400).json({success:false,message:"Enter a strong password that is at least 8 characters long"})
        }
        //hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        //upload image to cloudinary
        const imageUpload = await Cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            experience,
            degree,
            about,
            fees,
            address:JSON.parse(address),
            image: imageUrl,
            date:Date.now()
        }
        //save doctor data to database
        const newDoctor = await doctorModel.create(doctorData)
        await newDoctor.save()
        return res.status(201).json({success:true,message:"Doctor added successfully"})
        

    }catch(error){
        console.error("Add Doctor Error:", error);
        return res.status(500).json({success:false,message:error.message || "Internal Server Error"})
    }
}

//API for admin login

const loginAdmin = async (req,res)=>{
    try{
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            return res.status(200).json({success:true,message:"Admin logged in successfully",token})
        }else{
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }


    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})

    }
}

const allDoctors = async (req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
        return res.status(200).json({success:true,doctors})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }

}

export {addDoctor,loginAdmin, allDoctors}