import bcryptjs from "bcryptjs"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
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


export const login = async (req,res,next)=>{
   const {email,password} = req.body;
   try {
            const validUser = await User.findOne({email})
            if (!validUser) return next(errorHandler(404,`user not found `));
     
            const validPassword = bcryptjs.compareSync(password,validUser.password);
            if(!validPassword) return next(errorHandler(401,'wrong credential!'));
     
            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
            res.cookie('access_token',token,{http:true}).
            status(202).
            json(validUser);
     
       } catch (error) {
       next(error )
   }
};