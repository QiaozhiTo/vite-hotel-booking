import { getAuth } from "@clerk/express";
import User from "../models/User.js";
// Middleware to check if user is authenticated 

export const protect = async (req, res, next) =>{
    console.log('Authorization:', req.headers.authorization);
console.log('req.auth:', req.auth); // 或 getAuth(req)

    // const {userId} = res.auth;
    const { userId } = getAuth(req)
    if (!userId) {
        res.json({success: false, message:"Not authenticated"})
    } else{
        const user = await User.findById(userId);
        req.user = user;
        next()
    }

}