import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        mongoose.connection.on('connected', ()=>console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`) // project name could be anything you want
    } catch(error){
        console.log(error.message);

    }
    
}
export default connectDB