import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addDepartment ,getDepartments} from '../controller/departmentController.js'
const router = express.Router()

router.post("/add",authMiddleware,addDepartment)
router.get("/",authMiddleware,getDepartments)

export default router