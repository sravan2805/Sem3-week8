import mongoose from "mongoose";
const listSchema = new mongoose.Schema({
    data:{
        type:String,
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todolist:{
    type: [listSchema], // Nested list schema
    default: [],
  }
});

const User = mongoose.model("user", UserSchema);
export default User;
