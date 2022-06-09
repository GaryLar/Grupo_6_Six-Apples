const db = require("../database/models");
const { Op } = require('Sequelize');
const checkAdmin = (req, res, next) => {
    db.User.findOne({
        where: {
            rolId : {
                [db.Sequelize.Op.eq] : 1
            }
        }
    })
    .then(() => {
    if(req.session.user.rol === 1){
        next()
    }else{
        res.redirect('/')
    }}
    )
    .catch((error) => res.send(error))
}

module.exports = checkAdmin;

/* const checkAdmin = (req, res, next) => {
    db.User.findOne({
        where:{
            rolId:req.session.user.rolId
        }
    })
    .then((user)=>{
        if(user.rolId == 1) {
            next()
        }else{
            res.redirect("/")
        }
    })
    .catch((error)=>res.send(error))
}
 */

/*  if(req.session.user.rol) {
        db.User.findOne({where: {
            rolId : {
                [db.Sequelize.eq] : 1
            }
        }})
        next()
    }else{
       
        res.redirect("/")
    } */