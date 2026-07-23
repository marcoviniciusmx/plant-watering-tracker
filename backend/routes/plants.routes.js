import { Router } from 'express'
import { plantsList, createPlant, updatePlant, deletePlant } from '../controllers/plants.controllers.js'

const router = Router()

router.get('/', plantsList)
router.post('/', createPlant)
router.patch('/:id', updatePlant)
router.delete('/:id', deletePlant)

export default router