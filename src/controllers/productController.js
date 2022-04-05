//const { getProducts } = require('../data');

module.exports={
    products:(req,res)=>{
        res.render('products/catalogo') //catalogo.ejs
    },
    productCart:(req, res) => {
        res.render('products/productCart') //productCart.ejs
    },
    offers:(req, res) => {
        res.render('products/ofertas') //ofertas.ejs
    },
    detail:(req, res) => {
        res.render('products/productDetail') //productDetail.ejs
    },
}