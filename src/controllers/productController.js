module.exports={
    products:(req,res)=>{
        res.render("products/catalogo")
    },
    productCart: (req, res) => {
        res.render('productCart')
    }
}