/* controlador para los products */
const db = require("../../database/models")
const { validationResult } = require('express-validator');

module.exports = {
    list: (req, res) => {
        db.Product.findAll({include: ['category']})
        .then((products)=>{
            res.render('admin/productsAdmin/listProduct', {
            title: "Listado de Productos",
                productos: products,
                session: req.session
            });
        })
        .catch((error)=>res.send(error))
    },
    productAdd: (req, res) => {
        db.Category.findAll()
        .then(categorias => {
            res.render('admin/productsAdmin/addProduct', {
                title: "Agregar Producto",
                session: req.session,
                categorias
            })

        })
    },
    productCreate:(req,res)=>{  
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Product.create({
                ...req.body,
                image:req.file ? req.file.filename : "default-image.png",
            })
            .then(()=>{
                res.redirect('/admin/productos')
            })
            .catch((error)=>res.send(error))
        } else {
            db.Category.findAll()
            .then(categorias => {
            res.render('admin/productsAdmin/addProduct', {
                title: "Agregar Producto",
                session: req.session,
                categorias,
                errors: errors.mapped(),
                old: req.body
            })
            .catch((error) => res.send(error));
        })
    }
},
productEdit: (req,res)=>{
    let idProducto = +req.params.id; 
    let promiseProduct = db.Product.findByPk(idProducto)
    let promiseCategory = db.Category.findAll()
    Promise.all([ promiseProduct, promiseCategory])
    .then(([producto, categorias]) => {
        res.render('admin/productsAdmin/editProduct', {
            title: "Editar:",
            producto,
            categorias,
            session: req.session
        })
    })
    .catch((error)=>res.send(error))
},
productUpdate: (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()){
        db.Product.findByPk(req.params.id)
        .then(producto => {
            db.Product.update({
                ...req.body,
                image: req.file ? req.file.filename : producto.image
            },{
                where: {
                    id: req.params.id
                }
            })
        })
        .catch((error) => res.send(error))
        .then(() => {
            res.redirect('/admin/productos'); 
        })
        .catch((error) => res.send(error))
    } else {
        let idProducto = +req.params.id; 
        let promiseProduct = db.Product.findByPk(idProducto)
        let promiseCategory = db.Category.findAll()
        Promise.all([ promiseProduct, promiseCategory])
        .then(([producto, categorias]) => {
            res.render('admin/productsAdmin/editProduct', {
                title: "Editar:",
                producto,
                categorias,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            })
        })
        .catch((error)=>res.send(error))
}
},
productDelete: (req, res) => {
        let productoId = +req.params.id; 
        db.Product.destroy({ where:{
        id:  productoId }})
        .then((result) => {
            if(result){
                res.redirect('/admin/productos');
            } else {
                res.send('ups.algo rompio')  
            }
         })
         .catch((error) => res.send(error)); 
        }

}
