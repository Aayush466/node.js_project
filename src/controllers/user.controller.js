import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 
import {ApiResponse} from "../utils/ApiResponse.js";

export const registerUser=asyncHandler(async(req,res)=>{
    // get user details from frontend 
    //validation - not empty
    //check if user all ready exit 
    //check for images ,check for avatar 
    //uploaded them to cloudinary 
    //create user object - create entry in db 
    //remove password and refresh token field from response 
    //check for user creation 
    //return res

    const {email,userName,fullName,password}=req.body
    console.log("email:",email);
    //validation 
    if([
        fullName,userName,password,email
    ].some((field)=>field?.trim=="")){
        throw new ApiError(400,"All field are required ")
    }

    const existedUser = User.findOne({
        $or:[
            {email},
            {userName}
        ]
    })
    if(existedUser){
        throw new ApiError(409,"User already exist")
    }

    const avatarLocalpath = req.files?.avatar[0]?.path
    const coverImageLocalpath = req.files?.coverImage[0]?.path

    if(!avatarLocalpath){
        throw new ApiError(400,"Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalpath)
    const coverImage = await uploadOnCloudinary(coverImageLocalpath)

    if(!avatar){
        throw new ApiError(500,"Error uploading avatar to cloudinary")
    }
    const user = User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        userName:userName.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if(!createdUser){
        throw new ApiError(500,"Error creating user")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,createdUser,"userCreated successfully ")
    )
})