import { Router } from 'express'
import { plantsList, createPlant, updatePlant } from '../controllers/plants.controllers.js'

const router = Router()

router.get('/', plantsList)
router.post('/', createPlant)
router.patch('/:id', updatePlant)

export default router