import jwt from 'jsonwebtoken'

const authAdmin = async(req,res,next)=>{
    try{
        const {atoken} = req.headers
        if(!atoken){
            return res.status(401).json({success:false, message:"Not authorized, please login"})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false, message:"Not authorized, please login"})
        }
        //if token verification is true - then the add-doctor route is executed , else cant add-doctor
        next()


    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

export default authAdmin