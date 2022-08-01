const { getProducts, getOffers} = require('../data/index');
const removeAccents = (str) => {                /* Para sacar acentos */
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); /* ESTA funcion sirve parapasar a miles */
const db = require("../database/models")
const { Op } = require('Sequelize');

module.exports={
    index:(req,res)=>{
        let productPromise = db.Product.findAll({where : {
            view : {
                [db.Sequelize.Op.eq] : 1
            }
        }})
        let offertsPromise = db.Offer.findAll({where : {
            view : {
                [db.Sequelize.Op.eq] : 1
            }
        }})
        Promise.all([productPromise, offertsPromise])
        .then(([productView, offertsView])=>{
            res.render('home.ejs',{ //home.ejs
                title: "Six Apples",
                productView,
                offertsView,
                toThousand,
                session: req.session
            }) 
        })
        .catch((error)=>res.send(error))
    },
    about:(req,res)=>{
        res.render('quienessomos', { //quienessomos.ejs
            title: "Quienes Somos",
            session: req.session
        }) 
    },
    search: (req, res) => {
        let resultado = req.query.search.toLowerCase().trim()
        db.Product.findAll({
            where: {
                [Op.or] : [
                    {name : {[Op.substring] : resultado}}, 
                ]
            }
        })
        .then((resultadoBusqueda) => {
                    res.render('search', {
                        title: "Busqueda",
                        resultadoBusqueda,
                        search: req.query.search,
                        toThousand,
                        session: req.session
                    })

                })        
        .catch((error) => res.send(error))
     
            
    }
}