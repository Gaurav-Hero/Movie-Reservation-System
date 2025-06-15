import mongoose from 'mongoose'

const isDatabaseConnected = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Your Database is connected !Just Like a WOW")
       
    } catch (error) {
        console.log("Got some error in config/db.config.js while connecting to DB",error)
    }
}

export default isDatabaseConnected;