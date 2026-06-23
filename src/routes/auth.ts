import { register, login, confirmUser } from "../controllers/authControllers";
import {Router} from 'express'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/confirm', confirmUser)

export default router
