/* controlador para los products */
module.exports = {
    productAdd: (req, res) => {
        res.render('admin/productsAdmin/addProduct', {
            title: "Agregar Producto"
        })
    }
}