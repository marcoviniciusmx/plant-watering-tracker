import { Router } from 'express'
import { plantsList } from '../controllers/plants.controllers.js'

const router = Router()

router.get('/', plantsList)

export default router