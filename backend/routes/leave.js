import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { applyLeave ,getLeave,fetchLeave} from '../controller/leaveController.js'

const router = express.Router()

router.get("/",authMiddleware,fetchLeave)
router.get("/:id",authMiddleware,getLeave)
router.post("/apply",authMiddleware,applyLeave)


export default router