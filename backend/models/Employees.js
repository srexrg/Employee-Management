import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  f_Image: {
    data: Buffer,
    type:String,
    required: false, // Assuming image is optional
  },

  f_Name: {
    type: String,
    required: true,
  },

  f_Email: {
    type: String,
    unique:true,
    validate:{
      validator:function(v){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message:props => `${props.value} is not a valid email address!`
    },
    required: true,
  },

  f_Mobile: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]+$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    },
    required: true,
  },

  f_Designation: {
    type: String,
    required: true,
  },

  f_gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },

  f_Course: {
    type: String,
    required: true,
  },

  f_Createdate: {
    type: Date,
    default: Date.now,
  },
});

const t_Employee = mongoose.model("t_Employee", EmployeeSchema);

export default t_Employee;
