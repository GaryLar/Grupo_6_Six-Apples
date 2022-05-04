/* controlador de las categorias */
const { getCategories, writeCategories} = require('../../data/index'); 
const adminProductsController = require('./adminProductsController');

module.exports = {
    list: (req, res) => {
        res.render('admin/categoriesAdmin/listCategory' , {
        title: "Listado de Categorias" , 
        categorias: getCategories,
        session: req.session   
        })
    }, 
    categoryAdd: (req, res) => {
        res.render('admin/categoriesAdmin/addCategory' , {
            title: "Agregar Categoria",
            session: req.session
        })
    }, 
    categoryCreate: (req, res) => {
        let lastId = 0; 
        getCategories.forEach(categoria => {
            if(categoria.id > lastId){
                lastId = categoria.id; 
            }
        })
        let newCategoria = {
            ...req.body,
            id : lastId + 1, 
        }
        getCategories.push(newCategoria)

        writeCategories(getCategories)

        res.redirect('/admin/categorias')
    }, 

    categoryEdit: (req,res) => {
        let idCategoria = +req.params.id; 
        let categoria = getCategories.find( categoria => categoria.id === idCategoria)
        res.render('admin/categoriesAdmin/editCategory',{
            title: "Editar Categoria:", 
            categoria,
            session: req.session 
        })
    }, 
    categoryUpdate: (req, res) => {
        let categoryId = +req.params.id; 
        getCategories.forEach(categoria => {
            if( categoria.id === categoryId){
                categoria.name = req.body.name 
            }
        })

        writeCategories(getCategories); 
        res.redirect('/admin/categorias'); 
    }, 

    categoryDelete:(req, res) => {
        let categoryId = +req.params.id; 
        getCategories.forEach(categorias => {
            if( categorias.id === categoryId){
                let indiceDeCategoria = getCategories.indexOf(categorias); 
                getCategories.splice(indiceDeCategoria, 1) 
            }
        })
         writeCategories(getCategories); 
         res.redirect('/admin/categorias'); 
    }

}