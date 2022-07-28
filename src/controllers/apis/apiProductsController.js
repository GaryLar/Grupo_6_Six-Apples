const db = require('../../database/models');
const { validationResult } = require('express-validator');
module.exports = {
    listAll:(req, res) => {
        db.Product.findAll({
            include: [{
                association: 'category',
                attributes: ['id', 'name']
            }]
        })
        .then((products) => {
            let response = {
                meta: {
                    status: 200, /* operacion exitosa */
                    total: products.length,
                    url: '/api/productos'
                },
                data: products
            }
            res.json(response)
        })
        .catch((error) => {
            let response = {
                meta:{
                    status: 400, /* recurso no encontrado */
                    url: '/api/productos',
                    message: 'Página no encontrada',
                },
                error: error
            }
            res.json(response)
        })
    },
    productDetail: (req, res) => {
        db.Product.findByPk(+req.params.id, {
            include: [{
                association: 'category',
                attributes: ['id', 'name']
            }]
        })
        .then((product) => {
            let response = {
                meta: {
                    status: 200,
                    url:'/api/productos/detail' + req.params.id,
                },
                data: product
            }
            res.json(response)
        })
        .catch((error) => {
            let response = {
                meta: {
                    status: 400,
                    url: '/api/productos/detail' + req.params.id,
                    message: `Producto ${req.params.id} no encontrado`,
                },
                error: error
            }
            res.json(response)
        })
       
    },
    getSome: (req, res) => {
        let limit = +req.params.limit;
        let offfser = +req.params.offset;

        db.Product.findAll({
            include: [{
                association: 'category',
                attributes: ['id', 'name']
            }],
            limit,
            offset,
        })
        .then((products) => {
            let response = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: '/api/productos/some'
                },
                data: products
            }
            res.json(response)
        })
        .catch((error) => {
            let response = {
                meta: {
                    status: 400,
                    url: '/api/productos/some',
                    message: 'Recurso no encontrado'
                },
                error: error
            }
            res.json(response)
        })
    }
}