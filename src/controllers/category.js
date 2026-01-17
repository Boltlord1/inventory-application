function getAll(req, res) {
    res.render('categories')
}

function getOne(req, res) {
    res.render('category')
}

export default {
    getAll,
    getOne
}