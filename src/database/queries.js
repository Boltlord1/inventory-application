import pool from './pool.js'

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM category')
    return rows
}

async function getAllBrands() {
    const { rows } = await pool.query('SELECT * FROM brand')
    return rows
}

async function getAllItems() {
    const items = (await pool.query('SELECT * FROM item')).rows
    const categories = (await pool.query('SELET * FROM category')).rows
    const brand = (await pool.query('SELET * FROM brand')).rows

    items.brandName = brand.name
    items.catName = categories.name

    console.log(items)
    return items
}

export {
    getAllCategories,
    getAllBrands,
    getAllItems
}