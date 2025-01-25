import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

// While connecting to database, always use:
// - async-await(as database is in another continent, so takes time), and 
// - try-catch(because so many problems occur) 

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    }
    catch (error){
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1)
    }
}

export default connectDB