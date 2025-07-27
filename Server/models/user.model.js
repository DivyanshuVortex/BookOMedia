import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  booksId: {
    type: [String],
    default : [],
  },
});


const User = mongoose.model("User", userSchema);
export default User;
