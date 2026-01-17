import pool from './pool.js'

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories')
    return rows
}

async function getAllItems() {
    const items = (await pool.query('SELECT * FROM items')).rows
    const categories = (await pool.query('SELET * FROM categories')).rows
}