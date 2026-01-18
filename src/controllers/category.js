import { validationResult, matchedData } from 'express-validator'
import { getAllCategories, getCategory } from '../database/select.js'
import { insertCategory } from '../database/insert.js'
import { varchar, text } from '../validate.js'

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
    res.render('category/new', { messages: null })
}

async function postNewLast(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const messages = errors.array().map((err) => err.msg)
        res.status(400).render('invalid', { messages: messages, link: '/category/new' })
        return
    }
    const { cat_name, cat_desc } = matchedData(req)
    await insertCategory(cat_name, cat_desc)
    res.redirect('/category')
}

const postNew = [
    varchar('cat_name'),
    text('cat_desc'),
    postNewLast
]

export default {
    getAll,
    getOne,
    getNew,
    postNew
}