function getAll(req, res) {
    res.render('brands')
}

function getOne(req, res) {
    res.render('brand')
}

export default {
    getAll,
    getOne
}