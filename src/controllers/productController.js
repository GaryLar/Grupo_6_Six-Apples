//const { getProducts, getOffers, writeOffers} = require('../data/index');
const { promise } = require("bcrypt/promises");
const db = require("../database/models")
const { Op } = require('Sequelize');

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
        let idProducto = +req.params.id; 
        let promiseProduct = db.Product.findByPk(idProducto)
        let promiseView = db.Product.findAll({where : {
            view : {
                [db.Sequelize.Op.eq] : 1
                /*  [db.Sequelize.Op.not] : 'true' */
            }
        }})
        Promise.all([promiseProduct, promiseView])
        .then(([product, productView])=>{
            res.render('products/productDetail', {
                title: product.name,
                productView,
                product,
                session: req.session
            }) 
        })
        .catch((error)=>res.send(error))
    },
}