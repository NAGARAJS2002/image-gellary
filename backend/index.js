import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import env from "dotenv"
env.config();
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log('database connected');
  
})


app.use('/api/user',userRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
});

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'

    return res.status(statusCode).json({
      success: false,
      statusCode,  
      message,
    })
})