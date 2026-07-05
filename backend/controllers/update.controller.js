import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/APIerror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { Application } from "../models/application.models.js";


const updateApplication = asyncHandler(async(req,res,next) =>{
    const { id } = req.params
    const { CompanyName,roleposition,date,status,applicationlink,notes } = req.body

    const application = await Application.findOneAndUpdate({ 
        _id: id,
        owner: req.user._id},
        { CompanyName,roleposition,date,status,applicationlink,notes },
        { new: true, runValidators: true }
    )
    if(!application){
    throw new APIerror(404,"Application not found")
    }
    return res.status(202).json(
        new APIresponse(202,application,"Data is updated")
)
})

export { updateApplication }