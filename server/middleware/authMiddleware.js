import { getAuth } from "@clerk/express";
import User from "../models/User.js";
// Middleware to check if user is authenticated 

export const protect = async (req, res, next) =>{
    console.log('Authorization:', req.headers.authorization);
    console.log('req.auth:', req.auth); // 或 getAuth(req)

    // const {userId} = res.auth;
    const { userId } = req.auth ? req.auth() : getAuth(req);  // handles both styles

    // const { userId } = req.auth;
    if (!userId) {
        res.json({success: false, message:"Not authenticated"})
    } else{
        const user = await User.findById(userId);
        req.userId = userId;
        next();
    }

}