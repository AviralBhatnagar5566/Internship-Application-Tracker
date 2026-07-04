import { JsonWebTokenError } from "jsonwebtoken";
import { APIerror } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";


const verifyJWT = asyncHandler(async(req,_,next) =>{
    const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new APIerror(400,"Unauthorized")
    }

    const verifyToken = JsonWebTokenError.verify(token,process.env.Access_Token_Serect)

    const user = await User.findById(verifyToken._id).select("-password -refeshtoken" )

    if(!user){
        throw new APIerror(401,"User data is deleted or blocked")
    }
    req.user = user
    next()
})

export { verifyJWT }