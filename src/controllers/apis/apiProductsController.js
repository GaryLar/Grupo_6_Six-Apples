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
       /*  let limit = +req.params.limit;
        let offset = +req.params.offset;
 */
        let url = `http://${req.headers.host}${req.originalUrl}`; 
        

        const dataPaginacion = (data, page, limit) => {
            const {count, rows: result} = data; 
            const pages = Math.ceil(count / limit)
            const paginaActual = page ? + page : 0; 
            let paginaSiguiente = "";
            let paginaAnterior = "";

            if(url.includes('page')){
                let parametros = url.substring(url.search(/page/i), url.search(/&/i))
                      if(paginaActual == 0){
                        paginaSiguiente = url.replace(parametros, `page=${paginaActual + 1}`)
                      }else {
                        paginaAnterior = url.replace(parametros, `page=${paginaActual - 1}` )
                        paginaSiguiente = url.replace(parametros, `page=${paginaActual + 1}`)
                      }
            }else {
                paginaSiguiente = `${url}?page=${paginaActual + 1}&size=${limit}`; 
            }
            const siguiente = page == (pages - 1) ? null: paginaSiguiente;
            const anterior = paginaActual == 0 ? null : paginaAnterior;

            return {count, pages , paginaActual, anterior, siguiente, result}
        }

        const{page, size} = req.query; 

        const paginacion = (page, size) => {
            console.log(typeof size) 
            console.log(typeof page) 
            const limit = size ? +size : 5; 
            const offset = page ? page * limit : 0;
            return{limit, offset}
        }
        const {limit, offset} = paginacion(page, size) 
        console.log(size)
        db.Product.findAndCountAll({
            include: ['category'],
            limit: limit,
            offset: offset
        })
        .then((products)=>{
            const data = dataPaginacion(products, page, limit)
            let response = {
                meta : {
                    status: 200,
                    total: products.length,
                    /* url: '/api/productos/some' */
                    count : data.count,
                    pages: data.pages,
                    paginaActual: data.paginaActual,
                    anterior: data.anterior,
                    siguiente: data.siguiente,
                },
                result: data.result
            }
            res.json(response)

            /* res.json({
                info : {
                    count : data.count,
                    pages: data.pages,
                    paginaActual: data.paginaActual,
                    anterior: data.anterior,
                    siguiente: data.siguiente,
                },
                result : data.result
            }) */
        })
        .catch((error) => {
            let response = {
                meta: {
                    status: 400,
                    /* url: '/api/productos/some', */
                    message: 'Recurso no encontrado'
                },
                error: error
            }
            res.json(response)
        })
       /*  db.Product.findAll({
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
        }) */
    }
}