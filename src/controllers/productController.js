//const { getProducts, getOffers, writeOffers} = require('../data/index');
const { promise } = require("bcrypt/promises");
const db = require("../database/models")
const { Op } = require("sequelize");

module.exports={
    products:(req,res)=>{
        db.Product.findAll()
        .then((products)=>{
            res.render('products/catalogo', { //catalogo.ejs
                title: "Catálogo",
                products,
                session: req.session
            });
        })
        .catch((error)=>res.send(error))
    },
    productCart:(req, res) => {
        res.render('products/productCart', { //productCart.ejs
            title: "Carrito",
            session: req.session
        }) 
    },
    offers:(req, res) => {
        db.Offer.findAll()
        .then((offers)=>{
            res.render('products/ofertas', { //ofertas.ejs
                title: "Ofertas",
                ofertas:offers,
                session: req.session
            }) 
        })
        .catch((error)=>res.send(error))
    },
    offersDetail: (req, res) => {
        let idOferta = +req.params.id;
        db.Offer.findByPk(idOferta)
            .then((offer)=>{
                res.render('products/offersDetail', {
                    title: offer.name,
                    oferta:offer,
                    session: req.session
                })
            })
        .catch((error)=>res.send(error))
    },
    detail:(req, res) => {
        let idProducto = +req.params.id; /* capturamos id del producto que viene por url */
        /* let promiseView = db.Product.findAll({
            where: {
                view:{[db.sequelize.Op.eq]:1}
            }}) */
        let promiseProduct = db.Product.findByPk(idProducto)
        Promise.all([ promiseProduct])
        .then((product)=>{
            res.render('products/productDetail', {
                title: product.name,
                product ,/* llama a un solo producto el que viene por id. Que sacamos de la variable 'product' */
                
                session: req.session
            }) 
        })
        .catch((error)=>res.send(error))
    },
}