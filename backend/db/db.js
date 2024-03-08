import mongoose from "mongoose"



const connectDB = async () =>{

  try {

    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Connected to MongoDB")
    
  } catch (error) {
    console.log("Unable to connect to MONGODB",error)
    
  }
}

export default connectDB;