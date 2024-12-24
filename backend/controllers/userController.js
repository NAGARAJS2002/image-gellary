import bcryptjs from "bcryptjs"
import User from "../models/userModel.js"

export const register = async (req,res,next) => {
   const {username,email,password} = req.body;
   if (!username||!email||!password){
        return res.status(400).json({error: 'All fields (username, email, password) are required'})
   }
   
   try {
      //hash the password 
      const hashedPasword = bcryptjs.hashSync(password,10);
   
      await User.create({
         username,
         email,
         password:hashedPasword,
      });
   
   res.status(201).json({
      message: "Account created successfully.",
      success: true,
   })
   } catch (error) {
       next(error);
   }
}