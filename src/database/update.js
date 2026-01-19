import pool from './pool.js'

async function updateCategory(id, name, desc) {
    await pool.query('UPDATE category SET cat_name = $1, cat_desc = $2 WHERE cat_id = $3', [name, desc, id])
}

async function updateBrand(id, name, desc) {
    await pool.query('UPDATE brand SET brand_name = $1, brand_desc = $2 WHERE brand_id = $3', [name, desc, id])
}

async function updateItem(id, name, stock, cat, brand) {
    await pool.query('UPDATE item SET item_name = $1, item_stock = $2, cat_id = $3, brand_id = $4 WHERE item_id = $5',
        [name, stock, cat, brand, id])
}

export {
    updateCategory,
    updateBrand,
    updateItem
}