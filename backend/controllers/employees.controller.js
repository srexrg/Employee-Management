import { z } from "zod";
import t_Employee from "../models/Employees.js";

const employeeSchema = z.object({
  f_Name: z.string(),
  f_Email: z.string().email(),
  f_Mobile: z.string(),
  f_Designation: z.string(),
  f_gender: z.string(),
  f_Course: z.string(),
  f_Image: z.any(),
});

export const createEmployee = async (req, res) => {
  try {
    const { success, data } = employeeSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Incorrect inputs",
      });
    }

    const existingEmployee = await t_Employee.findOne({
      f_Email: data.f_Email,
    });

    if (existingEmployee) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    const path = req.file.filename;

    const newEmployee = new t_Employee({
      f_Name: data.f_Name,
      f_Email: data.f_Email,
      f_Image: path,
      f_Mobile: data.f_Mobile,
      f_Designation: data.f_Designation,
      f_gender: data.f_gender,
      f_Course: data.f_Course,
    });

    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await t_Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const existingEmployee = await t_Employee.findById(id);

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Use deleteOne() method to delete the employee
    await t_Employee.deleteOne({ _id: id });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee" });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = employeeSchema.safeParse(req.body);

    const existingEmployee = await t_Employee.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if a file was uploaded
    let imagePath = existingEmployee.f_Image;
    if (req.file) {
      imagePath = req.file.filename;
    }

    // Update employee fields
    existingEmployee.f_Name = data.f_Name || existingEmployee.f_Name;
    existingEmployee.f_Email = data.f_Email || existingEmployee.f_Email;
    existingEmployee.f_Image = imagePath;
    existingEmployee.f_Mobile = data.f_Mobile || existingEmployee.f_Mobile;
    existingEmployee.f_Designation = data.f_Designation || existingEmployee.f_Designation;
    existingEmployee.f_gender = data.f_gender || existingEmployee.f_gender;
    existingEmployee.f_Course = data.f_Course || existingEmployee.f_Course;

    await existingEmployee.save();

    res
      .status(200)
      .json({
        message: "Employee updated successfully",
        employee: existingEmployee,
      });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: "Failed to update employee" });
    console.log(err.message)
  }
};
