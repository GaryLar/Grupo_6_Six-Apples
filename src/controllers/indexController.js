const { getProducts } = require('../data/index');

module.exports={
    index:(req,res)=>{
        let productView = getProducts.filter(product => {
            return product.view === true
        })
        res.render('home.ejs',{ //home.ejs
            title: "Six Apples",
            productView
        }) 
    },
    about:(req,res)=>{
        res.render('quienessomos', { //quienessomos.ejs
            title: "Quienes Somos"
        }) 
    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase() /* busca por query string la busqueda que paso el usuario y la paso a una variable */
        let productos = getProducts.filter(producto => producto.name == busqueda)
        res.render('search', {
            title: "Busqueda",
            productos,
            busqueda
        })
        
    }
}