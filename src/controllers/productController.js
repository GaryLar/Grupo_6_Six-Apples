//const { getProducts, getOffers, writeOffers} = require('../data/index');
const db = require("../database/models");
const { Op } = require('Sequelize');
let axios = require('axios');

const BASE_URL = "http://localhost:3006/api/productos"

module.exports={
    products:(req,res)=>{
        db.Product.findAll({
            include: ['category'],
        })
        .then((products)=>{
            res.render('products/catalogo', { //catalogo.ejs
                title: "Catálogo",
                products,
                session: req.session,
                user: req.session.user?.id || null,
            });
        })
        .catch((error)=>res.send(error))
    },
    productCart:(req, res) => {
        let user = req.session.user.id
        axios({
            method: 'get',
            url: `http://localhost:3006/api/productos/carrito/${user}`,
        })
        .then(response => {
            let products = response.data.data?.order_items.map(item => {
                return {
                    ...item.products,
                    quantity: item.quantity
                }
            })
            res.render('products/productCart', { //productCart.ejs
                title: "Carrito",
                session: req.session,
                products: products !== undefined ? products : [],
                user: req.session.user?.id || null, 
            }) 
        })
        .catch(error => res.send(error))
    },
    offers:(req, res) => {
        db.Offer.findAll()
        .then((offers)=>{
            res.render('products/ofertas', { //ofertas.ejs
                title: "Ofertas",
                ofertas:offers,
                session: req.session,
                user: req.session.user?.id || null,
            }) 
        })
        .catch((error)=>res.send(error))
    },
    offersDetail: (req, res) => {
        let idOferta = +req.params.id;
        db.Offer.findByPk(idOferta)
            .then((offer)=>{
                res.render('products/offersDetail', {
                    title: "Ofertas",
                    oferta:offer,
                    session: req.session,
                    user: req.session.user?.id || null,
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
                session: req.session,
                user: req.session.user?.id || null,
            }) 
        })
        .catch((error)=>res.send(error))
    },
    /* filtro en catalogo */
    filter: (req, res) => {
        let busqueda = req.query.search
        db.Product.findAll({
            include: ['category'],
            where: {
                categoryId: {[db.Sequelize.Op.substring] : busqueda}
            }
        })
        .then(products => {
            res.render('products/catalogo', {
                busqueda,
                title: 'filtro',
                session: req.session,
                products,
                user: req.session.user?.id || null,
            })
        })
    },
    filterPrice: (req, res) => {
        let encuentro = +req.query.search
        db.Product.findAll({
            include: ['category'],
            where: {
                [Op.or]: {
                    price: {
                        [db.Sequelize.Op.like] : +encuentro,
                    }
           }}
        })
        .then(products => {
            res.render('products/catalogo', {
                encuentro,
                title: 'filtro',
                session: req.session,
                products,
                user: req.session.user?.id || null,
            })
        })
    }
}