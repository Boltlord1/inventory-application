import { getAllItems, getItem, getBoth } from '../database/select.js'

async function getAll(req, res) {
    const rows = await getAllItems()
    res.render('item/all', { rows: rows })
}

async function getOne(req, res) {
    const id = req.params.id
    const item = await getItem(Number(id))
    if (item === null) {
        return
    }
    res.render('item/one', { item: item })
}

async function getNew(req, res) {
    const { categories, brands } = await getBoth()
    res.render('item/new', { categories: categories, brands: brands })
}

export default {
    getAll,
    getOne,
    getNew
}