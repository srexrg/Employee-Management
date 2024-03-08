import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import multer from "multer";
import {
  createEmployee,
  editEmployee,
} from "./controllers/employees.controller.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

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
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only JPG/PNG files are allowed!"), false);
    }
    cb(null, true);
  },
});

app.post("/api/employee/create", upload.single("picture"), createEmployee);
app.put("/api/employee/:id", upload.single("picture"), editEmployee);

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);

app.listen(port, (req, res) => {
  connectDB();
  console.log("Started on 3000");
});
