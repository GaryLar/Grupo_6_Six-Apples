const { check, body } = require('express-validator');
const db = require('../database/models');

let validateRegister = [
    check('name')
        .notEmpty().withMessage('Se require nombre completo').bail()
        .isLength({ min: 6 }).withMessage('Ingrese su nombre completo'),

    check('email')
        .notEmpty().withMessage('Se requiere un email').bail()
        .isEmail().withMessage('Ingrese un email válido'),
    
    body('email').custom((value) => {
        return db.User.findOne({
            where: {
                email: value,
            }
        })
        .then((user) => {
            if(user){
                return Promise.reject('Email ya registrado')
            }
        })
    }),
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({ min: 7}).withMessage('La contraseña debe tener un mínimo de 7 caracteres'),
    check('password2')
        .notEmpty().withMessage('Ingrese su contraseña'),
    
    body('password2').custom((value, {req}) => {
        if(value !== req.body.password){
            return false;
        }
        return true;

    }).withMessage('Las contraseñas no coinciden')
];

module.exports = validateRegister;