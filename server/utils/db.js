import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
async function connectionDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected !✅ ')
        return true;
    } catch (error) {
        console.log("Error ! DBconnect.js ",error);
        return false;
    }
}

export default connectionDB;