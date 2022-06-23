const db = require('../../database/models');
const {Op} = require('Sequelize');

module.exports = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            title: 'admin',
            session: req.session
        })
    },
    search: (req, res) => {
        let resultado = req.query.search.toLowerCase()
        db.Product.findAll({
            where:{
                [Op.or] : [
                    {name: {[Op.substring] : resultado}},
                ]
            }
        })
        .then((resultadoBusqueda) => {
            res.render('admin/searchAdmin', {
                title: 'Tu busqueda',
                resultadoBusqueda,
                search: req.query.search,
                session: req.session
            })
        })
        .catch((error) => res.send(error))

    }
}