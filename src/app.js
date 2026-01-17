import path from 'node:path'
import express from 'express'

import indexRouter from './routes/index.js'
import catRouter from './routes/category.js'
import brandRouter from './routes/brand.js'
import itemRouter from './routes/item.js'

const __dirname = import.meta.dirname

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/category', catRouter)
app.use('/brand', brandRouter)
app.use('/item', itemRouter)

const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`App listening on port ${port}`)
})