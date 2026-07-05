import { APIerror } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.models.js";
import { APIresponse } from "../utils/APIresponse.js";


const applications = asyncHandler(async(req,res,next) =>{
    const application = await Application.find({owner: req.user._id})

    return res.status(200).json(
        new APIresponse(200,application,"APPLICATION FOUND")
    )
})


const applicationsByuid = asyncHandler(async(req,res,next) =>{
    const { id } = req.params
    const application = await Application.findOne({
        _id: id,
        owner: req.user._id
    })
    
    if(!application){
        throw new APIerror(404,"Application id not found")
    }
    return res.status(200).json(
        new APIresponse(200,application,"Application id found")
    )
})
export { applications, applicationsByuid }