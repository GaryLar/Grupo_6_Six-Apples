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
        let{ rolId } = req.body
        db.User.update({
            rolId
        }, {
            where: { id: req.params.id}
        })
        .then(() => res.redirect('/admin/users'))
        .catch((error) => res.send(error)) 
    },
    deleteUser:(req, res) =>{
        let userId = +req.params.id;
        req.session.destroy();
    
        db.User.findByPk(userId)
        .then((user)=>{
            db.User.destroy({
                where:{
                    id : userId
                }
            })
        })
        .catch((error) => res.send(error))
        res.redirect('/admin/users')
    }
}