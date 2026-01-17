import { getAllItems } from '../database/queries.js'

async function getAll(req, res) {
    const rows = await getAllItems()
    res.render('items', { rows: rows })
}

async function getOne(req, res) {
    res.render('item')
}

export default {
    getAll,
    getOne
}