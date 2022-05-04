const { format } = require('express/lib/response');
const { getProducts, getOffers} = require('../data/index');
const removeAccents = (str) => {                /* Para sacar acentos */
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); /* ESTA funcion sirve parapasar a miles */

module.exports={
    index:(req,res)=>{
        let productView = getProducts.filter(product => {
            return product.view === true
        })
        let offertsView = getOffers.filter(bolson => {
            return bolson.view === true
        })
        res.render('home.ejs',{ //home.ejs
            title: "Six Apples",
            productView,
            offertsView,
            toThousand,
            session: req.session
        }) 
    },
    about:(req,res)=>{
        res.render('quienessomos', { //quienessomos.ejs
            title: "Quienes Somos",
            session: req.session
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
            toThousand,
            session: req.session
        })
        
    }
}



/* form.addEventListener("sumbit",()=>{
    alert("")
}) */