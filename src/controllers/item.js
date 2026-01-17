function getAll(req, res) {
    res.render('items')
}

function getOne(req, res) {
    res.render('item')
}

export default {
    getAll,
    getOne
}