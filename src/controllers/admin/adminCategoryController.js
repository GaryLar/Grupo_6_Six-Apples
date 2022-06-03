const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        db.Category.findAll()
        .then((categorias) => 
        res.render('admin/categoriesAdmin/listCategory' , {
            title: "Listado de Categorias" , 
            categorias,
            session: req.session,
        }))
    }, 
    categoryAdd: (req, res) => {
        res.render('admin/categoriesAdmin/addCategory' , {
            title: "Agregar Categoria",
            session: req.session
        })
    }, 
    categoryCreate: (req, res) => {
        db.Category.create({
            name: req.body.name
        })
        .then(() => res.redirect('/admin/categorias'))
        .catch((error) => res.send(error))
    }, 

    categoryEdit: (req,res) => {
        let idCategoria = +req.params.id; 
        db.Category.findByPk(idCategoria).then((categoria) => {
            res.render('admin/categoriesAdmin/editCategory',{
                title: "Editar Categoria:", 
                categoria,
                session: req.session 
        }) 
    })
        .catch((error) => res.send(error))
    }, 

    categoryUpdate: (req, res) => {
        let categoryId = +req.params.id; 
        db.Category.update({
            name: req.body.name, 
        }, {
        where: {
            id: categoryId  
        }
        })
        .then((result) => {
            if(result){
                res.redirect('/admin/categorias')
            } /*else{ 
                res.send('ups, ocurrio un error') PARA VISRA DE ERROR 
            }*/
        })
         .catch((error) => res.send(error))
    }, 

    categoryDelete:(req, res) => {
        let categoryId = +req.params.id; 
        db.categoryId.destroy({ where:{
        id:  categoryId }})
        .then((result) => {
            if(result){
                res.redirect('/admin/categorias');
            } /*else {
                res.send('ups.algo rompio') PARA VISTA ERROR 
            }*/ 
         })
         .catch((error) => res.send(error)); 
        }
    }