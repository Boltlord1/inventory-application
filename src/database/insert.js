import pool from './pool.js'

async function insertCategory(name, desc) {
    await pool.query('INSERT INTO category (cat_name, cat_desc) VALUES ($1, $2)', [name, desc])
}

async function insertBrand(name, desc) {
    await pool.query('INSERT INTO brand (brand_name, brand_desc) VALUES ($1, $2)', [name, desc])
}

async function insertItem(name, stock, cat, brand) {
    await pool.query('INSERT INTO item (item_name, item_stock, cat_id, brand_id) VALUES ($1, $2, $3, $4)',
        [name, stock, cat, brand])
}

export {
    insertCategory,
    insertBrand,
    insertItem
}