import path from 'node:path'
import express from 'express'

const __dirname = import.meta.dirname

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`App listening on port ${port}`)
})