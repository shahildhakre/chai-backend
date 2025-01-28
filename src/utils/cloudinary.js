import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; // a package included with node, to manage files

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// We are uploading the file in two steps, first uploading on our local server
// using multer, and then uploading from our local server to cloudinary.
// It is a good practice, done in production, 
// Here, we are doing the second step.

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        
        // file has been uploaded successfully
        // console.log("File is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } 
    catch (error) {
        // remove the locally save temporary file as the upload operation got failed.
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary}