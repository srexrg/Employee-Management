import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import multer from "multer";
import cors from "cors"
import {
  createEmployee,
  editEmployee,
} from "./controllers/employees.controller.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log("Hello");
  res.status(201).json({
    message: "Hello",
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now()+ path.extname(file.originalname));
  },
});

const fileFilter = (req,file,cb) =>{
  const allowed = ['image/png','image/jpg','image/jpeg']
  if(allowed.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(null,false)
  }
}


const upload = multer({
  storage: storage,
  fileFilter
});

app.post("/api/employee/create", upload.single("f_Image"), createEmployee);
app.patch("/api/employee/edit/:id", upload.single("f_Image"), editEmployee);

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);

app.listen(port, (req, res) => {
  connectDB();
  console.log("Started on 3000");
});
