import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentsModel from '../models/appointmentModel.js'
import appointmentModel from '../models/appointmentModel.js'

const changeAvailability = async(req,res)=>{
    try{
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.status(200).json({success:true,message:"Availability changed successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

const doctorList = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.status(200).json({success:true,doctors})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

//api for doctor login
const loginDoctor = async(req,res)=>{
    try{
        const{email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.status(404).json({success:false,message:"Doctor not found"})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.status(200).json({success:true,message:"Doctor logged in successfully",token})
        }else{
            res.status(400).json({success:false,message:"Invalid Credentials"})
        }


    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

//api to get doctor appointments for doctor panel
const appointmentsDoctor = async(req,res)=>{
    try{
        const docId = req.docId
        const appointments = await appointmentsModel.find({docId})
        if(appointments){
            return res.status(200).json({success:true,appointments})
        }else{
            return res.status(400).json({success:false,message:"No appointments found"})
        }


    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

//api to mark appointment as completed in doctor appointment page
const appointmentComplete = async(req,res)=>{
    try{
        const docId = req.docId
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.status(200).json({success:true,message:"Appointment marked as completed"})
        }else{
            return res.status(400).json({success:false,message:"Not authorized to mark this appointment as completed"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

//api to cancel doctor appointment in doctor panel
const appointmentCancel = async(req,res)=>{
    try{
        const docId = req.docId
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.status(200).json({success:true,message:"Appointment Cancelled Successfully"})
        }else{
            return res.status(400).json({success:false,message:"Cancellation Failed"})
        }

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})

    }
}


export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor, appointmentComplete, appointmentCancel}