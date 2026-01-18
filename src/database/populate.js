import pool from './pool.js'

try {
    console.log('Emptying tables...')
    await pool.query('TRUNCATE TABLE category RESTART IDENTITY CASCADE;')
    await pool.query('TRUNCATE TABLE brand RESTART IDENTITY CASCADE;')
    await pool.query('TRUNCATE TABLE item;')
    console.log('Empited tables.')
} catch (err) {
    console.log('Failed to empty tables.')
    console.error(err)
}

const categories = [
    { name: 'Uncategorized', desc: 'For items which don\'t belong in a category.'},
    { name: 'Men\'s clothing', desc: 'Apparel for men.' },
    { name: 'Women\'s clothing', desc: 'Apparel for women.' },
    { name: 'Accessories', desc: 'Accessories for all.' }
]

const brands = [
    { name: 'No brand', desc: 'For items which have no listed brand.' },
    { name: 'Brand A', desc: 'Produces clothing.' },
    { name: 'Brand B', desc: 'Produces accessories.' }
]

const items = [
    { name: 'White t-shirt', stock: 80, category: 2, brand: 2 },
    { name: 'White blouse', stock: 60, category: 3, brand: 2 },
    { name: 'Blue t-shirt', stock: 45, category: 2, brand: 2 },
    { name: 'Brown purse', stock: 15, category: 4, brand: 3 }
]

async function populateCategories() {
    for (const category of categories) {
        await pool.query('INSERT INTO category (cat_name, cat_desc) VALUES ($1, $2)', [category.name, category.desc])
    }
}

async function populateBrand() {
    for (const brand of brands) {
        await pool.query('INSERT INTO brand (brand_name, brand_desc) VALUES ($1, $2)', [brand.name, brand.desc])
    }
}

async function populateItems() {
    for (const item of items) {
        await pool.query('INSERT INTO item (item_name, item_stock, cat_id, brand_id) VALUES ($1, $2, $3, $4)',
            [item.name, item.stock, item.category, item.brand])
    }
}

try {
    console.log('Populating tables...')
    await populateCategories()
    await populateBrand()
    await populateItems()
    console.log('Populated tables.')
} catch (err) {
    console.log('Failed to populate tables.')
    console.error(err)
}