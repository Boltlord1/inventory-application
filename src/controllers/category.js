import { getAllCategories } from '../database/queries.js'

async function getAll(req, res) {
    const rows = await getAllCategories()
    res.render('categories', { rows: rows })
}

async function getOne(req, res) {
    res.render('category')
}

export default {
    getAll,
    getOne
}