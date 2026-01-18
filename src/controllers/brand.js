import { validationResult, matchedData } from 'express-validator'
import { getAllBrands, getBrand } from '../database/select.js'
import { insertBrand } from '../database/insert.js'
import { varchar, text } from '../validate.js'

async function getAll(req, res) {
    const rows = await getAllBrands()
    res.render('brand/all', { rows: rows })
}

async function getOne(req, res) {
    const id = req.params.id
    const result = await getBrand(Number(id))
    if (result === null) {
        return
    }
    res.render('brand/one', { row: result.brand, products: result.products })
}

async function getNew(req, res) {
    res.render('brand/new')
}

async function postNewLast(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const messages = errors.array().map((err) => err.msg)
        res.status(400).render('invalid', { messages: messages, link: '/brand/new' })
        return
    }
    const { brand_name, brand_desc } = matchedData(req)
    await insertBrand(brand_name, brand_desc)
    res.redirect('/brand')
}

const postNew = [
    varchar('brand_name'),
    text('brand_desc'),
    postNewLast
]

export default {
    getAll,
    getOne,
    getNew,
    postNew
}