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
        image :req.file.filename,
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
         title: "Editar:",
         producto
     })
},

    /* Recibe los datos actualizados del form de edición */
productUpdate: (req, res) => {
    let productoId = +req.params.id;
    getProducts.forEach(producto => {
        if(producto.id === productoId){
            producto.name = req.body.name
            producto.type = req.body.type
            producto.origin = req.body.origin
            producto.categoryName = req.body.categoryName
            producto.categoryId = req.body.categoryId
            producto.price = req.body.price
            producto.view = req.body.view
        }
    })

    /* Necesitamos guardarlos en la DB */
    writeProducts(getProducts);
    /* redireccion */
    res.redirect('/admin/productos'); 
},
productDelete: (req, res) => {
    let productoId = +req.params.id;
    getProducts.forEach(producto => {
     if(producto.id === productoId){
          //Obtener la ubicación (índice) del producto a eliminar
          let indiceDeProducto = getProducts.indexOf(producto);
          getProducts.splice(indiceDeProducto, 1)
     }
    })
    /* 3 - Sobreescribir el json */
    writeProducts(getProducts);
    /* REDIRECCIONAR */ 
    res.redirect('/admin/productos');

}

}
