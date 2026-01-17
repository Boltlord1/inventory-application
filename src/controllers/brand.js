import { getAllBrands, getBrand } from '../database/queries.js'

async function getAll(req, res) {
    const rows = await getAllBrands()
    res.render('brands', { rows: rows })
}

async function getOne(req, res) {
    const id = req.params.id
    const result = await getBrand(Number(id))
    if (result === null) {
        return
    }
    res.render('brand', { row: result.brand, products: result.products })
}

export default {
    getAll,
    getOne
}