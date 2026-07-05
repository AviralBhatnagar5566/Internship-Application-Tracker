import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/APIerror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { Application } from "../models/application.models.js";


const applicationform = asyncHandler(async (req,res,next) =>{ 
    console.log("Application controller hit");
    const{CompanyName,roleposition,date,status,applicationlink,notes} = req.body
    if(!CompanyName||!CompanyName.trim()){
        throw new APIerror(401,"Name required")
    }
    if(!roleposition||!roleposition.trim()){
        throw new APIerror(401,"Roleandposition required")
    }
    if(!date){
        throw new APIerror(401,"date required")
    }
    if(!status){
        throw new APIerror(401,"Status required")
    }

    const application = await Application.create({
    CompanyName,
    roleposition,
    date,
    status,
    applicationlink,
    notes,
    owner: req.user._id
})
const createdApplication = await Application.findById(application._id)
     if(!createdApplication){
        throw new APIerror(500,"Something Went Wrong")
    }
    return res.status(201).json(
        new APIresponse(200,createdApplication,"APPLICATION SUBMITTED SUCCESSFULLY")
    )

})



export { applicationform }