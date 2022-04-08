const { getProducts } = require('../data/index');

module.exports={
    products:(req,res)=>{
        res.render('products/catalogo', { //catalogo.ejs
            title: "Catálogo",
            products: getProducts
        });
    },
    productCart:(req, res) => {
        res.render('products/productCart', { //productCart.ejs
            title: "Carrito" 
        }) 
    },
    offers:(req, res) => {
        res.render('products/ofertas', { //ofertas.ejs
            title: "Ofertas"
        }) 
    },
    detail:(req, res) => {
        let idProducto = +req.params.id; /* capturamos id del producto que viene por url */
        let product = getProducts.find(producto => producto.id === idProducto)
        res.render('products/productDetail', {
            title: product.name,
            product /* llama a un solo producto el que viene por id. Que sacamos de la variable 'product' */
        }) 
    },
}