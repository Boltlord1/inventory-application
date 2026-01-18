import { getAllCategories, getCategory } from '../database/select.js'

async function getAll(req, res) {
    const rows = await getAllCategories()
    res.render('category/all', { rows: rows })
}

async function getOne(req, res) {
    const id = req.params.id
    const result = await getCategory(Number(id))
    if (result === null) {
        return
    }
    res.render('category/one', { row: result.category, products: result.products })
}

async function getNew(req, res) {
    res.render('category/new')
}

export default {
    getAll,
    getOne,
    getNew
}