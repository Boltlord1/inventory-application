import { getAllItems, getItem } from '../database/queries.js'

async function getAll(req, res) {
    const rows = await getAllItems()
    res.render('items', { rows: rows })
}

async function getOne(req, res) {
    const id = req.params.id
    const item = await getItem(Number(id))
    if (item === null) {
        return
    }
    res.render('item', { item: item })
}

export default {
    getAll,
    getOne
}