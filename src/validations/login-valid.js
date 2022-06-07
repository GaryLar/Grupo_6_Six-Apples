const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

let validateLogin = [
    check('email')
        .notEmpty().withMessage('Se requiere un email').bail()
        .isEmail().withMessage('Ingrese un email válido'),
    
    body('email').custom((value,{req}) => {
        return db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if(!bcrypt.compareSync(req.body.password,user.password)){
                return Promise.reject()
            }
        })
        .catch((error) => {
            return Promise.reject('Email o contraseña incorrecta')
        })
    }),
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña')
        
];

module.exports = validateLogin;