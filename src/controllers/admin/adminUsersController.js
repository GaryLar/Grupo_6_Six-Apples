const db = require("../../database/models")
const { validationResult } = require('express-validator');

module.exports = {
    users: (req, res) => {
        db.User.findAll({
            include: ['rol']
        })
        .then(users => {
            res.render('admin/usersAdmin/listUsers', {
                users,
                session: req.session,
                title: 'Usuarios'
            })
        })
        .catch((error) => res.send(error))
    },
    userChangeRol: (req, res) => {  /* solo quiero poder cambiar el rol de mi usuario */
        let{ rol } = req.body
        db.User.update({
            rol
        }, {
            where: { id: req.params.id}
        })
        .then(() => res.redirect('/admin/users'))
        .catch((error) => res.send(error))
    }
}