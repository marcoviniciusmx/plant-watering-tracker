import { Router } from 'express'
import { plantsList, createPlant } from '../controllers/plants.controllers.js'

const router = Router()

router.get('/', plantsList)
router.post('/', createPlant)

export default router