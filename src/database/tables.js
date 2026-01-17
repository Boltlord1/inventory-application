import pool from './pool.js'

const category = `
CREATE TABLE IF NOT EXISTS category (
    cat_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cat_name VARCHAR ( 255 ),
    cat_desc TEXT
);
`

const brand = `
CREATE TABLE IF NOT EXISTS brand (
    brand_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brand_name VARCHAR ( 255 ),
    brand_desc TEXT
);
`

const item = `
CREATE TABLE IF NOT EXISTS item (
    item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item_name VARCHAR ( 255 ),
    item_stock INTEGER,
    cat_id INTEGER REFERENCES category (cat_id),
    brand_id INTEGER REFERENCES brand (brand_id)
);
`

try {
    console.log('Dropping tables...')
    await pool.query('DROP TABLE IF EXISTS item;')
    await pool.query('DROP TABLE IF EXISTS category;')
    await pool.query('DROP TABLE IF EXISTS brand;')
    console.log('Dropped tables.')
} catch (err) {
    console.log('Failed to drop tables.')
    console.error(err)
}

try {
    console.log('Creating tables...')
    await pool.query(category)
    await pool.query(brand)
    await pool.query(item)
    console.log('Created tables.')
} catch (err) {
    console.log('Failed to create tables.')
    console.error(err)
}