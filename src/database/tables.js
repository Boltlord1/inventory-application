import pool from './pool.js'

const categories = `
CREATE TABLE IF NOT EXISTS categories (
    cat_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cat_name VARCHAR ( 255 ),
    cat_desc TEXT
);
`

const items = `
CREATE TABLE IF NOT EXISTS items (
    item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cat_id INTEGER REFERENCES categories (cat_id),
    item_name VARCHAR ( 255 ),
    item_brand VARCHAR ( 255 ),
    item_stock INTEGER
);
`

await pool.query(categories)
await pool.query(items)

console.log('Tables created.')