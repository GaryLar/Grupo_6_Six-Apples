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
    productCreate:(req,res)=>{
         /* 1 - Crear el objeto producto */
         let lastId = 0;
         getProducts.forEach(product => {
             if(product.id > lastId){
                 lastId = product.id;
             }
    })
    let newProduct = {
        ...req.body,      /* ... (express operator) trae todas las propiedades de  un objeto , en este caso agrega todas las propiedades a esta variable*/
        id: lastId + 1,
       /*  stock: req.body.stock ? true : false */
    }

    // Paso 2 - Guardar el nuevo producto en el array de productos
    getProducts.push(newProduct)

    // Paso 3 - Escribir el JSON de productos con el array actual
    writeProducts(getProducts)

    // Paso 4 - Devolver respuesta (redirección)
    res.redirect('/admin/productos')
},
/* Envia la vista de form de edición de producto */
productEdit: (req,res)=>{
    /* 1 - Obtener el id del producto */
    let idProducto = +req.params.id;
     /* 2 - Buscar el producto a editar */
     let producto = getProducts.find(producto => producto.id === idProducto)
     /* 3 - Mostrar el producto en la vista */
     res.render('admin/productsAdmin/editProduct', {
         titulo: "Editar:",
         producto
     })
}
}
