/* controlador de las categorias */
const { getCategories, writeCategories} = require('../../data/index'); 
const adminProductsController = require('./adminProductsController');

module.exports = {
    list: (req, res) => {
        res.render('admin/categoriesAdmin/listCategory' , {
        title: "Listado de Categorias" , 
        categorias: getCategories   
        })
    }, 
    categoryAdd: (req, res) => {
        res.render('admin/categoriesAdmin/addCategory' , {
            title: "Agregar Categoria"
        })
    }, 
    categoryCreate: (req, res) => {
        /* 1-Crear el Objeto categoria */ 
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
        // Paso 2 - guardar la nueva categoria en el array de categorias
        getCategories.push(newCategoria)

        // Paso 3 - Escribir JSON de categories con el array actual 
        writeCategories(getCategories)

        // Paso 4 - Devolver respuesta (redireccion)
        res.redirect('/admin/categorias')
    }, 

    //Envia la vista de form de edicion de categoria 
    categoryEdit: (req,res) => {
        // 1- Obtener el id de la categoria
        let idCategoria = +req.params.id; 
        // 2- Buscar la categoria a editar 
        let categoria = getCategories.find( categoria => categoria.id === idCategoria)
        // 3- Mostrar el producto en la vista 
        res.render('admin/categoriesAdmin/editCategory',{
            title: "Editar Categoria:", 
            categoria 
        })
    }, 
    // recibe los datos actualizados del form de edicion 
    categoryUpdate: (req, res) => {
        let categoryId = +req.params.id; 
        getCategories.forEach(categoria => {
            if( categoria.id === categoryId){
                categoria.name = req.body.name 
            }
        })

        // Guardarlos en la DB 
        writeCategories(getCategories); 
        // Redireccion 
        res.redirect('/admin/categorias'); 
    }, 

    categoryDelete:(req, res) => {
        let categoryId = +req.params.id; 
        getCategories.forEach(categorias => {
            if( categorias.id === categoryId){
                //obtener la ubicacion (indice) de la categoria a eliminar 
                let indiceDeCategoria = getCategories.indexOf(categorias); 
                getCategories.splice(indiceDeCategoria, 1) 
            }
        })
         // 3- Sobreescribir el json 
         writeCategories(getCategories); 
         //Redireccionar 
         res.redirect('/admin/categorias'); 
    }

}