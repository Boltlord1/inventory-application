import pool from './pool.js'

function getItemQuery() {
    return `
    SELECT item_id, item_name, item_stock, item.cat_id, cat_name, item.brand_id, brand_name FROM item
    JOIN brand
    ON item.brand_id = brand.brand_id
    JOIN category
    ON item.cat_id = category.cat_id
    `
}

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM category ORDER BY cat_id;')
    return rows
}

async function getAllBrands() {
    const { rows } = await pool.query('SELECT * FROM brand ORDER BY brand_id;')
    return rows
}

async function getAllItems() {
    const { rows } = await pool.query(getItemQuery().trim() + ' ORDER BY item_id;')
    return rows
}

async function getCategoryWithProducts(id) {
    if (!Number.isInteger(id)) return null
    const { rows } = await pool.query('SELECT * FROM category WHERE cat_id = $1;', [id])
    if (rows.length === 0) return null
    const products = (await pool.query('SELECT item_id, item_name FROM item WHERE cat_id = $1', [id])).rows
    const category = rows[0]
    return { category, products }
}

async function getBrandWithProducts(id) {
    if (!Number.isInteger(id)) return null
    const { rows } = await pool.query('SELECT * FROM brand WHERE brand_id = $1;', [id])
    if (rows.length === 0) return null
    const products = (await pool.query('SELECT item_id, item_name FROM item WHERE brand_id = $1', [id])).rows
    const brand = rows[0]
    return { brand, products }
}

async function getItem(id) {
    if (!Number.isInteger(id)) return null
    const query = getItemQuery().trim() + ' WHERE item_id = $1 ORDER BY item_id;'
    const { rows } = await pool.query(query, [id])
    if (rows.length === 0) return null
    return rows[0]
}

async function getBoth() {
    const categories = (await pool.query('SELECT cat_id, cat_name FROM category')).rows
    const brands = (await pool.query('SELECT brand_id, brand_name FROM brand')).rows
    return { categories, brands }
}

async function getIDs(table, column) {
    const { rows } = await pool.query(`SELECT ${column} FROM ${table};`)
    return rows
}

async function getCategory(id) {
    const { rows } = await pool.query('SELECT * FROM category WHERE cat_id = $1', [id])
    if (rows.length === 0) return null
    return rows[0]
}

async function getBrand(id) {
    const { rows } = await pool.query('SELECT * FROM brand WHERE brand_id = $1', [id])
    if (rows.length === 0) return null
    return rows[0]
}

export {
    getAllCategories,
    getAllBrands,
    getAllItems,
    getCategoryWithProducts,
    getBrandWithProducts,
    getItem,
    getBoth,
    getIDs,
    getCategory,
    getBrand
}