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