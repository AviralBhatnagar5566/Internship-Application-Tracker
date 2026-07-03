import { asyncHandler } from "../utils/asyncHandler.js";
import { APIresponse } from "../utils/APIresponse.js";
import { APIerror } from "../utils/APIerror.js";
import { User } from "../models/user.models.js";

const generateAccessTokenRefershToken = async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accesstoken =  user.generateaccesstoken()
        const refeshtoken = user.generaterefershtoken()

         user.refeshtoken = refeshtoken
        await user.save({validateBeforeSave: false})

        return { accesstoken, refeshtoken }
    } catch (error) {
        throw new APIerror(500,"unauthorized")
    }
}


const registerUser = asyncHandler(async(req,res) =>{
    const {username,email,password,DOB} = req.body

    if(!username||!username.trim()){
        throw new APIerror(400,"Username is required")
    }
    if(!email||!email.trim()){
        throw new APIerror(400,"Email is required")
    }
    if(!email.includes("@")){
        throw new APIerror(400,"Needs a correct Email")
    }
    if(!password){
        throw new APIerror(400,"Password is required")
    }
    if(!DOB){
        throw new APIerror(400,"Date of birth Required")
    }

    const existedUser = await User.findOne({
        $or:[ {username}, {email} ]
    })
    if(existedUser){
        throw new APIerror(400,"User alraedy Existed")
    }

    const user = await User.create({
        username,
        email,
        password,
        DOB
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new APIerror(500,"Something went wrong")
    }

    return res.status(201).json(
        new APIresponse(201,createdUser,"User succesfully registered")
    )
})

const loginUser = asyncHandler(async(req,res) =>{
    const { email,password } = req.body

    if(!email){
        throw new APIerror(400,"email is required in login")
    }
    if(!password){
        throw new APIerror(400,"Password is required in login")
    }
    const Finduser = await User.findOne({
        email
    })

    const checkpassword = await Finduser.ispasswordcorrect(password)

    if(!checkpassword){
        throw new APIerror(400,"Password is wrong")
    }

    const { accesstoken,refeshtoken } = await generateAccessTokenRefershToken(Finduser._id)

    const isloggedIn = await User.findById(Finduser._id).select("-password -refeshtoken")

   const option = {
        httpOnly:true,
        secure:true
   }

   res.status(200).cookie("accesstoken",accesstoken,option).cookie("refeshtoken",refeshtoken,option).json(new APIresponse(200,{
    user:isloggedIn,accesstoken,refeshtoken
   },"User successfully Login"
))
})

export { registerUser,loginUser }