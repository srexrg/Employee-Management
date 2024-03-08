import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  
  f_userName: {
    type: String,
    required: true,
  },

  f_Pwd: {
    type: String,
    required: true,
  },
});

const t_Login = mongoose.model("t_Login", LoginSchema);

export default t_Login;
