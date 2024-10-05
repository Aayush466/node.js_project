import { asyncHandler } from "../utils/asyncHandler.js";

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
})