import mongoose from "mongoose";

const dbconnect= async ()=>{
    await mongoose.connect('mongodb://localhost:27017/authpro');
    console.log('mongodb connected');
    
}

export default dbconnect;