import { getAllBrands } from '../database/queries.js'

async function getAll(req, res) {
    const rows = await getAllBrands()
    res.render('brands', { rows: rows })
}

async function getOne(req, res) {
    res.render('brand')
}

export default {
    getAll,
    getOne
}