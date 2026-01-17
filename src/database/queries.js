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
    const query = `
    SELECT item_id, item_name, item_stock, item.cat_id, cat_name, item.brand_id, brand_name FROM item
    JOIN brand
    ON item.brand_id = brand.brand_id
    JOIN category
    ON item.cat_id = category.cat_id;
    `

    const { rows } = await pool.query(query)
    return rows
}

export {
    getAllCategories,
    getAllBrands,
    getAllItems
}