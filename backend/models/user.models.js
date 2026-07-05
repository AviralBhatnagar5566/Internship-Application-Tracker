import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"



const userSchema =  new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    DOB:{
        type:String,
        required:true,
        
    },
    
    refeshtoken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function (params) {
    if(!this.isModified("password"))return;

    this.password = await bcrypt.hash(this.password,10)

})

userSchema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateaccesstoken =  function () {
    return jsonwebtoken.sign({
        _id:this._id,
        email:this.email
    },process.env.Access_Token_Serect,
    {
        expiresIn:process.env.Access_Token_Expiry
    }
)
}
userSchema.methods.generaterefershtoken =  function () {
    return jsonwebtoken.sign({
        _id:this._id,
    },process.env.Refresh_Token_Serect,
    {
        expiresIn:process.env.Refresh_Token_Expiry
    }
)
}



export const User = mongoose.model("user",userSchema)