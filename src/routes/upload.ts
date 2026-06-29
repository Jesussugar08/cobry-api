import { Router } from 'express'
import {getPresignedUrl} from '../controllers/uploadControllers'

const router = Router()

router.post('/', getPresignedUrl)

export default router
