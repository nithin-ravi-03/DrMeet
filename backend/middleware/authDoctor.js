import jwt from 'jsonwebtoken'

//Doctor authentication middleware
const authDoctor = async(req,res,next)=>{
    try{
        const {dtoken} = req.headers
        if(!dtoken){
            return res.status(401).json({success:false, message:"Not authorized, please login"})
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)

        req.docId = token_decode.id
        next()


    }catch(error){
        console.log(error)
        return res.status(500).json({success:false, message:error.message})
        

    }
}

export default authDoctor