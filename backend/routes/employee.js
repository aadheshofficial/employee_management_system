import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addEmployee ,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeeByDeptId,deteleEmpleeById} from '../controller/employeeController.js'
const router = express.Router()

router.get("/",authMiddleware,getEmployees)
router.post("/add",authMiddleware,upload.single('image'),addEmployee)
router.get("/:id",authMiddleware,getEmployee)
router.put("/:id",authMiddleware,updateEmployee)
router.get("/department/:id",authMiddleware,fetchEmployeeByDeptId)
router.delete("/delete/:id", authMiddleware,deteleEmpleeById)

export default router