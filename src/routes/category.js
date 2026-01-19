import { Router } from 'express'
import controller from '../controllers/category.js'

const router = Router()

router.get('/', controller.getAll)
router.get('/new', controller.getNew)
router.get('/:id', controller.getOne)
router.get('/:id/edit', controller.getEdit)

router.post('/new', controller.postNew)
router.post('/:id/delete', controller.postDelete)
router.post('/:id/edit', controller.postEdit)

export default router