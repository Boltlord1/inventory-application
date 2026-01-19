function fillCategory(document, data) {
    const name = document.getElementById('cat_name')
    name.value = data.cat_name
    const desc = document.getElementById('cat_desc')
    desc.value = data.cat_desc
    document.title = `Edit category ${data.cat_id}`
}

function fillBrand(data) {
    console.log(data)
    const name = document.getElementById('brand_name')
    name.value = data.brand_name
    const desc = document.getElementById('brand_desc')
    desc.value = data.brand_desc
    document.title = `Edit brand ${data.brand_id}`
}

function fillItem(document, data) {
    const name = document.getElementById('item_name')
    name.value = data.item_name
    const stock = document.getElementById('item_stock')
    stock.value = data.item_stock
    const cat = document.getElementById('cat_id')
    cat.querySelector(`option[value=${data.cat_id}]`).selected = true
    const brand = document.getElementById('brand_id')
    brand.querySelector(`option[value=${data.brand_id}]`).selected = true
    document.title = `Edit brand ${data.item_id}`
}

export {
    fillCategory,
    fillBrand,
    fillItem
}