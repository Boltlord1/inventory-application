import { body } from 'express-validator'
import { getIDs } from './database/select.js'

function varchar(name) {
    return body(name)
        .trim()
        .notEmpty()
        .withMessage('Name must not be empty.')
        .isLength({ max: 256 })
        .withMessage('Name can not be more than 32 characters.')
}

function text(name) {
    return body(name)
        .trim()
}

async function id(name) {
    const table = name === 'cat_id' ? 'category' : 'brand'
    return body(name)
        .isInt()
        .toInt()
        .custom(async value => {
            const validIds = (await getIDs(table, name)).map(obj => obj[name])
            return validIds.includes(value)
        })
        .withMessage(`Invalid ID for ${table}.`)
}

const stock = body('item_stock')
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be an non-negative integer.')
    .toInt()

export {
    varchar,
    text,
    id,
    stock
}