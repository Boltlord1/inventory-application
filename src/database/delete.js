import pool from './pool.js'

async function deleteCategory(id) {
    await pool.query('UPDATE item SET cat_id = 1 WHERE cat_id = $1', [id])
    await pool.query('DELETE FROM category WHERE cat_id = $1', [id])
}

async function deleteBrand(id) {
    await pool.query('UPDATE item SET brand_id = 1 WHERE brand_id = $1', [id])
    await pool.query('DELETE FROM brand WHERE brand_id = $1', [id])
}

async function deleteItem(id) {
    await pool.query('DELETE FROM item WHERE item_id = $1', [id])
}

export {
    deleteCategory,
    deleteBrand,
    deleteItem
}