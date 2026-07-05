import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/APIerror.js";
import { connectData } from "../DB/index.db.js";
import { Application } from "../models/application.models.js";
import { APIresponse } from "../utils/APIresponse.js";


const deleteApplication = asyncHandler(async(req,res,next) =>{
    const { id } = req.params

    const applicationDelete = await  Application.findOneAndDelete({
        _id: id,
        owner: req.user._id
    })

    if(!deleteApplication){
        throw new APIerror(404,"Data not found")
    }
    return res.status(200).json(
        new APIresponse(200,"data is deleted")
    )
}) 

export { deleteApplication }