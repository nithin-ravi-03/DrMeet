import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express()
const PORT = process.env.PORT || 4000;
connectDB()
connectCloudinary()


//middleware
app.use(cors())
app.use(express.json());

//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

//routes
app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))

