import express from "express";
import { deleteEmployee, getEmployee } from "../controllers/employees.controller.js";

const router = express.Router();

router.get('/', getEmployee);
router.delete('/:id', deleteEmployee);

export default router;