import { validationResult, matchedData } from 'express-validator'
import { getAllItems, getItem, getBoth } from '../database/select.js'
import { insertItem } from '../database/insert.js'
import { deleteItem } from '../database/delete.js'
import { varchar, stock, id } from '../validate.js'

async function getAll(req, res) {
    const rows = await getAllItems()
    res.render('item/all', { rows: rows })
}

async function getOne(req, res) {
    const id = Number(req.params.id)
    const item = await getItem(id)
    if (item === null) {
        return
    }
    res.render('item/one', { item: item })
}

async function getNew(req, res) {
    const { categories, brands } = await getBoth()
    res.render('item/new', { categories: categories, brands: brands })
}

async function postNewLast(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const messages = errors.array().map((err) => err.msg)
        res.status(400).render('invalid', { messages: messages, link: '/item/new' })
        return
    }
    const { item_name, item_stock, cat_id, brand_id } = matchedData(req)
    await insertItem(item_name, item_stock, cat_id, brand_id)
    res.redirect('/item')
}

const postNew = [
    varchar('item_name'),
    stock,
    await id('cat_id'),
    await id('brand_id'),
    postNewLast
]

async function postDelete(req, res) {
    const id = Number(req.params.id)
    if (id !== 1) await deleteItem(id)
    res.redirect('/item')
}

export default {
    getAll,
    getOne,
    getNew,
    postNew,
    postDelete
}