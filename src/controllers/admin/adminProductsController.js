/* controlador para los products */
const db = require("../../database/models")
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

module.exports = {
    list: (req, res) => {
        let url = `http://${req.headers.host}${req.originalUrl}`; /* definimos la url, la armamos para ver si tiene uncluidos los parametros o no */
        /* establecer algunas validaciones, por ejemplo
        si existe dentro de los parametros de la url la page */
        const dataPaginacion = (data, page, limit) => {
            const {count, rows: result} = data; /* queremos manipular count y rows */
            const pages = Math.ceil(count / limit)/* math.ceil trae numeros enteros */
            const paginaActual = page ? + page : 0; /* si existe q la devuelva, sino cero */
            let paginaSiguiente = "";
            let paginaAnterior = "";

            if(url.includes('page')){
                let parametros = url.substring(url.search(/page/i), url.search(/&/i))/* le pasamos el indice de los parametros, y va a extraer esa porcion de texto */
                      /* los busca y extrae esa porcion de codigo */
                      if(paginaActual == 0){
                        paginaSiguiente = url.replace(parametros, `page=${paginaActual + 1}`)
                      }else {
                        paginaAnterior = url.replace(parametros, `page=${paginaActual - 1}` )
                        paginaSiguiente = url.replace(parametros, `page=${paginaActual + 1}`)
                      }
            }else {
                paginaSiguiente = `${url}?page=${paginaActual + 1}&size=${limit}`; /* hay q pasar la url de la pagina siguiente y de la pagina anterior */
            }
            const siguiente = page == (pages - 1) ? null: paginaSiguiente;
            const anterior = paginaActual == 0 ? null : paginaAnterior;

            return {count, pages , paginaActual, anterior, siguiente, result}
        }

        const{page, size} = req.query; /* desestructurar la query para obtener los parametros */

        const paginacion = (page, size) => {
            console.log(typeof size) /* string */
            console.log(typeof page) /* string */
            /* necesito definir el limit y el offset */
            const limit = size ? +size : 4; /* si llega size q lo devuelva sino por defecto un 5, size con + para q sea number*/
            const offset = page ? page * limit : 0; /* calcular el numero de pagina q estoy teniendo */
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
            const data = dataPaginacion(products, page, limit)/* enviamos la respuesta-los productos, el numero de lagina y el limite del los resultados */
            res.render('admin/productsAdmin/listProduct', {
            title: "Listado de Productos",
                productos: data.result,
                session: req.session,
                count : data.count,
                pages: data.pages,
                paginaActual: data.paginaActual,
                anterior: data.anterior,
                siguiente: data.siguiente,

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
