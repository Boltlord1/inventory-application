import pool from './pool.js'

try {
    console.log('Emptying tables...')
    await pool.query('TRUNCATE TABLE categories;')
    await pool.query('TRUNCATE TABLE items;')
    console.log('Empited tables.')
} catch (err) {
    console.log('Failed to empty tables.')
    console.error(err)
}

const categories = [
    { name: 'Men\'s clothing', desc: 'Apparel for men.' },
    { name: 'Women\'s clothing', desc: 'Apparel for women.' }
]

const items = [
    { name: 'White t-shirt', brand: 'Brand A', stock: 80, category: 1 },
    { name: 'White blouse', brand: 'Brand A', stock: 60, category: 2 },
    { name: 'Blue t-shirt', brand: 'Brand A', stock: 45, category: 1 },
    { name: 'Brown purse', brand: 'Brand B', stock: 15, category: 2 }
]

async function populateCategories() {
    for (const category of categories) {
        await pool.query('INSERT INTO categories (cat_name, cat_desc) VALUES ($1, $2)', [category.name, category.desc])
    }
}

async function populateItems() {
    for (const item of items) {
        await pool.query('INSERT INTO categories (item_name, item_brand, item_stock, cat_id) VALUES ($1, $2)',
            [item.name, item.brand, item.stock, item.category])
    }
}

try {
    console.log('Populating tables...')
    await populateCategories()
    await populateItems()
    console.log('Populated tables.')
} catch (err) {
    console.log('Failed to populate tables.')
    console.error(err)
}