import { validationResult, matchedData } from 'express-validator'
import { getAllCategories, getCategoryWithProducts, getCategory } from '../database/select.js'
import { insertCategory } from '../database/insert.js'
import { deleteCategory } from '../database/delete.js'
import { updateCategory } from '../database/update.js'
import { varchar, text } from '../validate.js'

async function getAll(req, res) {
    const rows = await getAllCategories()
    res.render('category/all', { rows: rows })
}

async function getOne(req, res) {
    const id = Number(req.params.id)
    const result = await getCategoryWithProducts(id)
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

async function postDelete(req, res) {
    const id = Number(req.params.id)
    if (id !== 1) await deleteCategory(id)
    res.redirect('/category')
}

async function getEdit(req, res) {
    const id = Number(req.params.id)
    if (id === 1) {
        res.redirect('/category')
        return
    }
    const result = await getCategory(id)
    res.render('category/edit', { row: result })
}

async function postEditLast(req, res) {
    const errors = validationResult(req)
    const id = Number(req.params.id)
    if (!errors.isEmpty()) {
        const messages = errors.array().map((err) => err.msg)
        res.status(400).render('invalid', { messages: messages, link: `/category/${id}/edit` })
        return
    }
    if (id === 1) {
        res.redirect('/category')
        return
    }
    const { cat_name, cat_desc } = matchedData(req)
    await updateCategory(id, cat_name, cat_desc)
    res.redirect('/category')
}

const postEdit = [
    varchar('cat_name'),
    text('cat_desc'),
    postEditLast
]

export default {
    getAll,
    getOne,
    getNew,
    postNew,
    postDelete,
    getEdit,
    postEdit
}