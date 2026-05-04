
import catchError from '../../../middleware/catchError.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';
import userModel from '../../../../db/models/user.model.js';
import AppError from '../../../utils/appError.js';


const addUser= catchError(async(req,res) =>{
    let user = new userModel(req.body)
    let added = await user.save()
    res.json({message:"Done", added})
})

const getAllUsers = catchError(async (req, res) => {

    let apiFeature = new APIFeature(userModel.find(), req.query)
        .search()
        .filters()
        .sort()
        .pagination()
        .select();

    let users = await apiFeature.mongooseQuery;

    res.json({
        message: "Done",
        results: users.length,
        page: apiFeature.pageNumber,
        users
    });
});

const getUserById = catchError(async(req,res) =>{
    let user = await userModel.findById(req.params.id);
    res.json({message:"Done", user})
})


const updateUser= catchError(async(req,res) =>{
    // findOneAndUpdate
    // findByIdAndUpdate
    let updatedUser = await userModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    updatedUser && res.json({message:"Done", updatedUser})
    !updatedUser && res.json({message:"not found user"})
})

const deleteUser= deleteOne(userModel)



const checkEmail =async (req,res,next) =>{
   let user=  await userModel.findOne({email:req.body.email})
   user && next(new AppError("user already exist",409))
   req.user = user
   next()
}

export {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    checkEmail
}