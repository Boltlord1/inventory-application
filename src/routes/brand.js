import { Router } from 'express'
import controller from '../controllers/brand.js'

const router = Router()

router.get('/', controller.getAll)
router.get('/new', controller.getNew)
router.get('/:id', controller.getOne)

router.post('/new', controller.postNew)

export default router