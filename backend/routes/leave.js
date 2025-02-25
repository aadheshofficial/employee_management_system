import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { applyLeave ,getLeave,fetchLeave,getLeaveById, updateLeaveById} from '../controller/leaveController.js'

const router = express.Router()

router.get("/",authMiddleware,fetchLeave)
router.put("/update/:id",authMiddleware,updateLeaveById)
router.get("/detail/:id",authMiddleware,getLeaveById)
router.get("/:id",authMiddleware,getLeave)
router.post("/apply",authMiddleware,applyLeave)


export default router