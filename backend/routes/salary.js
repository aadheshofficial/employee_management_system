import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addSalary, fetchSalaryById } from '../controller/salaryController.js'

const router = express.Router()

// router.get("/",authMiddleware,getEmployees)
router.post("/add",authMiddleware,addSalary)
router.get("/:id",authMiddleware,fetchSalaryById)

export default router