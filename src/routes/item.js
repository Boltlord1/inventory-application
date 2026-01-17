import { Router } from 'express'
import controller from '../controllers/item.js'

const router = Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)

export default router