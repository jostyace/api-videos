import { Router } from "express"
import { index } from "./control.js"

const router = Router()

router.get('/usuarios', index)

export default router