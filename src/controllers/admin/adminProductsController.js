/* controlador para los products */
const { getProducts, writeProducts} = require('../../data/index');
const { validationResult } = require('express-validator');

module.exports = {
    list: (req, res) => {
        res.render('admin/productsAdmin/listProduct', {
            title: "Listado de Productos",
            productos: getProducts,
            session: req.session
        })
    },
    productAdd: (req, res) => {
        res.render('admin/productsAdmin/addProduct', {
            title: "Agregar Producto",
            session: req.session
        })
    },
    productCreate:(req,res)=>{  
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let lastId = 0;
            getProducts.forEach(product => {
                if(product.id > lastId){
                    lastId = product.id;
            }
        })
        let newProduct = {
            ...req.body, 
            id: lastId + 1,
            image:req.file ? req.file.filename : "default-image.png",
            view: req.body.view ? true : false 
        }
        getProducts.push(newProduct)
        writeProducts(getProducts)
        res.redirect('/admin/productos')

        } else {
            res.render('admin/productsAdmin/addProduct', {
                title: 'Agregar Producto',
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            })
        }
},

productEdit: (req,res)=>{
    let idProducto = +req.params.id; 
    let producto = getProducts.find(producto => producto.id === idProducto)
    res.render('admin/productsAdmin/editProduct', {
        title: "Editar:",
        producto,
        session: req.session
    })
},

productUpdate: (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty ()){

    
    let productoId = +req.params.id;
    getProducts.forEach(producto => {
        if(producto.id === productoId){
            producto.name = req.body.name
            producto.type = req.body.type
            producto.origin = req.body.origin
            producto.categoryName = req.body.categoryName
            producto.categoryId = req.body.categoryId
            producto.price = req.body.price
            producto.view = req.body.view ? true : false
            producto.image = req.file ? req.file.filename : producto.image
        }
    })

    writeProducts(getProducts);
    res.redirect('/admin/productos'); 
} else {
    let idProducto = +req.params.id; 
    let producto = getProducts.find(producto => producto.id === idProducto)
    res.render('admin/productsAdmin/editProduct', {
        title: "Editar:",
        producto,
        session: req.session,
        errors: errors.mapped(),
        old: req.body
    })
}
},

productDelete: (req, res) => {
    let productoId = +req.params.id;
    getProducts.forEach(producto => {
    if(producto.id === productoId){
        let indiceDeProducto = getProducts.indexOf(producto);
        getProducts.splice(indiceDeProducto, 1)
    }
    })
    writeProducts(getProducts);
    res.redirect('/admin/productos');
}

}
