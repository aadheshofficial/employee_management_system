import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addDepartment ,getDepartments , getDepartment,updateDepartment} from '../controller/departmentController.js'
const router = express.Router()

router.get("/",authMiddleware,getDepartments)
router.post("/add",authMiddleware,addDepartment)
router.get("/:id",authMiddleware,getDepartment)
router.put("/:id",authMiddleware,updateDepartment)


export default router