/* controlador para los products */
const db = require("../../database/models")
const { validationResult } = require('express-validator');

module.exports = {
    list: (req, res) => {
        db.Product.findAll()
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
            res.render('admin/productsAdmin/addProduct', {
                title: "Agregar Producto",
                session: req.session
            })
    },
    productCreate:(req,res)=>{  
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Product.create({
                name:req.body.name,
                type:req.body.type,
                categoryId:req.body.categoryName==="Frutas"?1:2,
                price:req.body.price,
                origin:req.body.origin,
                view:req.body.view ? 1 : 0 ,
                image:req.file ? req.file.filename : "default-image.png",
            })
            .then(()=>{
                res.redirect('/admin/productos')
            })
            .catch((error)=>res.send(error))
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
    db.Product.findByPk(idProducto)
    .then((products)=>{
        res.render('admin/productsAdmin/editProduct', {
            title: "Editar:",
            producto:products,
            session: req.session
        })

    })
    .catch((error)=>res.send(error))
},
productUpdate: (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty ()){
        db.Product.update({
                name:req.body.name,
                type:req.body.type,
                categoryId:req.body.categoryName==="Frutas"?1:2,
                price:req.body.price,
                origin:req.body.origin,
                view:req.body.view ? 1 : 0 ,
                image:req.file ? req.file.filename : "default-image.png",
        },{
            where:{
                id:req.params.id,
            }
        })
        .then(()=>{
            res.redirect('/admin/productos'); 
        })
        .catch((error) => res.send(error))
    } else {
        db.Product.findOne({
        where:{
            id:req.params.id,
        }
    })
    .then((producto)=>{
        res.render('admin/productsAdmin/editProduct', {
            title: "Editar:",
            producto,
            session: req.session,
            errors: errors.mapped(),
            old: req.body
        })
    })
    .catch((error) => res.send(error))
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
