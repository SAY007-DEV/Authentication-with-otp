import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{type:String, required : true },
    email :{type:String, required:true, unique:true},
    password:{type:String, required : true },
    otp:{type:Number, required: true},
    vilidity:{type:Date}
})
const User= mongoose.model('Users2',UserSchema);
export default User;