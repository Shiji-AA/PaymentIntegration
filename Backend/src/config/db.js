import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectDB(){
try{
    const dbURI=process.env.MONGO_URI
        if(!dbURI){
        throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await mongoose.connect(dbURI)
    console.log('====================================');
    console.log("MongoDB connected");
    console.log('====================================');


}
catch(error){
    console.error(error)
}

}