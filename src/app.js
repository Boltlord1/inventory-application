import express from 'express'

const app = express()

const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`App listening on port ${port}`)
})