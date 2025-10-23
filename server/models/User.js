//Logic to store new user data on the backend using clerk webhooks
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    resume: {type:String},
    image:{type:String, required:true},

});

//Create user model using above schema
const User = mongoose.model("User", userSchema);

export default User;