import { Router } from 'express'
import controller from '../controllers/category.js'

const router = Router()

router.get('/', controller.getAll)
router.get('/new', controller.getNew)
router.get('/:id', controller.getOne)

router.post('/new', controller.postNew)
router.post('/:id/delete', controller.postDelete)

export default router