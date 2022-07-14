/* controlador para los products */
const db = require("../../database/models")
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

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
            .then(() => {
                if(req.file){
                    let existe = fs.existsSync(path.join(__dirname, "../../../public/images/productos", producto.image)) 
                     if( existe && producto.image !== "default-image.png"){
                        fs.unlinkSync(path.join(__dirname, "../../../public/images/productos", producto.image))
                    }
                }
                res.redirect('/admin/productos')
            })
            .catch((error) => res.send(error))
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
        /* busco por id el producto a eliminar */
        db.Product.findByPk(productoId)
        .then(product => {
            db.Product.destroy({
                where:{
                id: productoId
            }
        })
        /* deberia al eliminar el producto, tambien borrar la imagen asociada */
        .then(() => {
            let existe = fs.existsSync(path.join(__dirname, "../../../public/images/productos", product.image));
            if(existe && product.image !== "default-image.png"){
                fs.unlinkSync(path.join(__dirname, "../../../public/images/productos", product.image))
            }
        })
        .catch((error) => res.send(error))
        res.redirect('/admin/productos')
        })
        .catch((error) => res.send(error))
        }

}
