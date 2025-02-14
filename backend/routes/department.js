import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addDepartment } from '../controller/departmentController.js'
const router = express.Router()

router.post("/add",authMiddleware,addDepartment)

export default router