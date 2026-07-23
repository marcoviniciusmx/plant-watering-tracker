import { Router } from 'express'
import { plantsList, createPlant, updatePlant, deletePlant, waterPlant } from '../controllers/plants.controllers.js'

const router = Router()

router.get('/', plantsList)
router.post('/', createPlant)
router.patch('/:id', updatePlant)
router.delete('/:id', deletePlant)

router.patch('/:id/water', waterPlant)

export default router