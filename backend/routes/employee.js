import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addEmployee ,upload} from '../controller/employeeController.js'
const router = express.Router()

// router.get("/",authMiddleware,getDepartments)
router.post("/add",authMiddleware,upload.single('image'),addEmployee)
// router.get("/:id",authMiddleware,getDepartment)
// router.put("/:id",authMiddleware,updateDepartment)
// router.delete("/:id",authMiddleware,deleteDepartment)


export default router