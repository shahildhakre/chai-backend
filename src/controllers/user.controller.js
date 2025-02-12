import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from  "../utils/cloudinary.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get users details from frontend
    // validation -- not empty
    // check if user already exists or not: using username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar uploading check
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {username, email, fullName, password} = req.body
    // console.log("email: ", email); // debugging using postman

    // if(fullName == "") {
    //     throw new ApiError(400, "FullName is required")
    // }

    // instead of writing multiple if-else for validation, we can do this:
    if(
        [fullName, email, username, password].some((field) => 
            field?.trim() === ""
        )
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }
    // console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    // alternate method to check for coverImageLocalPath
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url  || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )   
})

export {registerUser}