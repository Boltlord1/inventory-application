import { getAllCategories, getCategory } from '../database/queries.js'

async function getAll(req, res) {
    const rows = await getAllCategories()
    res.render('categories', { rows: rows })
}

async function getOne(req, res) {
    const id = req.params.id
    const result = await getCategory(Number(id))
    if (result === null) {
        return
    }
    res.render('category', { row: result.category, products: result.products })
}

export default {
    getAll,
    getOne
}