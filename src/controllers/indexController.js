const { getProducts } = require('../data/index');
/* Para sacar acentos */
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
/* ESTA funcion sirve parapasar a miles */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
        let resultadoBusqueda = []
        getProducts.forEach(product => {
            if(removeAccents(`${product.name} || ${product.categoryName}`).toLowerCase().includes(req.query.search.toLowerCase())){
                resultadoBusqueda.push(product)
            }
        });
        res.render('search', {
            title: "Busqueda",
            resultadoBusqueda,
            search: req.query.search,
            toThousand
        })
        
    }
}