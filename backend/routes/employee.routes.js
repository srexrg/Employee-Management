import express from "express";
import { deleteEmployee, editEmployee, getEmployee, getEmployeeById } from "../controllers/employees.controller.js";

const router = express.Router();

router.get('/', getEmployee);
router.get('/:id', getEmployeeById);
router.delete('/:id', deleteEmployee);

export default router;