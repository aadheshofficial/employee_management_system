import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { applyLeave ,getLeave} from '../controller/leaveController.js'

const router = express.Router()

router.get("/:id",authMiddleware,getLeave)
router.post("/apply",authMiddleware,applyLeave)


export default router