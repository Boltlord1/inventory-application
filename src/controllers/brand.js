import { getAllBrands, getBrand } from '../database/select.js'
import { insertBrand } from '../database/insert.js'

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

export default {
    getAll,
    getOne,
    getNew
}