/* controlador para los products */
const { getProducts, writeProducts} = require('../../data/index');

module.exports = {
    list: (req, res) => {
        res.render('admin/productsAdmin/listProduct', {
            title: "Listado de Productos",
            productos: getProducts
        })
    },
    productAdd: (req, res) => {
        res.render('admin/productsAdmin/addProduct', {
            title: "Agregar Producto"
        })
    },
}