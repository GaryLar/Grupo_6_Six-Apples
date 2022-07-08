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

    }).withMessage('Las contraseñas no coinciden'),

    check("image")
        .custom((value, {req}) => {
            let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if(!req.file){
                return Promise.reject('Campo requerido')
            }if(!allowedExtensions.exec(req.file.filename)){
                return Promise.reject('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif')
            }else{
                return true
            }
        })
];

module.exports = validateRegister;